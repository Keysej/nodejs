// script.js

document.addEventListener('DOMContentLoaded', () => {
    const container = document.querySelector('.container');
    const h1 = document.querySelector('h1');
    const resultDiv = document.getElementById('result');
  
    // Add fade-in effect when the page loads
    setTimeout(() => {
      container.classList.add('fade-in');
      h1.classList.add('fade-in');
    }, 100);
  
    document.getElementById('scrape-form').addEventListener('submit', async (e) => {
      e.preventDefault();
  
      const url = document.getElementById('url').value;
  
      // Add animation while fetching data
      resultDiv.classList.remove('show');
      resultDiv.innerHTML = '<p>Loading...</p>';
  
      try {
        const response = await fetch('/scrape', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({ url })
        });
  
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
  
        const data = await response.json();
        displayResult(data);
      } catch (error) {
        console.error('There has been a problem with your fetch operation:', error);
        resultDiv.innerHTML = 'An error occurred. Please try again.';
      }
    });
  
    function displayResult(data) {
      resultDiv.innerHTML = `
        <h2>Analysis Result</h2>
        <p><strong>Category:</strong> ${data.category}</p>
        <p><strong>Content:</strong></p>
        <pre>${JSON.stringify(data.content, null, 2)}</pre>
      `;
  
      // Trigger animation for the result
      setTimeout(() => {
        resultDiv.classList.add('show');
      }, 100);
    }
  });
  