/** 
    createdBy: Olisaemeka Ezema
**/

const db = require('../config/connectDB');

module.exports = {
    createAccount: async (accountName, accountNumber, userID) => {
        await db('account').insert({
            account_name: accountName,
            account_number: accountNumber,
            user_id: userID
        });
    },

    findAccountBalanceById: async (id) => {
        let data  = await db('account')
        .select('account_balance', 'account_name')
        .where({
            user_id: id
        });
        let {account_balance, account_name} = data[0];
        const accountBalance = {account_balance, account_name};
        return accountBalance;

    },

    findAccountBalanceByAccountNumber: async (accNum) => {
        let data  = await db('account')
        .select('account_balance', 'account_name')
        .where({
            account_number: accNum
        });
        let {account_balance, account_name} = data[0];
        const accountBalance = {account_balance, account_name};
        return accountBalance;

    },

    updateMyAccount: async (usrID, amount) => {
        await db('account')
        .where({
            user_id: usrID
        })
        .update({
            account_balance: amount
        });
    },

    creditForeignAccount: async (acc_num, amount) => {
        await db('account')
        .where({
            account_number: acc_num
        })
        .update({
            account_balance: amount
        });
    },
}