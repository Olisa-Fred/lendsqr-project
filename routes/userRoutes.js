/** 
    createdBy: Olisaemeka Ezema
**/

const route = require('express').Router();
const {createAccount, userLogin, creditMyAccount, creditAnotherAccount, debitMyAccount} = require('../controller/userController');
const verify = require('../middlewares/verifytoken')

route.post('/create-account', createAccount);
route.post('/login', userLogin);
route.post('/credit-account', verify,creditMyAccount);
route.post('/credit-foreign-account', verify,creditAnotherAccount);
route.post('/debit-account', verify,debitMyAccount);

module.exports = route;