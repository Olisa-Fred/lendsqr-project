/** 
    createdBy: Olisaemeka Ezema
**/

const route = require('express').Router();
const {createAccount, userLogin, creditMyAccount, creditAnotherAccount, debitMyAccount} = require('../controller/userController');
const verify = require('../middlewares/verifytoken')

route.post('/create-account', createAccount);
route.post('/account/login', userLogin);
route.post('/account/credit-account', verify,creditMyAccount);
route.post('/account/credit-foreign-account', verify,creditAnotherAccount);
route.post('/account/debit-account', verify,debitMyAccount);

module.exports = route;