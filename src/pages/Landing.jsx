import LandingNavbar from "../components/landing/LandingNavbar";
import Hero from "../components/landing/Hero";
import Features from "../components/landing/Features";
import Footer from "../components/landing/Footer";

const Landing = () => {
  return (
    <div className="relative overflow-hidden bg-[#0B1020] text-white">

      {/* Background Glow */}
      <div className="absolute left-1/2 top-52 -translate-x-1/2 w-[700px] h-[700px] rounded-full bg-violet-600/20 blur-[170px]"></div>

      <div className="relative z-10">
        <LandingNavbar />
        <Hero />
        <Features />
        <Footer />
      </div>

    </div>
  );
};

export default Landing;