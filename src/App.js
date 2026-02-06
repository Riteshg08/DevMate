const express = require('express');

// create the express application object
// app is used to define routes, middleware(code that runs between the request and response), and server config
const app = express();


app.use("/test",(req,res)=>{
    //send the response to the client and end the request
    res.send("Test page is fetch from the server!");
});

app.use("/",(req,res)=>{
    res.send("Dashboard is fetch from the server!");
});


app.listen(7777, () => {
    console.log("Server is created successfully!");
});

