import { Link } from "react-router-dom";

const Footer = () => {
  return (

    <footer className="border-t border-white/10 mt-24">

      <div className="max-w-7xl mx-auto px-8 py-12 flex flex-col md:flex-row justify-between items-center">

        <div>

          <h2 className="text-2xl font-bold">

            DevTinder

          </h2>

          <p className="text-gray-400 mt-2">

            Find developers. Build together.

          </p>

        </div>

        <div className="flex gap-8 mt-8 md:mt-0">

          <Link
            to="/"
            className="text-gray-400 hover:text-white"
          >
            Home
          </Link>

          <Link
            to="/login"
            className="text-gray-400 hover:text-white"
          >
            Login
          </Link>

          <Link
            to="/signup"
            className="text-gray-400 hover:text-white"
          >
            Register
          </Link>

        </div>

      </div>

    </footer>

  );
};

export default Footer;