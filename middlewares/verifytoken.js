/** 
    createdBy: Olisaemeka Ezema
**/

const jwt = require('jsonwebtoken');
require('dotenv').config();

const auth = async (req, res, next) => {
    const token = req.headers.authorization.split(' ')[1];
    const { userId, firstName, lastName, exp } = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
    const isExpired = exp < Date.now()/1000;

    try {
        
        if (isExpired) {
            return res.status(401).json({
                message: "JWT token has expired, please login to obtain a new one"
            });
        }else{
            req.userID = userId;
            req.firstName = firstName;
            req.lastName = lastName;
            next();
        }
    } catch (error) {
            res.status(400).send('Invalid token');
    }

}
module.exports = auth