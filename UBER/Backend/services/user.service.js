const Captain = require('../models/captain.model');
const Usermodel = require('../models/user.model');


module.exports.createUser = async({
    firstname,lastname,email,password,color,plate,capacity,vehicleType
}) => {
    if(!firstname || !email || !password || !color || !plate || !capacity || !vehicleType){
        throw new Error('Missing required fields');
    }
    const captain = CaptainModel.create({
        fullname: {
            firstname,
            lastname
        }, 
        email,
        password,
        vehicle:{
            color,
            plateNumber: plate,
            capacity,
            vehicleType
        }
    })

    return user;
}