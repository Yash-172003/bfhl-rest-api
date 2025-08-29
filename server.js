const express = require('express');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(express.json());

// Helper function to check if a string is a number
function isNumber(str) {
    return !isNaN(str) && !isNaN(parseFloat(str));
}

// Helper function to check if a character is alphabetic
function isAlpha(char) {
    return /^[A-Za-z]$/.test(char);
}

// Helper function to check if a character is special
function isSpecialChar(char) {
    return !/^[A-Za-z0-9]$/.test(char);
}

// POST route for /bfhl
app.post('/bfhl', (req, res) => {
    try {
        const { data } = req.body;
        
        // Validate input
        if (!data || !Array.isArray(data)) {
            return res.status(400).json({
                is_success: false,
                message: "Invalid input: 'data' must be an array"
            });
        }

        // Initialize arrays
        const oddNumbers = [];
        const evenNumbers = [];
        const alphabets = [];
        const specialCharacters = [];
        let sum = 0;
        const allAlphabets = [];

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

        // Response object
        const response = {
            is_success: true,
            user_id: "john_doe_17091999", // Replace with your actual details
            email: "john@xyz.com", // Replace with your actual email
            roll_number: "ABCD123", // Replace with your actual roll number
            odd_numbers: oddNumbers,
            even_numbers: evenNumbers,
            alphabets: alphabets,
            special_characters: specialCharacters,
            sum: sum.toString(),
            concat_string: concatString
        };

        res.status(200).json(response);

    } catch (error) {
        console.error('Error processing request:', error);
        res.status(500).json({
            is_success: false,
            message: "Internal server error"
        });
    }
});

// Health check route
app.get('/health', (req, res) => {
    res.status(200).json({ status: 'API is running' });
});

// GET route for /bfhl (as per some API requirements)
app.get('/bfhl', (req, res) => {
    res.status(200).json({
        operation_code: 1
    });
});

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});

module.exports = app;