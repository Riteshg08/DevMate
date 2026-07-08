import { useState } from "react";
import { useDispatch } from "react-redux";
import { BASE_URL } from "../utils/constants";
import UserCard from "./UserCard";
import { addUser } from "../utils/userSlice";
import axios from "axios";

const EditProfile = ({ user }) => {
    const [firstName, setFirstName] = useState(user?.firstName);
    const [lastName, setLastName] = useState(user?.lastName);
    const [age, setAge] = useState(user?.age);
    const [about, setAbout] = useState(user?.about);
    const [photoUrl, setPhotoUrl] = useState(user?.photoUrl);
    const [username, setUsername] = useState(user?.username);
    const [title, setTitle] = useState(user?.title);
    const [company, setCompany] = useState(user?.company);
    const [location, setLocation] = useState(user?.location);
    const [skillsInput, setSkillsInput] = useState(user?.skills ? user?.skills.join(", ") : "");
    const [portfolioUrl, setPortfolioUrl] = useState(user?.portfolioUrl);
    const [githubUsername, setGithubUsername] = useState(user?.githubUsername);
    const [linkedinUrl, setLinkedinUrl] = useState(user?.linkedinUrl);
    const [experience, setExperience] = useState(0);
    const [error, setError] = useState("");
    const [showToast, setShowToast] = useState(false);

    if (!user) return null;

    const dispatch = useDispatch();

    const saveProfile = async () => {
        setError("");
        try {
            const skillsArray = skillsInput.split(",").map((skill) => skill.trim()).filter((skill) => skill.length > 0);

            const res = await axios.patch(BASE_URL + "/profile/edit", {
                firstName, lastName, age, about, photoUrl,
                username, title, company, location,
                skills: skillsArray,
                portfolioUrl, githubUsername, linkedinUrl, experience
            }, {
                withCredentials: true
            })
            dispatch(addUser(res?.data?.data));
            setShowToast(true);
            setTimeout(() => {
                setShowToast(false);
            }, 3000);
            console.log("Api success", res);
        }
        catch (err) {
            setError(err?.response?.data || "Something went wrong");
        }
    }

    return (
        <div>
            <div className="flex flex-col lg:flex-row justify-center items-center gap-10 px-4">
                <div className="flex justify-center items-center p-10">
                    <div className="card card-border bg-base-300 w-96">
                        <div className="card-body">
                            <h2 className="card-title justify-center">Edit Profile</h2>

                            <fieldset className="fieldset">
                                <legend className="fieldset-legend">Username:</legend>
                                <input type="text" className="input" value={username} onChange={(e) => setUsername(e.target.value)} />
                            </fieldset>
                            <fieldset className="fieldset">
                                <legend className="fieldset-legend">First Name:</legend>
                                <input type="text" className="input" value={firstName} onChange={(e) => setFirstName(e.target.value)} />
                            </fieldset>
                            <fieldset className="fieldset">
                                <legend className="fieldset-legend">Last Name:</legend>
                                <input type="text" className="input" value={lastName} onChange={(e) => setLastName(e.target.value)} />
                            </fieldset>
                            <fieldset className="fieldset">
                                <legend className="fieldset-legend">Title (e.g. Frontend Developer):</legend>
                                <input type="text" className="input" value={title} onChange={(e) => setTitle(e.target.value)} />
                            </fieldset>
                            <fieldset className="fieldset">
                                <legend className="fieldset-legend">Experience:</legend>
                                <input type="text" className="input" value={experience} onChange={(e) => setExperience(e.target.value)} />
                            </fieldset>
                            <fieldset className="fieldset">
                                <legend className="fieldset-legend">Company:</legend>
                                <input type="text" className="input" value={company} onChange={(e) => setCompany(e.target.value)} />
                            </fieldset>
                            <fieldset className="fieldset">
                                <legend className="fieldset-legend">Location:</legend>
                                <input type="text" className="input" value={location} onChange={(e) => setLocation(e.target.value)} />
                            </fieldset>
                            <fieldset className="fieldset">
                                <legend className="fieldset-legend">Portfolio URL:</legend>
                                <input type="text" className="input" value={portfolioUrl} onChange={(e) => setPortfolioUrl(e.target.value)} />
                            </fieldset>
                            <fieldset className="fieldset">
                                <legend className="fieldset-legend">GitHub Username:</legend>
                                <input type="text" className="input" placeholder="e.g. octocat" value={githubUsername} onChange={(e) => setGithubUsername(e.target.value)} />
                            </fieldset>
                            <fieldset className="fieldset">
                                <legend className="fieldset-legend">LinkedIn URL:</legend>
                                <input type="text" className="input" placeholder="https://linkedin.com/in/username" value={linkedinUrl} onChange={(e) => setLinkedinUrl(e.target.value)} />
                            </fieldset>
                            <fieldset className="fieldset">
                                <legend className="fieldset-legend">Age</legend>
                                <input type="number" className="input" value={age} onChange={(e) => setAge(e.target.value)} />
                            </fieldset>
                            <fieldset className="fieldset">
                                <legend className="fieldset-legend">Photo URL</legend>
                                <input type="text" className="input" value={photoUrl} onChange={(e) => setPhotoUrl(e.target.value)} />
                            </fieldset>
                            <fieldset className="fieldset">
                                <legend className="fieldset-legend">Skills (comma separated):</legend>
                                <input
                                    type="text"
                                    className="input"
                                    placeholder="JavaScript, React, Node.js"
                                    value={skillsInput}
                                    onChange={(e) => setSkillsInput(e.target.value)}
                                />
                            </fieldset>
                            <fieldset className="fieldset">
                                <legend className="fieldset-legend">About</legend>
                                <textarea className="textarea h-24" value={about} onChange={(e) => setAbout(e.target.value)}></textarea>
                                <div className="label">Optional</div>
                            </fieldset>

                            <p className="text-red-500">{error}</p>
                            <div className="card-actions justify-center p-3">
                                <button className="btn btn-primary" onClick={saveProfile}>Save</button>
                            </div>
                        </div>
                    </div>
                </div>
                <UserCard user={{ firstName, lastName, age, about, photoUrl }} />
            </div>
            {showToast && (
                <div className="toast toast-top toast-center">
                    <div className="alert alert-success">
                        <span>Profile save successfully!</span>
                    </div>
                </div>
            )}
        </div>
    );
};

export default EditProfile;


