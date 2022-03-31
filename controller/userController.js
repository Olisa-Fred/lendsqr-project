/** 
    createdBy: Olisaemeka Ezema
**/

const { createUser, findUserByEmail } = require('../service/userService');
const {createAccount, updateMyAccount, findAccountBalanceById, creditForeignAccount, findAccountBalanceByAccountNumber } = require('../service/accountService');
const {validateEmail} = require('../middlewares/validateEmail');
const { createAccountNumber } = require('../middlewares/createAccuntNumber');
const { createAccessToken } = require('../config/token');
const bcrypt = require('bcryptjs');

module.exports = { 

    /* Create account method */
     createAccount: async (req, res) =>{
        try {
            let {firstName,lastName,email,password} = req.body;
            const user = {firstName, lastName,email,password};
            if(!validateEmail(user.email)){
                return res.status(401).json({message: "Invalid Email"});
            }
            const hashedPassword = bcrypt.hashSync(user.password, 10); 
            const accountName =  user.firstName + ' ' + user.lastName;
            const accountNumber = createAccountNumber();
            const userID = await createUser(user.firstName, user.lastName, user.email, hashedPassword);
            await createAccount(accountName, accountNumber, userID);
            const accessToken = createAccessToken(user.id, user.email, user.first_name, user.last_name);
            res.status(200).json({status: 200,
                message: "Account has been successfully created",
                "Account Name": user.firstName + ' ' + user.lastName,
                "Account email": user.email,
                "Account Number": accountNumber,
                "token": accessToken });
        } catch (error) {
            console.error(error);
            res.status(500).json({message: error.sqlMessage});
        }

    },

    /* Login method, generates jwt token for authentication */
    userLogin: async (req, res) => {
        try {
            let {email, password} = req.body;
            const userDetails = {email, password};
            const user = await findUserByEmail(userDetails.email);
            const passwordcheck = bcrypt.compare(userDetails.password, password);

            /* Checking login details accuracy */
            if(!user && !passwordcheck){
                res.status(403).json({message: "Incorrect email or password"});
            }
            const accessToken = createAccessToken(user.user_id, user.email, user.first_name, user.last_name);
            res.status(201).json({
                message:"Login successful",
                "user": user,
                "token": accessToken});
            
        } catch (error) {
            console.log(error);
            res.status(500).json(error);
        }

    },

    /* method to credit user account */
    creditMyAccount: async (req, res) =>{
        try {
            const id = req.userID;
            const amount = req.body.amount;
            const data = await findAccountBalanceById(id);
            const oldBalance = data.account_balance;
            const newBalance = oldBalance+amount;
            await updateMyAccount(id, newBalance);
            res.status(200).json({status: 200,
                message: `Dear ${req.firstName} your account has been successfully credited with N${amount}, current balance N${newBalance}`});
        } catch (error) {
            res.status(500).json({message: error.sqlMessage});
        }

    },

    /* method to credit another user's account */
    creditAnotherAccount: async (req,res) =>{
        try {
            let {accountNumber, amount} = req.body;
            const data = {accountNumber, amount};

             /* Debit benefactor's account */
             const id = req.userID;
             const fig = await findAccountBalanceById(id);
             const oldBalance = fig.account_balance;
             const newBalance = oldBalance-data.amount;
             if (oldBalance <= data.amount) {
                 return res.status(404).json({message: "Insufficient Balance"});
             }
            await updateMyAccount(id, newBalance);

            /* Credit beneficiary account*/
            const amt = await findAccountBalanceByAccountNumber(data.accountNumber);
            const old = amt.account_balance;
            const newB = old+data.amount;
            await creditForeignAccount(data.accountNumber, newB);

            /* Send response  */
            res.status(200).json({status: 200,
                message: `Dear ${req.firstName} your have successfully credited ${amt.account_name} with N${amount}`});
             }  
         catch (error) {
            console.log(error);
            res.status(500).json({message: error.sqlMessage});
        }
    },

    /* method for user to withdraw fund */
    debitMyAccount: async (req, res) => {
        try {
            /* Debit account */
            const id = req.userID;
            const amount = req.body.amount;
            const amt = await findAccountBalanceById(id);
            const oldBalance = amt.account_balance;
            const newBalance = oldBalance-amount;
            if (oldBalance <= amount) {
                return res.status(404).json({message: "Insufficient Balance"});
            }
           await updateMyAccount(id, amount);
           res.status(200).json({status: 200,
            message: `Dear ${req.firstName} your account has been successfully withdrawn N${amount}, current balance N${newBalance}`});
        } catch (error) {
            console.log(error);
            res.status(500).json({message: error.sqlMessage});
        }
    }
}