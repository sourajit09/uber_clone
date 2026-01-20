const User = require('../models/user.model');
const { validationResult } = require('express-validator');

module.exports.registerUser = async (req, res, next) => {
    // 1. Log the data to verify (You already did this, it works!)
    console.log("Received Body:", req.body);

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    const { fullname, email, password } = req.body;

    // CHECK IF FULLNAME EXISTS BEFORE USING IT
    if (!fullname || !fullname.firstname) {
        return res.status(400).json({ message: "First name is required" });
    }

    try {
        // 2. Hash Password (IMPORTANT: You must await this!)
        const hashedPassword = await User.hashPassword(password);

        // 3. Create User - THIS IS WHERE THE FIX IS
        // We manually map "fullname.firstname" to the database column "firstname"
        const user = await User.create({
            firstname: fullname.firstname, // 👈 Extracting the nested value
            lastname: fullname.lastname || "", // Handle optional lastname
            email: email,
            password: hashedPassword
        });

        // 4. Generate Token
        const token = user.generateAuthToken();

        res.status(201).json({ token, user });

    } catch (error) {
        console.error("Error in registerUser:", error); // Log the real error
        res.status(500).json({ message: 'Error creating user', error: error.message });
    }
}

module.exports.loginUser = async (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    const { email, password } = req.body;

    // 1. Find user in MySQL
    const user = await User.findOne({ where: { email } });

    if (!user) {
        return res.status(401).json({ message: 'Invalid email or password' });
    }

    // 2. Check if password matches (using the method we wrote in user.model.js)
    const isMatch = await user.comparePassword(password);

    if (!isMatch) {
        return res.status(401).json({ message: 'Invalid email or password' });
    }

    // 3. Generate Token
    const token = user.generateAuthToken();

    // 4. Send Response
    res.cookie('token', token); // Save token in a cookie (optional but recommended)
    res.status(200).json({ token, user });
}