const express = require("express");
const db = require("./models");
const cors = require("cors")



const app = express();
const PORT = process.env.PORT || 8000; 

 
app.use(cors("*")); 




const connectionString = db.url;
console.log(connectionString);

const startserver = async () =>{
    try{ 
        await db.mongoose.connect(connectionString, {
            dbName : ""        
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
