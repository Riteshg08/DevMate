import EditProfile from "./EditProfile";
import { useSelector } from "react-redux";

const Profile = () => {
    const user = useSelector((state) => state.user);
    return (
        <>
            <EditProfile user={user}/>
        </>
    );
};

export default Profile;