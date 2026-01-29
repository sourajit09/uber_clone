const {DataTypes} = require('sequelize');
const {sequelize} = require('../db/db');
const bcrypt = require('bcrypt');
const jsonwebtoken = require('jsonwebtoken');


const Captain = sequelize.define('Captain', {
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
        lowercase:true,
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
    },
    socketid: {
        type: DataTypes.STRING,
        allowNull: true
    },

status: {
    type: DataTypes.STRING,
    defaultValue: 'unavailable'
},

vehicle_color: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            len: [3]
        }
    },
    vehicle_plate: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            len: [3]
        }
    },
    vehicle_capacity: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
            min: 1
        }
    },
    vehicle_type: {
        type: DataTypes.STRING,
        allowNull: false
    },

    // Location (Lat/Lng must also be flattened if using MySQL)
    location_lat: {
        type: DataTypes.FLOAT,
        allowNull: true
    },
    location_lng: {
        type: DataTypes.FLOAT,
        allowNull: true
    }
});
// Static Methods
Captain.prototype.generateAuthToken = function() {
    const token = jsonwebtoken.sign({ id: this.id }, process.env.JWT_SECRET, {
        expiresIn: '24h' 
    });
    return token;
};

Captain.prototype.comparePassword = async function(enteredPassword) {
    return await bcrypt.compare(enteredPassword, this.password);
};

Captain.hashPassword = async function(password) {
   return await bcrypt.hash(password, 10);
};

module.exports = Captain;


