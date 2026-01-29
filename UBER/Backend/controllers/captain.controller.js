const Captain = require('../models/captain.model');
const { validationResult } = require('express-validator');
const BlacklistToken = require('../models/blacklistToken.model'); 

module.exports.registerCaptain = async (req, res, next) => {
    // 1. Check for Validation Errors
    try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    // 2. Extract Data from Request Body
    //  Make sure 'vehicle' is extracted here!
    const { fullname, email, password, vehicle } = req.body; 

    // 3. Check if Captain already exists
    const isCaptainAlready = await Captain.findOne({ where: { email } });
    if (isCaptainAlready) {
        return res.status(400).json({ message: 'Captain already exists' });
    }

    // 4. Hash the Password
    const hashedPassword = await Captain.hashPassword(password);

    // 5. Create Captain in MySQL
    // 👇 NOTICE THE MAPPING: JSON (Right) -> DB Column (Left)
    const captain = await Captain.create({
        firstname: fullname.firstname,
        lastname: fullname.lastname,
        email: email,
        password: hashedPassword,
        
        // 🛠️ FLATTENING THE VEHICLE OBJECT
        vehicle_color: vehicle.color,
        vehicle_plate: vehicle.plateNumber, // JSON 'plateNumber' -> DB 'vehicle_plate'
        vehicle_capacity: vehicle.capacity,
        vehicle_type: vehicle.vehicleType,
        
        status: 'inactive'
    });

    // 6. Generate Token
    const token = captain.generateAuthToken();

    res.status(201).json({ token, captain });
}
catch (error) {
        // 👇 THIS WILL SHOW THE REAL ERROR IN TERMINAL
        console.error("--------------------------------");
        console.error("REAL ERROR MESSAGE:", error.message);
        console.error("SQL ERROR:", error.parent ? error.parent.sqlMessage : "No SQL message");
        console.error("--------------------------------");
        
        res.status(500).json({ message: "Internal Server Error", error: error.message });
    }
}
