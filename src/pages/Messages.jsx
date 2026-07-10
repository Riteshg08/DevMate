import { useEffect, useState } from "react";
import axios from "axios";
import { BASE_URL } from "../utils/constants";
import { useNavigate } from "react-router-dom";

const Messages = () => {
    const [connections, setConnections] = useState([]);
    const navigate = useNavigate();

    const fetchConnections = async () => {
        try {
            const res = await axios.get(BASE_URL + "/user/connections", {
                withCredentials: true
            });
            setConnections(res?.data?.data || []);
        } catch (err) {
            console.error(err);
        }
    };

    useEffect(() => {
        fetchConnections();
    }, []);

    return (
        <div className="min-h-screen bg-[#0B1020] text-white p-10">
            <h1 className="text-3xl font-bold mb-6">Messages</h1>

            {connections.length === 0 && (
                <p className="opacity-60">No connections to message yet!</p>
            )}

            <div className="flex flex-col gap-3">
                {connections.map((conn) => (
                    <div
                        key={conn._id}
                        onClick={() => navigate("/messages/" + conn._id)}
                        className="flex items-center gap-4 bg-base-300 rounded-xl p-4 cursor-pointer hover:bg-base-100"
                    >
                        <img
                            src={conn.photoUrl}
                            alt="photo"
                            className="w-12 h-12 rounded-full object-cover"
                        />
                        <div>
                            <h2 className="font-semibold">
                                {conn.firstName + " " + conn.lastName}
                            </h2>
                            {conn.title && (
                                <p className="text-sm text-indigo-400">{conn.title}</p>
                            )}
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Messages;