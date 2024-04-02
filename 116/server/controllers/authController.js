const User = require('../models/User');
const bcrypt = require('bcrypt');



const authController = {
  
  comparePassword: (password, password2) => {
    return password === password2;
  },

  register: async (req, res) => {
    try {
      // Extract registration data from request body
      const { username, email, password } = req.body;
     console.log("authController")
      // Check if user with the same email already exists
      const existingUser = await User.findOne({ email });
      if (existingUser) {
       
        return res.status(400).json({ error: 'User with this email already exists' });
      }

      // Create new user instance
      const newUser = new User({ username, email, password });

      // Save user to database
      await newUser.save();

      // Return success response
      res.status(201).json({ message: 'User registered successfully' });
      
    } catch (error) {
      // Return error response if registration fails
      console.error(error);
      res.status(500).json({ error: 'Registration failed' });
    }
  },

  login: async (req, res) => {
    
    try {
      
      const { email, password } = req.body;
      console.log("the email: ")
      console.log(email);
      const user = await User.findOne({ email });

      if (!user) {
        console.log("no user");
        return res.status(404).json({ error: 'User not found' });
      }

      const isPasswordValid = authController.comparePassword(password, user.password);
      console.log(password,"password");
      console.log(user.password,"user password")
      if (!isPasswordValid) {
        console.log("no password");
        return res.status(401).json({ error: 'Invalid password' });
      }
      
      
      return res.status(200).json({ message: 'Login successful', user });
    } catch (error) {
      console.error('Error logging in:', error);
      return res.status(500).json({ error: 'Internal server error' });
    }
  }
};

module.exports = authController;
