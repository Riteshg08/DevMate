const express = require('express');

// create the express application object
// app is used to define routes, middleware(code that runs between the request and response), and server config
const app = express();

// app.use("/test/result",(req,res) => {
//     res.send("Test result will be out as soon as possible!");
// });

// app.use("/test",(req,res)=>{
//     //send the response to the client and end the request
//     res.send("Test page is fetch from the server!");
// });

// app.use("/",(req,res)=>{
//     res.send("Dashboard is fetch from the server!");
// });

// Checking all the HTTP methods
//Now if we run always this will run becoz order matters
app.use("/user",(req,res)=>{
    res.send("Fetching the data from this route!");
});

// Checking only for the get method
app.get("/user",(req,res) => {
    res.send("Testing the get call!");
});

app.post("/user",(req,res) => {
    res.send("Pushing new content in database!");
});

app.delete("/user",(req,res) => {
    res.send("Deleting the content from the database!");
});

app.put("/user",(req,res) => {
    res.send("Deleting the specific field from the database!");
});

app.patch("/user",(req,res) =>{
    res.send("Deleting the data or adding new data to the database!")
})

app.listen(7777, () => {
    console.log("Server is created successfully!");
});

