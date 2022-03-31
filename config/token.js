/** 
    createdBy: Olisaemeka Ezema
**/

const { sign } = require('jsonwebtoken');

const createAccessToken = (userId, email, firstName, lastName) => {
    return sign({userId, email, firstName, lastName}, process.env.ACCESS_TOKEN_SECRET, {
        expiresIn: '1d',
    })
};

module.exports = {
    createAccessToken,
}