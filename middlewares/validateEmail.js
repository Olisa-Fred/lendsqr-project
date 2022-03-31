/** 
    createdBy: Olisaemeka Ezema
**/

module.exports = {
    validateEmail: (email) => {
        const re = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
        const validMail = re.test(email)
        return validMail;
    }
}


