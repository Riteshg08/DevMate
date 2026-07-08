import { Link } from "react-router-dom";
import { useState } from "react";
import ProgressBar from "./ProgressBar";

const SkillsStep = ({ formData, updateFormData, back, onFinish }) => {
    // Only the 5 most common skills are shown as quick-pick buttons.
    // Anything else, the user types in themselves below.
    const mainSkills = [
        "React",
        "Node.js",
        "JavaScript",
        "Python",
        "TypeScript"
    ];

    const [customSkillInput, setCustomSkillInput] = useState("");

    const handleSkillClick = (skill) => {
        if (formData.skills.includes(skill)) {
            updateFormData(
                "skills",
                formData.skills.filter((item) => item !== skill)
            );
        } else {
            updateFormData("skills", [...formData.skills, skill]);
        }
    };

    const handleAddCustomSkill = () => {
        const trimmedSkill = customSkillInput.trim();

        if (trimmedSkill === "") {
            return; // don't add empty skills
        }

        if (formData.skills.includes(trimmedSkill)) {
            setCustomSkillInput("");
            return; // already added, don't add it twice
        }

        updateFormData("skills", [...formData.skills, trimmedSkill]);
        setCustomSkillInput(""); // clear the input box after adding
    };

    return (
        <div className="min-h-screen bg-[#0B1020] flex flex-col items-center justify-center px-4 py-8 sm:px-6 lg:px-8">

            {/* Logo */}
            <div className="flex items-center gap-3 mb-8">
                <div className="w-10 h-10 rounded-full bg-gradient-to-r from-indigo-500 to-purple-600 flex items-center justify-center text-white font-bold">
                    {"</>"}
                </div>

                <h1 className="text-2xl sm:text-3xl font-bold text-white">
                    DevTinder
                </h1>
            </div>

            {/* Progress */}
            <ProgressBar step={3} />

            {/* Card */}
            <div className="w-full max-w-4xl bg-[#1E293B] border border-gray-700 rounded-2xl p-5 sm:p-6 lg:p-8 mt-5">

                <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-white">
                    Select your skills
                </h2>

                <p className="text-gray-400 text-sm sm:text-base mt-2">
                    Choose the technologies you're comfortable working with.
                </p>

                {/* Main skills (max 5 shown as quick picks) */}

                <div className="flex flex-wrap gap-2 sm:gap-3 lg:gap-4 mt-6 sm:mt-8">

                    {mainSkills.map((skill) => (

                        <button
                            key={skill}
                            onClick={() => handleSkillClick(skill)}
                            className={`
                                px-4 sm:px-5
                                py-2 sm:py-3
                                rounded-full
                                border
                                text-sm sm:text-base
                                transition-all
                                duration-200

                                ${
                                    formData.skills.includes(skill)
                                        ? "bg-violet-600 border-violet-500 text-white"
                                        : "bg-[#2B3548] border-gray-700 text-gray-300 hover:border-violet-500"
                                }
                            `}
                        >
                            {skill}
                        </button>

                    ))}

                </div>

                {/* Add your own skill */}

                <div className="mt-6">
                    <label className="block text-gray-300 mb-1">
                        Add another skill
                    </label>

                    <div className="flex gap-3">
                        <input
                            type="text"
                            placeholder="e.g. GraphQL"
                            value={customSkillInput}
                            onChange={(e) => setCustomSkillInput(e.target.value)}
                            onKeyDown={(e) => {
                                if (e.key === "Enter") {
                                    e.preventDefault();
                                    handleAddCustomSkill();
                                }
                            }}
                            className="flex-1 bg-[#0F172A] border border-gray-700 rounded-xl px-4 py-3 text-white outline-none focus:border-violet-500"
                        />

                        <button
                            onClick={handleAddCustomSkill}
                            className="px-5 sm:px-6 rounded-xl border border-violet-500 text-violet-300 hover:bg-violet-600/10 transition"
                        >
                            Add
                        </button>
                    </div>
                </div>

                {/* Your selected skills */}

                {formData.skills.length > 0 && (
                    <div className="mt-6">
                        <p className="text-gray-400 text-sm mb-2">
                            Your skills ({formData.skills.length})
                        </p>

                        <div className="flex flex-wrap gap-2 sm:gap-3">
                            {formData.skills.map((skill) => (
                                <span
                                    key={skill}
                                    className="flex items-center gap-2 px-4 py-2 rounded-full bg-violet-600 border border-violet-500 text-white text-sm"
                                >
                                    {skill}
                                    <button
                                        onClick={() => handleSkillClick(skill)}
                                        className="text-white/70 hover:text-white"
                                    >
                                        ×
                                    </button>
                                </span>
                            ))}
                        </div>
                    </div>
                )}

                {/* Buttons */}

                <div className="flex flex-col sm:flex-row gap-4 mt-8">

                    <button
                        onClick={back}
                        className="flex-1 py-3 sm:py-4 rounded-xl border border-gray-700 text-gray-300 hover:bg-white/5 transition"
                    >
                        Back
                    </button>

                    <button
                        onClick={onFinish}
                        className="flex-1 py-3 sm:py-4 rounded-xl bg-gradient-to-r from-indigo-500 via-violet-500 to-purple-600 text-white font-semibold hover:opacity-90 transition"
                    >
                        Complete Profile →
                    </button>

                </div>

            </div>

            {/* Login */}

            <p className="text-gray-400 text-sm sm:text-base mt-8 text-center">
                Already have an account?{" "}
                <Link
                    to="/login"
                    className="text-violet-400 hover:underline"
                >
                    Sign in
                </Link>
            </p>

        </div>
    );
};

export default SkillsStep;