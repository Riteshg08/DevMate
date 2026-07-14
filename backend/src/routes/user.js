const express = require("express");

const userRouter = express.Router();
const { authUser } = require("../middlewares/auth");
const ConnectionRequest = require("../models/connectionRequest.js")
const User = require("../models/user.js")

//Get all the pending connection request for the loggedIn user
userRouter.get("/user/request/received", authUser, async (req, res) => {
    try {
        const loggedInUser = req.user;

        const connectionRequest = await ConnectionRequest.find({
            toUserId: loggedInUser._id,
            status: "interested"
        }).populate("fromUserId", "firstName lastName age skills bio photoUrl title company");

        res.json({
            message: "Data is fetched successfully",
            data: connectionRequest
        });
    }
    catch (err) {
        res.status(400).send("Error: " + err.message);
    }

});

//Get all the connection requests the loggedIn user has SENT (still pending, not yet reviewed)
userRouter.get("/user/request/sent", authUser, async (req, res) => {
    try {
        const loggedInUser = req.user;

        const connectionRequest = await ConnectionRequest.find({
            fromUserId: loggedInUser._id,
            status: "interested"
        }).populate("toUserId", "firstName lastName age skills bio photoUrl title company");

        res.json({
            message: "Data is fetched successfully",
            data: connectionRequest
        });
    }
    catch (err) {
        res.status(400).send("Error: " + err.message);
    }
});

//Showing all connection 
userRouter.get("/user/connections", authUser, async (req, res) => {
    try {
        const loggedInUser = req.user;

        const connectionRequest = await ConnectionRequest.find({
            $or: [
                { toUserId: loggedInUser._id, status: "accepted" },
                { fromUserId: loggedInUser._id, status: "accepted" }
            ]
        }).populate("fromUserId", "firstName lastName age skills bio photoUrl title company").populate("toUserId", "firstName lastName age skills bio photoUrl title company");

        const data = connectionRequest.map((row) => {
            if (row.fromUserId._id.toString() === loggedInUser._id.toString()) {
                return row.toUserId;
            }
            return row.fromUserId;
        });

        res.json({
            message: "My connections!",
            data
        });
    }
    catch (err) {
        res.status(400).send("Error: " + err.message);
    }
});

// Search users by username, role/title, or skill
userRouter.get("/user/search", authUser, async (req, res) => {
    try {
        const loggedInUser = req.user;
        const query = req.query.q;

        const filter = { _id: { $ne: loggedInUser._id } };

        if (query && query.trim().length > 0) {
            const searchText = query.trim();

            // match if the search text appears in username, title, OR any skill
            filter.$or = [
                { username: { $regex: searchText, $options: "i" } },
                { title: { $regex: searchText, $options: "i" } },
                { skills: { $regex: searchText, $options: "i" } }
            ];
        }

        const users = await User.find(filter)
            .select("firstName lastName age skills about photoUrl title company location githubUsername portfolioUrl linkedinUrl username")
            .limit(50);

        res.json({ message: "Search results", data: users });
    }
    catch (err) {
        res.status(400).send("Error: " + err.message);
    }
});


userRouter.get("/feed", authUser, async (req, res) => {
    try {
        const loggedInUser = req.user;
        const page = parseInt(req.query.page) || 1;
        let limit = parseInt(req.query.limit) || 10;
        limit = limit > 50 ? 50 : limit;
        const skipPages = (page - 1) * limit;

        const connectionRequest = await ConnectionRequest.find({
            $or: [
                { fromUserId: loggedInUser._id },
                { toUserId: loggedInUser._id }
            ]
        }).select("fromUserId toUserId");

        const hideUsersFromFeed = new Set();
        connectionRequest.forEach((req) => {
            if (req.fromUserId.toString() !== loggedInUser._id.toString()) {
                hideUsersFromFeed.add(req.fromUserId.toString());
            }
            if (req.toUserId.toString() !== loggedInUser._id.toString()) {
                hideUsersFromFeed.add(req.toUserId.toString());
            }
        });

        const users = await User.find({
            $and: [
                { _id: { $nin: Array.from(hideUsersFromFeed) } },
                { _id: { $ne: loggedInUser._id } }
            ]
        })
            .select("firstName lastName age skills bio photoUrl title company location githubUsername portfolioUrl linkedinUrl")
            .skip(skipPages)
            .limit(limit);

        res.json({ users });
    }
    catch (err) {
        res.status(400).send("Error: " + err.message);
    }
});

// Remove an existing connection (unmatch)
userRouter.delete("/user/connections/:targetUserId", authUser, async (req, res) => {
    try {
        const loggedInUser = req.user;
        const targetUserId = req.params.targetUserId;

        const connection = await ConnectionRequest.findOneAndDelete({
            $or: [
                { fromUserId: loggedInUser._id, toUserId: targetUserId, status: "accepted" },
                { fromUserId: targetUserId, toUserId: loggedInUser._id, status: "accepted" }
            ]
        });

        if (!connection) {
            throw new Error("Connection not found");
        }

        res.json({ message: "Connection removed successfully" });
    }
    catch (err) {
        res.status(400).send("Error: " + err.message);
    }
});


module.exports = {
    userRouter
};