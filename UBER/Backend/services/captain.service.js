const captainModel = require('../models/captain.model');


module.exports.createCaptain = async({
    firstname,lastname,email,password,vehicleDetails
}) => { 
    if(!firstname || !email || !password || !vehicleDetails){
        throw new Error('Missing required fields');
    }
    const captain = captainModel.create({
        fullname: {
            firstname,
            lastname
        }, 
        email,
        password,
        vehicleDetails
    })
    return captain;
}