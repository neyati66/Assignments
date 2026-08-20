// script.js

// Get DOM elements
const checkBtn = document.getElementById('checkBtn');
const resultDiv = document.getElementById('result');


function calculateResult() {
    
    return new Promise((resolve, reject) => {
        
        setTimeout(() => {
            
            resolve("Your result is ready! You scored 85 marks.");
        }, 3000); 
    });
}


async function checkResult() {
    
    resultDiv.textContent = "Calculating your result...";
    resultDiv.style.color = "#ff9800";
    
    try {
        
        const result = await calculateResult();
        
        
        resultDiv.textContent = result;
        resultDiv.style.color = "#4CAF50";
    } catch (error) {
        
        resultDiv.textContent = "Error: " + error;
        resultDiv.style.color = "red";
    }
}


checkBtn.addEventListener('click', checkResult);