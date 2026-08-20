
const outputDiv = document.getElementById('output');

function displayResult(message, data = null) {
    console.log(message);
    if (data) {
        console.log(data);
        outputDiv.textContent = message + '\n' + JSON.stringify(data, null, 2);
    } else {
        outputDiv.textContent = message;
    }
}


function handleError(error) {
    console.error('Error:', error);
    outputDiv.textContent = ' Error: ' + error.message;
}


async function getProducts() {
    try {
        outputDiv.textContent = ' Fetching products...';
        const response = await fetch('https://fakestoreapi.com/products');
        const products = await response.json();
        displayResult(' GET - All Products fetched successfully:', products);
    } catch (error) {
        handleError(error);
    }
}

async function addProduct() {
    try {
        outputDiv.textContent = ' Adding new product...';
        const product = {
            title: "Wireless Headphones",
            price: 1999,
            category: "electronics"
        };
        const response = await fetch('https://fakestoreapi.com/products', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(product)
        });
        const result = await response.json();
        displayResult(' POST - New product added successfully:', result);
    } catch (error) {
        handleError(error);
    }
}


async function updateProduct() {
    try {
        outputDiv.textContent = ' Updating product ID 1...';
        const updatedProduct = {
            title: "Premium Smartphone",
            price: 29999,
            category: "electronics",
            description: "High-end smartphone with amazing features",
            image: "https://fakestoreapi.com/img/placeholder.jpg"
        };
        const response = await fetch('https://fakestoreapi.com/products/1', {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(updatedProduct)
        });
        const result = await response.json();
        displayResult(' PUT - Product ID 1 updated completely:', result);
    } catch (error) {
        handleError(error);
    }
}


async function updatePrice() {
    try {
        outputDiv.textContent = ' Updating price of product ID 1...';
        const priceUpdate = {
            price: 24999
        };
        const response = await fetch('https://fakestoreapi.com/products/1', {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(priceUpdate)
        });
        const result = await response.json();
        displayResult(' PATCH - Price updated for product ID 1:', result);
    } catch (error) {
        handleError(error);
    }
}


async function deleteProduct() {
    try {
        outputDiv.textContent = ' Deleting product ID 1...';
        const response = await fetch('https://fakestoreapi.com/products/1', {
            method: 'DELETE'
        });
        const result = await response.json();
        displayResult(' DELETE - Product ID 1 deleted successfully:', result);
    } catch (error) {
        handleError(error);
    }
}


outputDiv.textContent = 'Click a button to perform an operation. Results will appear here and in the console.';