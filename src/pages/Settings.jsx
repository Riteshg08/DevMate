import { useNavigate } from "react-router-dom";
import axios from "axios"; 
import { BASE_URL } from "../utils/constants";

const Settings = () => {
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await axios.post(BASE_URL + "/logout", {
        withCredentials: true,
      });

      navigate("/");
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="m-50">
      <button
        onClick={handleLogout}
        className="bg-red-500 text-white rounded-2xl p-4"
      >
        Logout
      </button>
    </div>
  );
};

export default Settings;