const express = require('express');

// Simulate the main logic from our API for testing
function processData(data) {
    // Initialize arrays
    const oddNumbers = [];
    const evenNumbers = [];
    const alphabets = [];
    const specialCharacters = [];
    let sum = 0;
    const allAlphabets = [];

    // Helper functions
    function isNumber(str) {
        return !isNaN(str) && !isNaN(parseFloat(str));
    }

    function isAlpha(char) {
        return /^[A-Za-z]$/.test(char);
    }

    function isSpecialChar(char) {
        return !/^[A-Za-z0-9]$/.test(char);
    }

    // Process each element in the data array
    data.forEach(item => {
        const str = String(item);
        
        // Check if it's a number
        if (isNumber(str)) {
            const num = parseInt(str);
            sum += num;
            
            if (num % 2 === 0) {
                evenNumbers.push(str);
            } else {
                oddNumbers.push(str);
            }
        }
        // Check if it's alphabetic (handle both single chars and strings)
        else if (str.split('').every(char => isAlpha(char))) {
            alphabets.push(str.toUpperCase());
            // Collect individual characters for concatenation
            str.split('').forEach(char => allAlphabets.push(char));
        }
        // Check for special characters
        else if (str.split('').every(char => isSpecialChar(char))) {
            specialCharacters.push(str);
        }
        // Mixed strings (contains both alphabets and special chars)
        else {
            str.split('').forEach(char => {
                if (isAlpha(char)) {
                    allAlphabets.push(char);
                } else if (isSpecialChar(char)) {
                    specialCharacters.push(char);
                }
            });
        }
    });

    // Create concatenated string in reverse order with alternating caps
    let concatString = '';
    if (allAlphabets.length > 0) {
        const reversedAlphabets = allAlphabets.reverse();
        reversedAlphabets.forEach((char, index) => {
            if (index % 2 === 0) {
                concatString += char.toUpperCase();
            } else {
                concatString += char.toLowerCase();
            }
        });
    }

    return {
        oddNumbers,
        evenNumbers,
        alphabets,
        specialCharacters,
        sum: sum.toString(),
        concatString
    };
}

// Test cases
console.log("Testing Example A:");
const testA = ["a","1","334","4","R", "$"];
const resultA = processData(testA);
console.log("Input:", testA);
console.log("Result:", resultA);
console.log();

console.log("Testing Example B:");
const testB = ["2","a", "y", "4", "&", "-", "*", "5","92","b"];
const resultB = processData(testB);
console.log("Input:", testB);
console.log("Result:", resultB);
console.log();

console.log("Testing Example C:");
const testC = ["A","ABcD","DOE"];
const resultC = processData(testC);
console.log("Input:", testC);
console.log("Result:", resultC);