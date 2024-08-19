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
