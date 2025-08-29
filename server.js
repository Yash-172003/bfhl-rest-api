module.exports = (req, res) => {
  if (req.method === "POST") {
    try {
      const { data } = req.body;

      if (!data || !Array.isArray(data)) {
        return res.status(400).json({
          is_success: false,
          message: "Invalid input: 'data' must be an array"
        });
      }

      // Helper functions
      const isNumber = str => !isNaN(str) && !isNaN(parseFloat(str));
      const isAlpha = char => /^[A-Za-z]$/.test(char);
      const isSpecialChar = char => !/^[A-Za-z0-9]$/.test(char);

      // Collect values
      const oddNumbers = [];
      const evenNumbers = [];
      const alphabets = [];
      const specialCharacters = [];
      const allAlphabets = [];
      let sum = 0;

      data.forEach(item => {
        const str = String(item);

        if (isNumber(str)) {
          const num = parseInt(str);
          sum += num;
          if (num % 2 === 0) {
            evenNumbers.push(str);
          } else {
            oddNumbers.push(str);
          }
        } else if (str.split('').every(isAlpha)) {
          alphabets.push(str.toUpperCase());
          str.split('').forEach(c => allAlphabets.push(c));
        } else if (str.split('').every(isSpecialChar)) {
          specialCharacters.push(str);
        } else {
          str.split('').forEach(char => {
            if (isAlpha(char)) {
              allAlphabets.push(char);
            } else if (isSpecialChar(char)) {
              specialCharacters.push(char);
            }
          });
        }
      });

      // Reverse order, alternating caps for concat_string
      let concatString = "";
      if (allAlphabets.length > 0) {
        const reversedAlphabets = allAlphabets.reverse();
        reversedAlphabets.forEach((char, index) => {
          concatString += index % 2 === 0 ? char.toUpperCase() : char.toLowerCase();
        });
      }

      res.status(200).json({
        is_success: true,
        user_id: "john_doe_17091999",
        email: "john@xyz.com",
        roll_number: "ABCD123",
        odd_numbers: oddNumbers,
        even_numbers: evenNumbers,
        alphabets: alphabets,
        special_characters: specialCharacters,
        sum: sum.toString(),
        concat_string: concatString
      });
    } catch (error) {
      res.status(500).json({
        is_success: false,
        message: "Internal server error"
      });
    }
  } else if (req.method === "GET") {
    // For GET requests
    res.status(200).json({
      operation_code: 1
    });
  } else {
    // For other HTTP methods
    res.status(405).json({
      is_success: false,
      message: "Method not allowed"
    });
  }
};
