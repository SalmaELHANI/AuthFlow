const express = require("express");
const db = require("./models");
const cors = require("cors")
const authRouter = require('./routes/auth.routes');
const userRouter = require('./routes/user.routes');

const cookieParser = require('cookie-parser');

const app = express(); 
const PORT = process.env.PORT || 8001; 

app.use(cookieParser());
app.use(express.json());
app.use(cors("*")); 
app.use('/user', authRouter);
app.use('/user', userRouter);

const connectionString = db.url;
console.log(connectionString);

const startserver = async () =>{
    try{ 

        await db.mongoose.connect(connectionString, {
        });
        console.log("Connection to the database successful");  

        
        
        app.listen(PORT,()=>{
            console.log("http://localhost:"+PORT);   
        })  
    }catch(error){
        console.log(error.message);
    }
} 
// To start the server:
startserver();
