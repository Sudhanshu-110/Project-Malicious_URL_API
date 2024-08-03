// popup.js

// Function to handle prediction
function predict() {
  console.log('Predict function called'); // Log to console to verify function execution
  var url = document.getElementById('urlInput').value;
  
  // Show loading text or spinner
  document.getElementById('loading').style.display = 'flex';
  
  fetch('http://localhost:5000/predict', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({url: url})
  })
  .then(response => {
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    return response.json();
  })
  .then(data => {
    // Hide loading text or spinner
    document.getElementById('loading').style.display = 'none';
    
    // Display prediction result
    document.getElementById('result').innerText = 'Random Forest Prediction: ' + data.prediction_rf + ', SVM Prediction: ' + data.prediction_svm;
  })
  .catch(error => {
    console.error('Error:', error);
    // Hide loading text or spinner
    document.getElementById('loading').style.display = 'none';
    // Display error message
    document.getElementById('result').innerText = 'Error: Prediction failed. Please try again later.';
  });
}

// Add event listener for the "Predict" button click event
document.addEventListener('DOMContentLoaded', function() {
  var predictButton = document.getElementById('predictButton');
  if (predictButton) {
    predictButton.addEventListener('click', predict);
  } else {
    console.error('Predict button not found');
  }
});
