import axios from "axios";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { motion } from "framer-motion";

import UserCard from "./UserCard";
import { BASE_URL } from "../utils/constants";
import { addUserToFeed, removeUserFromFeed } from "../utils/feedSlice";

const Feed = () => {
    const feed = useSelector((store) => store.feed);
    const dispatch = useDispatch();

    const getFeed = async () => {
        try {
            if (feed) return;

            const res = await axios.get(BASE_URL + "/feed", {
                withCredentials: true,
            });

            dispatch(addUserToFeed(res.data.users));
        } catch (err) {
            console.error(err);
        }
    };

    const handleSwipe = async (direction, user) => {
        try {
            const status =
                direction === "right" ? "interested" : "ignored";

            await axios.post(
                `${BASE_URL}/request/send/${status}/${user._id}`,
                {},
                {
                    withCredentials: true,
                }
            );

            dispatch(removeUserFromFeed(user._id));
        } catch (err) {
            console.error(err);
        }
    };

    const handleDragEnd = (event, info) => {
        console.log(info.offset.x);
        if (!feed || feed.length === 0) return;

        const swipeThreshold = 120;

        if (info.offset.x > swipeThreshold) {
            handleSwipe("right", feed[0]);
        } else if (info.offset.x < -swipeThreshold) {
            handleSwipe("left", feed[0]);
        }
    };

    useEffect(() => {
        getFeed();
    }, []);

    if (!feed) {
        return (
            <h1 className="text-center my-10 text-xl">
                Loading...
            </h1>
        );
    }

    if (feed.length === 0) {
        return (
            <h1 className="text-center my-10 text-xl">
                No Users Found
            </h1>
        );
    }

    return (
        <div className="flex justify-center mt-10 px-4">
            <motion.div
                drag="x"
                dragConstraints={{ left: 0, right: 0 }}
                whileTap={{ scale: 1.02 }}
                whileDrag={{ rotate: 12 }}
                onDragEnd={handleDragEnd}
            >
                <UserCard user={feed[0]} />
            </motion.div>
        </div>
    );
};

export default Feed;