app.post('/scrape', async (req, res) => {
    const { url } = req.body;
  
    if (!url) {
      return res.status(400).json({ error: 'URL is required' });
    }
  
    try {
      // Scraping logic
      const { chromium } = require('playwright');
      const browser = await chromium.launch();
      const page = await browser.newPage();
      await page.goto(url);
      const pageTitle = await page.title();
      await browser.close();
  
      // Call AI model for analysis
      const model = require('./modelHandler'); // Import model handler
      const prediction = await model.makePrediction(pageTitle);
  
      // Respond with scraped and analyzed data
      res.json({ title: pageTitle, prediction });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Failed to scrape or analyze the website' });
    }
  });
  