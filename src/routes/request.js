const express = require("express");

const requestRouter = express.Router();
const { authUser } = require("../middlewares/auth");
const connectionRequestModel = require("../models/connectionRequest")


requestRouter.post("/request/send/:status/:userID", authUser, async (req, res) => {
    try {
        const toUserId = req.params.userID;
        const status = req.params.status;
        const fromUserId = req.user._id;

        const allowedStatus = ["interested", "ignored"];
        if (!allowedStatus.includes(status)) {
            throw new Error("Invalid status type");
        }

        //check wheather the connection request exist or not
        const isAlreadyRequested = await connectionRequestModel.findOne({
            $or: [
                { fromUserId, toUserId },
                { fromUserId: toUserId, toUserId: fromUserId }
            ]
        });

        if (isAlreadyRequested) {
            throw new Error("Connection Request already exist");
        }

        const isUserExist = await connectionRequestModel.findOne({toUserId});
        if(!isUserExist){
            throw new Error("User does not exist");
        }

         //creating new instance of a model
        const connectionRequest = new connectionRequestModel({
            fromUserId,
            toUserId,
            status
        });

        const data = await connectionRequest.save();

        res.json({ message: req.user.firstName + " is " + status, data });

    }
    catch (err) {
        res.status(400).send("Error: " + err.message);
    }
})

module.exports = {
    requestRouter
}