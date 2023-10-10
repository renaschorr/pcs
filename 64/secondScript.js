'use strict';

// Access global variables from the first script
console.log("Name:", myName);
console.log("Email:", email);

// Ask the user to enter their name
var userName = prompt("Please enter your name:");

// Display the entered name using console.log and alert
console.log("User entered name:", userName);
alert("Hello, " + userName + "!");