import { useEffect, useState } from "react";
import axios from "axios";
import { BASE_URL } from "../utils/constants";
import { UserPlus, Heart, Eye, MessageCircle } from "lucide-react";

const timeAgo = (dateString) => {
    if (!dateString) return "";
    const seconds = Math.floor((new Date() - new Date(dateString)) / 1000);
    if (seconds < 60) return "just now";
    const minutes = Math.floor(seconds / 60);
    if (minutes < 60) return minutes + "m ago";
    const hours = Math.floor(minutes / 60);
    if (hours < 24) return hours + "h ago";
    const days = Math.floor(hours / 24);
    return days + "d ago";
};

// pick an icon based on notification type
const getIcon = (type) => {
    if (type === "request") return UserPlus;
    if (type === "match") return Heart;
    if (type === "profileView") return Eye;
    if (type === "message") return MessageCircle;
    return UserPlus;
};

const Notifications = () => {
    const [notifications, setNotifications] = useState([]);

    const fetchNotifications = async () => {
        try {
            const res = await axios.get(BASE_URL + "/user/notifications", {
                withCredentials: true
            });
            setNotifications(res?.data?.data || []);
        } catch (err) {
            console.error(err);
        }
    };

    const markAllRead = async () => {
        try {
            await axios.patch(BASE_URL + "/user/notifications/markAllRead", {}, {
                withCredentials: true
            });
            // update locally too, so the UI reflects it instantly
            setNotifications(notifications.map((n) => ({ ...n, isRead: true })));
        } catch (err) {
            console.error(err);
        }
    };

    useEffect(() => {
        fetchNotifications();
    }, []);

    return (
        <div className="min-h-screen bg-[#0B1020] text-white p-10">
            <div className="flex justify-between items-center mb-6">
                <h1 className="text-3xl font-bold">Notifications</h1>
                {notifications.length > 0 && (
                    <button
                        onClick={markAllRead}
                        className="text-indigo-400 text-sm hover:underline"
                    >
                        Mark all read
                    </button>
                )}
            </div>

            {notifications.length === 0 && (
                <p className="text-center opacity-60 mt-10">No notifications yet!</p>
            )}

            <div className="flex flex-col gap-3">
                {notifications.map((note) => {
                    const Icon = getIcon(note.type);
                    const user = note.fromUserId;

                    return (
                        <div
                            key={note._id}
                            className="flex items-center gap-4 bg-base-300 rounded-xl p-4"
                        >
                            {user?.photoUrl ? (
                                <img
                                    src={user.photoUrl}
                                    alt="photo"
                                    className="w-12 h-12 rounded-full object-cover"
                                />
                            ) : (
                                <div className="w-12 h-12 rounded-full bg-base-100 flex items-center justify-center">
                                    <Icon size={20} />
                                </div>
                            )}

                            <div className="flex-1">
                                <p>{note.message}</p>
                                <p className="text-xs opacity-50 mt-1">{timeAgo(note.createdAt)}</p>
                            </div>

                            {!note.isRead && (
                                <span className="w-2.5 h-2.5 rounded-full bg-indigo-500"></span>
                            )}
                        </div>
                    );
                })}
            </div>
        </div>
    );
};

export default Notifications;