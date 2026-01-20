const Usermodel = require('../models/user.model');


module.exports.createUser = async({
    firstname,lastname,email,password
}) => {
    if(!firstname || !email || !password){
        throw new Error('Missing required fields');
    }
    const user = Usermodel.create({
        fullname: {
            firstname,
            lastname
        }, 
        email,
        password
    })

    return user;
}