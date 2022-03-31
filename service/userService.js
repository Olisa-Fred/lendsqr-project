/** 
    createdBy: Olisaemeka Ezema
**/

const db = require('../config/connectDB')

module.exports = {
    createUser: async (firstName, lastName, email, password) => { 
              const [id] = await db('user').insert({
                        first_name: firstName,
                        last_name: lastName,
                        email,
                        password
                    });
                return id;
    },

    findUserById: async (userId) =>{
        let data  = await db('user')
        .select('user_id', 'first_name', 'last_name')
        .where({
            user_id: userId
        });
        let {user_id, first_name, last_name, email, password} = data[0];
        const user = {user_id, first_name, last_name, email, password};
        return user;
    },

    findUserByEmail: async (my_email) =>{ 
        let data = await db('user')
        .select('user_id', 'first_name', 'last_name', 'email', 'password')
        .where({
            email: my_email
        });
        let {user_id, first_name, last_name, email, password} = data[0];
        const user = {user_id, first_name, last_name, email, password};
        return user;
    },  
}