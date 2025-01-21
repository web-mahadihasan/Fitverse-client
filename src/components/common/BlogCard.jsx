import { Icon } from "@iconify/react/dist/iconify.js";
import React, { useState } from "react";
import { PiArrowFatDown, PiArrowFatDownFill, PiArrowFatUp, PiArrowFatUpFill } from "react-icons/pi";
import { Button } from "@/components/ui/button";
import { ShinyButton } from "@/components/ui/shiny-button";
import { BsThreeDotsVertical } from "react-icons/bs";
import {  FaRegCommentAlt } from "react-icons/fa";
import { Link } from "react-router";
import { ArrowUpRightFromSquareIcon } from "lucide-react";

const BlogCard = () => {
    // action constrols
    const [isOpen, setIsOpen] = useState(false);
    const [upVote, setUpVote] = useState(false);
    const [downVote, setDownVote] = useState(false);


    const handleUpVote = () => {
        setUpVote(!upVote)
        setDownVote(false)
    }
    const handleDownVote = () => {
        setDownVote(!downVote)
        setUpVote(false)
    }
  return (
    <div className="w-full lg:w-[80%] lg:mx-auto xl:w-full bg-[#fff] rounded blog-shadow hover:bg-gray-100 dark:border-gray-700 dark:bg-gray-800 dark:hover:bg-gray-700">
      <div className="flex w-full justify-between items-center p-4">
        <div className="flex items-center gap-4">
          <div className="w-[50px] h-[50px] flex items-center
          justify-center text-[#fff] text-[1.3rem] rounded-full bg-[#f36f23]">
            R
          </div>

          <div className="">
            <h2 className="font-[500] text-[1.2rem] dark:text-gray-200">Author Name . <span className="font-normal text-sm">dec 21, 2025</span></h2>
            <p className="text-[#424242] text-[0.9rem] dark:text-gray-400">Posted by Admin</p>
          </div>
        </div>
        <BsThreeDotsVertical className="text-text rounded-full
        text-[2.5rem] p-2 hover:bg-[#ececec] cursor-pointer" />
        
      </div>

       
      <p className="text-[#424242] p-4 dark:text-slate-300">
        This impressive paella is a perfect party dish and a fun meal to cook
        together with your guests. Add 1 cup of frozen peas along with the
        mussels, if you like.
      </p>
      <div className="px-4 mb-2 flex items-center flex-wrap gap-2">
        <Link className="text-[#676767] bg-gray-50 border border-gray-200 px-3 w-fit rounded-sm py-[1px] dark:bg-gray-700 dark:text-gray-400 dark:border-gray-500 hover:text-main hover:border-main dark:hover:text-main-light dark:hover:border-main-light">#fitness</Link>
        <Link className="text-[#676767] bg-gray-50 border border-gray-200 px-3 w-fit rounded-sm py-[1px] dark:bg-gray-700 dark:text-gray-400 dark:border-gray-500 hover:text-main hover:border-main dark:hover:text-main-light dark:hover:border-main-light">#fitness</Link>
      </div>
      <img
        src="https://img.freepik.com/premium-photo/tasty-tofu-stir-fry-with-veggies-crispy-tofu-
        fresh-cilantro-perfect-vegan-meal-healthy_763042-1514.jpg"
        alt=""
        className="w-full h-[300px] object-cover"
        />
        
      <div className="flex items-center gap-4 justify-between w-full py-4 px-2">
        <div className="flex items-center gap-6 md:gap-1">
            <div className="flex items-center gap-4 border p-[2px] px-3 rounded-full divide-x border-gray-200 dark:bg-[#393939] backdrop-blur-lg dark:text-slate-200 dark:border-slate-500">
            <button onClick={handleUpVote} className="flex items-center gap-1 text-slate-600 dark:text-slate-400 hover:text-main dark:hover:text-main-light">
                {
                    upVote ?  <span className="text-main"><PiArrowFatUpFill size={18}/></span> : <PiArrowFatUp size={18} />
                }
                
                {/**/}
                <span className={`inline-block mt-1 text-base ${upVote? "text-main" : ""}`}>. <span className="text-gray-500">07</span></span>
            </button>
            <button onClick={handleDownVote} className="flex items-center gap-1 text-slate-600 px-1 dark:text-slate-400 hover:text-main dark:hover:text-main-light">
                {
                    downVote ? <span className="text-main"><PiArrowFatDownFill size={18}/></span> : <span><PiArrowFatDown size={18}/></span>
                }
                {/*  */}
                {/* <Icon icon="bxs:downvote" width="24" height="24" /> */}
                <span>. 2</span>
            </button>
            </div>
            <div className="">
                <button className="flex items-center gap-2 text-slate-600 px-1 dark:text-slate-400 hover:text-main dark:hover:text-main-light">
                    <span><FaRegCommentAlt /></span>
                    <span>10</span>
                </button>
            </div>
        </div>
        
        <div>
        <Link to={"/all-trainers"}>
            <ShinyButton className={"px-0 py-0 border-none border-main hover:bg-main  duration-300 transition-all ease-linear group"}>
            <button size="lg" className="flex items-center gap-1 py-1.5 border border-main px-2 rounded-lg text-main font-poppins tracking-wide group-hover:text-white">
                Read More <ArrowUpRightFromSquareIcon className="w-4 h-4 md:hidden lg:block" />
            </button>
            </ShinyButton>
        </Link>
        </div>
        <div>

        </div>
      </div>

      
    </div>
  );
};

export default BlogCard;
            