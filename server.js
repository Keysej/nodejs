const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const morgan = require('morgan');
const cors = require('cors');
const path = require('path');
require('dotenv').config();
const { createModel, trainModel, makePrediction } = require('./model-handler');

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(bodyParser.json());
app.use(morgan('dev'));

// Serve static files from 'frontend' directory
app.use(express.static(path.join(__dirname, 'frontend')));

// MongoDB Connection
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.log('MongoDB connection error:', err));

// Example: AI model setup
const model = createModel();

// Example: Training the model (with mock data)
const inputs = [1, 2, 3, 4];
const labels = [1, 3, 5, 7];
trainModel(model, inputs, labels);

// Scraping Route
app.post('/scrape', async (req, res) => {
  const { url } = req.body;

  if (!url) {
    return res.status(400).json({ error: 'URL is required' });
  }

  try {
    const { chromium } = require('playwright');
    const browser = await chromium.launch();
    const page = await browser.newPage();
    await page.goto(url);

    // Scraping the page title
    const pageTitle = await page.title();
    await browser.close();

    // Example: Use the AI model to predict something (this is just a mock example)
    const prediction = makePrediction(model, 5);

    // Respond with scraped data and prediction
    res.json({ title: pageTitle, prediction });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to scrape the website' });
  }
});

// Serve index.html for any other routes
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'frontend', 'index.html'));
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
