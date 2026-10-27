const fs = require("fs");

// Read the text file synchronously
const data = fs.readFileSync("input.txt", "utf8");

// Calculations
const lines = data.split("\n").length;
const words = data.trim().split(/\s+/).length;
const characters = data.length;

console.log("Number of Lines:", lines);
console.log("Number of Words:", words);
console.log("Number of Characters:", characters);