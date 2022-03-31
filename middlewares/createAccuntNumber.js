/** 
    createdBy: Olisaemeka Ezema
**/

module.exports = {
    createAccountNumber:() => {
        const issuer_identity = 63;
        const reciever_identity = Math.floor(100000 + Math.random() * 900000);
        return issuer_identity+''+reciever_identity;
    }
}