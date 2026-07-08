import { Link } from "react-router-dom";
import ProgressBar from "./ProgressBar";

const AccountStep = ({ next }) => {
  return (
    <div className="min-h-screen bg-[#0B1020] flex flex-col items-center justify-center px-4 py-8 sm:px-6 lg:px-8">
      {/* Logo */}
      <div className="flex items-center gap-3 mb-5">
        <div className="w-10 h-10 rounded-full bg-gradient-to-r from-indigo-500 to-purple-600 flex items-center justify-center text-white font-bold">
          {"</>"}
        </div>
       <h1 className="text-xl sm:text-2xl font-bold text-white">
          DevTinder
        </h1>
      </div>

      {/* Progress Bar */}
      <ProgressBar step={1} />

      {/* Card */}
      <div className="w-full max-w-lg bg-[#1E293B] rounded-2xl border border-gray-700 p-3 sm:p-5 lg:p-7 mt-3">
        <h2 className="text-xl sm:text-2xl lg:text-3xl font-bold text-white pb-3">
          Create your account
        </h2>

        {/* Social Buttons */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <button className="border border-gray-600 rounded-xl py-2 text-gray-300 hover:bg-white/5 transition">
            GitHub
          </button>
          <button className="border border-gray-600 rounded-xl py-2 text-gray-300 hover:bg-white/5 transition">
            Google
          </button>
        </div>

        {/* Divider */}
        <div className="flex items-center my-2">
          <div className="flex-1 h-px bg-gray-700"></div>
          <span className="px-4 text-gray-500 text-sm">
            or with email
          </span>
          <div className="flex-1 h-px bg-gray-700"></div>
        </div>

        {/* Full Name */}
        <div className="mb-3">
          <label className="block text-gray-300 mb-1">
            Full Name
          </label>
          <input type="text" placeholder="Jordan Lee" className="w-full bg-[#0F172A] border border-gray-700 rounded-xl px-4 py-3 text-sm sm:text-base text-white outline-none focus:border-violet-500"/>
        </div>

        {/* Email */}
        <div className="mb-3">
          <label className="block text-gray-300 mb-1">
            Email
          </label>
          <input type="email" placeholder="you@example.com" className="w-full bg-[#0F172A] border border-gray-700 rounded-xl px-4 py-3 text-white outline-none focus:border-violet-500"/>
        </div>

        {/* Password */}
        <div>
          <label className="block text-gray-300 mb-1">
            Password
          </label>
          <input type="password" placeholder="********" className="w-full bg-[#0F172A] border border-gray-700 rounded-xl px-4 py-3 text-white outline-none focus:border-violet-500" />
        </div>

        {/* Continue Button */}
        <button onClick={next} className="w-full mt-5 py-3 sm:py-4 rounded-xl bg-gradient-to-r from-indigo-500 via-violet-500 to-purple-600 text-white font-semibold hover:scale-[1.02] transition" >Continue → </button>
      </div>

      {/* Login */}
      <p className="text-gray-400  text-sm sm:text-base mt-4 text-center">
        Already have an account?{" "}
        <Link to="/login" className="text-violet-400 hover:underline">
          Sign in
        </Link>
      </p>
    </div>
  );
};

export default AccountStep;