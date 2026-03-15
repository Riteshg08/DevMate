const express = require('express');
const connectDB = require("./config/database");
const app = express();

const User = require("./models/user");

//middleware to parse the incoming request body as JSON
//express.json() converts JSON request into js object so we can access it
app.use(express.json());

//we use async because saving data in the database is asynchronous operation and we need to wait for it to complete before sending the response to the client
app.post("/signup", async (req, res) => {
    //creating a new instance of the user model
    console.log(req.body);
    
    //pushing a dynamic data given by the client in the request body to the user model
    const user = new User(req.body);

    //saving the user to the database
    try {
        await user.save();
        res.send("User is Added successfully!");
    }
    catch (err) {
        res.status(400).send("Error:" + err.message);
    }
});
 

connectDB()
    .then(() => {
        console.log("Database is connected successfully!");
        app.listen(7777, () => {



            console.log("Server is created successfully!");
        });
    })
    .catch((err) => {
        console.error("Error in connecting to database", err);
    });




