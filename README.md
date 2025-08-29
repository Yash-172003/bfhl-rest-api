# BFHL REST API

A REST API built with Node.js and Express that processes arrays and returns categorized data.

## Features

- **POST /bfhl**: Main endpoint that processes an array and returns:
  - Status (success/failure)
  - User ID, Email, Roll Number
  - Separated even and odd numbers
  - Alphabets converted to uppercase
  - Special characters
  - Sum of all numbers
  - Concatenated alphabets in reverse order with alternating caps

- **GET /bfhl**: Returns operation code
- **GET /health**: Health check endpoint

## API Documentation

### Endpoint: `POST /bfhl`

**Request Body:**
```json
{
  "data": ["a", "1", "334", "4", "R", "$"]
}
```

**Response:**
```json
{
  "is_success": true,
  "user_id": "john_doe_17091999",
  "email": "john@xyz.com",
  "roll_number": "ABCD123",
  "odd_numbers": ["1"],
  "even_numbers": ["334", "4"],
  "alphabets": ["A", "R"],
  "special_characters": ["$"],
  "sum": "339",
  "concat_string": "Ra"
}
```

## Installation and Setup

1. **Clone the repository:**
   ```bash
   git clone <your-repo-url>
   cd bfhl-api
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Run locally:**
   ```bash
   npm start
   # or for development
   npm run dev
   ```

4. **Test the API:**
   ```bash
   curl -X POST http://localhost:3000/bfhl \
     -H "Content-Type: application/json" \
     -d '{"data": ["a","1","334","4","R","$"]}'
   ```

## Deployment

### Vercel Deployment

1. **Install Vercel CLI:**
   ```bash
   npm i -g vercel
   ```

2. **Deploy:**
   ```bash
   vercel --prod
   ```

### Alternative Hosting Options

- **Railway**: Connect your GitHub repo at railway.app
- **Render**: Connect your GitHub repo at render.com
- **Heroku**: Use the Heroku CLI or GitHub integration

## Configuration

Before deploying, update the following in `server.js`:

```javascript
const response = {
    is_success: true,
    user_id: "your_name_ddmmyyyy", // Replace with your details
    email: "your_email@domain.com", // Replace with your email
    roll_number: "YOUR_ROLL_NUMBER", // Replace with your roll number
    // ... rest of the response
};
```

## Testing Examples

### Example 1:
```bash
curl -X POST https://your-api-url.vercel.app/bfhl \
  -H "Content-Type: application/json" \
  -d '{"data": ["2","a","y","4","&","-","*","5","92","b"]}'
```

### Example 2:
```bash
curl -X POST https://your-api-url.vercel.app/bfhl \
  -H "Content-Type: application/json" \
  -d '{"data": ["A","ABcD","DOE"]}'
```

## Error Handling

The API includes comprehensive error handling:
- Input validation for array data
- Graceful handling of invalid input types
- Proper HTTP status codes
- Detailed error messages

## License

MIT License