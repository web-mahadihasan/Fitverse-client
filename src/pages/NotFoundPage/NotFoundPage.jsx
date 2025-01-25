import React, { useEffect, useRef } from "react";
import image1 from "../../assets/images/404page.png"
import { Link } from "react-router";
import { BsArrowLeft } from "react-icons/bs";

const NotFoundPage = () => {

  return (
<div className="boxShadow px-10 w-full flex items-center flex-col justify-center py-20 rounded-xl">
            <img src={image1} alt="illustration"
                 className="w-full lg:w-[400px]"/>
            <p className="text-[#73718A] text-[0.9rem] sm:text-[1.2rem] w-full lg:w-[55%] text-center mt-10 lg:mt-4">The
                page cannot be found. The requested
                URL was not found on this server.</p>

               <Link to={"/"}>
               <button className="flex items-center gap-2 font-poppins mt-6 bg-gradient-to-r from-[#5A29E4] to-[#9F72F9] hover:bg-transparent px-6 py-2 rounded-md border border-main-light relative overflow-hidden before:absolute before:inset-0 before:translate-x-full hover:before:translate-x-0 before:transition-transform before:duration-300 before:bg-gradient-to-r before:from-indigo-500 before:via-purple-500 before:to-pink-500  before:z-[-1] text-white z-10" >
                <BsArrowLeft size={22} />
                  Back to home
              </button>
               </Link>
        </div>
  );
};

export default NotFoundPage;
