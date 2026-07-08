import { Link } from "react-router-dom";
import { useState } from "react";
import ProgressBar from "./ProgressBar";

const RoleStep = ({ formData, updateFormData, next, back }) => {
  const [showOtherInput, setShowOtherInput] = useState(false);

  const roles = [
    "Frontend Developer",
    "Backend Engineer",
    "Full Stack",
    "ML Engineer",
    "DevOps",
    "Mobile Dev",
    "Data Scientist",
    "Security Eng.",
    "Other"
  ];

  const handleRoleClick = (role) => {
    if (role === "Other") {
      setShowOtherInput(true);
      updateFormData("title", ""); // clear so the user can type their own
    } else {
      setShowOtherInput(false);
      updateFormData("title", role);
    }
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
      <ProgressBar step={2} />

      {/* Card */}
      <div className="w-full max-w-3xl bg-[#1E293B] border border-gray-700 rounded-2xl p-5 sm:p-6 lg:p-8 mt-8">
        <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-white">
          What do you do?
        </h2>

        <p className="text-gray-400 text-sm sm:text-base mt-2">
          We'll find developers who complement your expertise.
        </p>

        {/* Roles */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mt-8">
          {roles.map((role) => (<button key={role} onClick={() => handleRoleClick(role)} className={`rounded-xl px-4 py-3 sm:py-4 text-sm sm:text-base border transition ${(role === "Other" ? showOtherInput : formData.title === role && !showOtherInput) ?
              "bg-violet-600/20 border-violet-500 text-white"
              :
              "bg-[#2B3548] border-gray-700 text-gray-300 hover:border-violet-500"
            } `}>
            {role}
          </button>
          ))}
        </div>

        {/* Shown only when the user picks "Other" */}
        {showOtherInput && (
          <div className="mt-4">
            <label className="block text-gray-300 mb-1">
              Tell us your role
            </label>
            <input
              type="text"
              placeholder="e.g. Blockchain Developer"
              value={formData.title}
              onChange={(e) => updateFormData("title", e.target.value)}
              className="w-full bg-[#0F172A] border border-gray-700 rounded-xl px-4 py-3 text-white outline-none focus:border-violet-500"
            />
          </div>
        )}

        {/* Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 mt-8 gap-4 mt-8">
          <button onClick={back} className="flex-1 py-3 sm:py-4 rounded-xl border border-gray-700 text-gray-300 hover:bg-white/5">
            Back
          </button>

          <button onClick={next} className="flex-1 py-3 sm:py-4 rounded-xl bg-gradient-to-r from-indigo-500 via-violet-500 to-purple-600 text-white font-semibold">
            Continue →
          </button>
        </div>
      </div>

      {/* Login */}

      <p className="text-gray-400 text-center text-sm sm:text-base mt-8">
        Already have an account?{" "}
        <Link to="/login" className="text-violet-400 hover:underline">
          Sign in
        </Link>
      </p>
    </div>

  );

};

export default RoleStep;