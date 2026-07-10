import { useEffect, useRef, useState } from "react";
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import axios from "axios";
import { io } from "socket.io-client";
import { BASE_URL } from "../utils/constants";

const Chat = () => {
    const { targetUserId } = useParams();
    const user = useSelector((store) => store.user);
    const userId = user?._id;

    const [messages, setMessages] = useState([]);
    const [newMessage, setNewMessage] = useState("");
    const socketRef = useRef(null);
    const bottomRef = useRef(null);

    // load past messages from the database when opening the chat
    const fetchMessages = async () => {
        try {
            const res = await axios.get(BASE_URL + "/messages/" + targetUserId, {
                withCredentials: true
            });
            setMessages(res?.data?.data || []);
        } catch (err) {
            console.error(err);
        }
    };

    useEffect(() => {
        if (!userId) return;

        fetchMessages();

        // connect to the socket server
        const socket = io(BASE_URL);
        socketRef.current = socket;

        // tell the server which chat room we're joining
        socket.emit("joinChat", { userId, targetUserId });

        // listen for new incoming messages
        socket.on("messageReceived", (message) => {
            // only add it if it belongs to this specific chat
            const isThisChat =
                (message.senderId === userId && message.receiverId === targetUserId) ||
                (message.senderId === targetUserId && message.receiverId === userId);

            if (isThisChat) {
                setMessages((prev) => [...prev, message]);
            }
        });

        // disconnect when leaving the chat page
        return () => {
            socket.disconnect();
        };
    }, [userId, targetUserId]);

    // auto-scroll to the latest message
    useEffect(() => {
        bottomRef.current?.scrollIntoView({ behavior: "smooth" });
    }, [messages]);

    const sendMessage = () => {
        if (!newMessage.trim()) return;

        socketRef.current.emit("sendMessage", {
            senderId: userId,
            receiverId: targetUserId,
            text: newMessage
        });

        setNewMessage("");
    };

    return (
        <div className="min-h-screen bg-[#0B1020] text-white flex flex-col p-6">
            <h1 className="text-xl font-bold mb-4">Chat</h1>

            <div className="flex-1 flex flex-col gap-2 overflow-y-auto bg-base-300 rounded-xl p-4 mb-4">
                {messages.map((msg, index) => {
                    const isMine = msg.senderId === userId;
                    return (
                        <div
                            key={index}
                            className={"max-w-xs px-4 py-2 rounded-xl " +
                                (isMine ? "bg-indigo-600 self-end" : "bg-base-100 self-start")}
                        >
                            {msg.text}
                        </div>
                    );
                })}
                <div ref={bottomRef}></div>
            </div>

            <div className="flex gap-3">
                <input
                    type="text"
                    className="input flex-1 bg-base-300"
                    placeholder="Type a message..."
                    value={newMessage}
                    onChange={(e) => setNewMessage(e.target.value)}
                    onKeyDown={(e) => e.key === "Enter" && sendMessage()}
                />
                <button className="btn bg-indigo-600 text-white" onClick={sendMessage}>
                    Send
                </button>
            </div>
        </div>
    );
};

export default Chat;