import React from "react";
import Navbar from "../Components/Navbar";
import home from "../assets/home1.jpg";
import { SiViaplay } from "react-icons/si";
import ai from "../assets/ai.png";
import ai1 from "../assets/SearchAi.png";
import Logos from "../Components/Logos";
import ExploreCourses from "../Components/ExploreCourses";
import CardPage from "../Components/CardPage";
import { useNavigate } from "react-router-dom";
import About from "../Components/About";
import Footer from "../Components/Footer";
import ReviewPage from "../Components/ReviewPage";

const Home = () => {

  const navigate = useNavigate();

  return (
    <div className="w-full overflow-hidden">
      <div className="w-full lg:h-[140vh] h-[70vh] relative">
        <Navbar />

        <img
          src={home} 
          alt=""
          className="object-cover md:object-fill w-full lg:h-full h-[50vh]"
        />

        <span className="lg:text-[70px] absolute md:text-[40px] lg:top-[10%] top-[15%] w-full flex items-center justify-center text-white font-bold text-[20px]">
          Grow Your Skills to Advance
        </span>
        <span className="lg:text-[70px] absolute md:text-[40px] lg:top-[18%] top-[20%] w-full flex items-center justify-center text-white font-bold text-[20px]">
          Your Career Path
        </span>

        <div className="absolute lg:top-[30%] top-[75%] md:top-[80%] w-full flex  items-center justify-center gap-3 flex-wrap">
          <button className="px-5 py-2.5 border lg:border-white border-black lg:text-white text-black rounded-[10px] text-[18px] font-light flex gap-2 cursor-pointer items-center justify-center" onClick={() => navigate('/all-courses')}>
            View All Courses{" "}
            <SiViaplay className="w-6.5 h-6.5 lg:text-white text-black" />
          </button>
          <button className="px-5 py-2.5 border lg:bg-white bg-black border-black text-white lg:text-black rounded-[10px] text-[18px] font-light flex gap-2 cursor-pointer items-center justify-center" onClick={() => navigate('/search')}>
            Search With AI{" "}
            <img
              src={ai}
              alt=""
              className="w-6.5 h-6.5 rounded-full hidden lg:block"
            />{" "}
            <img src={ai1} className="w-7 h-7 rounded-full lg:hidden" alt="" />
          </button>
        </div>
      </div>
      
      <Logos/>

      <ExploreCourses/>

      <CardPage/>

      <About/>

      <ReviewPage/>

      <Footer/>
    </div>
  );
};

export default Home;
