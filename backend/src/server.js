const express = require('express');
const cors = require('cors');

// Initialize the express app
const app = express();
const port = 3001;

// Middlewares to enable CORS and parse JSON bodies
app.use(cors());
app.use(express.json());

// --- Security Best Practice ---
// Avoid hardcoding credentials. Use environment variables.
// For this example, we'll use fallback values if they aren't set.
const CORRECT_USERNAME = process.env.APP_USERNAME || 'admin';
const CORRECT_PASSWORD = process.env.APP_PASSWORD || 'password123';

console.log('Server credentials loaded.');
console.log(`Username: ${CORRECT_USERNAME}`);
console.log('Password has been set (not shown for security).');


/**
 * @route   POST /login
 * @desc    Authenticates a user based on username and password
 * @access  Public
 */
app.post('/login', (req, res) => {
  // Get username and password from the request body
  const { username, password } = req.body;

  // Basic validation to ensure we received credentials
  if (!username || !password) {
    return res.status(400).json({
      success: false,
      message: 'Please provide both username and password.'
    });
  }

  // Check if the provided credentials match the correct ones
  if (username === CORRECT_USERNAME && password === CORRECT_PASSWORD) {
    // If they match, send a success response
    console.log(`Successful login attempt for user: ${username}`);
    return res.status(200).json({
      success: true,
      message: 'User logged in successfully!'
    });
  } else {
    // If they don't match, send a failure response
    console.log(`Failed login attempt for user: ${username}`);
    return res.status(401).json({
      success: false,
      message: 'Invalid username or password.'
    });
  }
});

// Start the server and listen on the specified port
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
