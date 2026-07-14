const express = require("express");

const messageRouter = express.Router();
const { authUser } = require("../middlewares/auth");
const Message = require("../models/message");

// Existing route - unchanged
messageRouter.get("/messages/:targetUserId", authUser, async (req, res) => {
    try {
        const loggedInUser = req.user;
        const targetUserId = req.params.targetUserId;

        const messages = await Message.find({
            $or: [
                { senderId: loggedInUser._id, receiverId: targetUserId },
                { senderId: targetUserId, receiverId: loggedInUser._id }
            ]
        }).sort({ createdAt: 1 });

        res.json({
            message: "Messages fetched successfully",
            data: messages
        });
    }
    catch (err) {
        res.status(400).send("Error: " + err.message);
    }
});

// New: mark every message FROM targetUserId TO me as read
messageRouter.patch("/messages/:targetUserId/read", authUser, async (req, res) => {
    try {
        const loggedInUser = req.user;
        const targetUserId = req.params.targetUserId;

        await Message.updateMany(
            { senderId: targetUserId, receiverId: loggedInUser._id, isRead: false },
            { $set: { isRead: true } }
        );

        res.json({ message: "Messages marked as read" });
    }
    catch (err) {
        res.status(400).send("Error: " + err.message);
    }
});

// New: for each connection, get their last message + unread count (powers the sidebar preview)
messageRouter.get("/user/conversations", authUser, async (req, res) => {
    try {
        const loggedInUser = req.user;

        // find the single most recent message with each other person
        const messages = await Message.find({
            $or: [
                { senderId: loggedInUser._id },
                { receiverId: loggedInUser._id }
            ]
        }).sort({ createdAt: -1 });

        const conversationMap = {}; // keyed by the other person's id

        for (const msg of messages) {
            const otherUserId = msg.senderId.toString() === loggedInUser._id.toString()
                ? msg.receiverId.toString()
                : msg.senderId.toString();

            if (!conversationMap[otherUserId]) {
                conversationMap[otherUserId] = {
                    lastMessageText: msg.text,
                    lastMessageAt: msg.createdAt,
                    unreadCount: 0
                };
            }

            // count unread messages sent TO me FROM this person
            const isUnreadFromThem =
                msg.receiverId.toString() === loggedInUser._id.toString() &&
                msg.senderId.toString() === otherUserId &&
                !msg.isRead;

            if (isUnreadFromThem) {
                conversationMap[otherUserId].unreadCount += 1;
            }
        }

        res.json({ message: "Conversations fetched", data: conversationMap });
    }
    catch (err) {
        res.status(400).send("Error: " + err.message);
    }
});

module.exports = {
    messageRouter
};