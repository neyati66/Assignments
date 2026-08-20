
let booking = new Promise((resolve, reject) => {

    setTimeout(() => {
        let seatsAvailable = true; 
        if (seatsAvailable) {
            resolve("Seats are available");
        } else {
            reject("No Seats Available");
        }
    }, 2000);
});

booking
    .then((message) => {
        console.log("1. Check Seat Availability: " + message);
        return "Payment processed";
    })
    .then((message) => {
        
        console.log("2. Process Payment: " + message);
        return "Booking confirmed";
    })
    .then((message) => {
        
        console.log("3. Confirm Booking: " + message);
        return "Ticket generated";
    })
    .then((message) => {
        
        console.log("4. Generate Ticket: " + message);
        console.log("Booking completed successfully!");
    })
    
    .catch((error) => {
        console.log("Error: " + error);
    });


console.log("Check the console for booking results.");