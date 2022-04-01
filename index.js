/** 
    createdBy: Olisaemeka Ezema
**/

const express = require('express');
const account = require('./routes/userRoutes')

const app = express();

app.use(express.json());
app.use('/api/v1/account', account);

const port = process.env.PORT || 9020;

app.listen(port, ()=>{
    console.log(`Server is running on port ${port}`);
})