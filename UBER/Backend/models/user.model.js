// models/user.model.js
const { DataTypes } = require('sequelize');
const { sequelize } = require('../db/db'); 
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

// 1. Define the Model
const User = sequelize.define('User', {
    firstname: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            len: [3]
        }
    },
    lastname: {
        type: DataTypes.STRING,
        allowNull: true,
        validate: {
            len: [3]
        }
    },
    email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true, 
        validate: {
            isEmail: true
        }
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            len: [6]
        }
        // Note: 'select: false' does not work in Sequelize definition.
        // You must exclude it manually in queries if you want to hide it.
    },
    socketId: {
        type: DataTypes.STRING,
        allowNull: true
    }
});

// 2. Instance Methods (replace 'UserSchema.methods')
// These are available on a specific user (e.g., user.generateAuthToken())

User.prototype.generateAuthToken = function() {
    const token = jwt.sign({ id: this.id }, process.env.JWT_SECRET, {
        expiresIn: '24h' 
    });
    return token;
};

User.prototype.comparePassword = async function(enteredPassword) {
    // 'this.password' refers to the hash stored in the DB
    return await bcrypt.compare(enteredPassword, this.password);
};

// 3. Static Methods (replace 'UserSchema.statics')
// These are available on the model itself (e.g., User.hashPassword())

User.hashPassword = async function(password) {
    return await bcrypt.hash(password, 10);
};

// 4. Export the Model directly
module.exports = User;