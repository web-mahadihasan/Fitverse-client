import { Icon } from "@iconify/react/dist/iconify.js";
import React, { useEffect, useState } from "react";
import { PiArrowFatDown, PiArrowFatDownFill, PiArrowFatUp, PiArrowFatUpFill } from "react-icons/pi";
import { Button } from "@/components/ui/button";
import { ShinyButton } from "@/components/ui/shiny-button";
import { BsThreeDotsVertical } from "react-icons/bs";
import {  FaRegCommentAlt } from "react-icons/fa";
import { Link } from "react-router";
import { ArrowUpRightFromSquareIcon } from "lucide-react";
import { format } from "date-fns";
import toast from "react-hot-toast";
import useAxiosSecured from "../../hooks/useAxiosSecured";
import useAuth from "../../hooks/useAuth";
import useGetUser from "../../hooks/useGetUser";
import { useQuery } from "@tanstack/react-query";
import useAxiosPublic from "../../hooks/useAxiosPublic";

const BlogCard = ({forumData, refetch}) => {
    const axiosSecured = useAxiosSecured()
    const axiosPublic = useAxiosPublic()
    const [upVote, setUpVote] = useState(false);
    const [downVote, setDownVote] = useState(false);
    const {user} = useAuth()
    const [getUser] = useGetUser()

  //   const { data: getUser } = useQuery({
  //     queryKey: [user?.email, "userInBlog"],
  //     queryFn: async () => {
  //         const { data } = await axiosSecured.get(`/users/${user?.email}`);
  //         return data;
  //     },
  //     enabled: !!user,
  // });

    const {_id, name, coverImage, title, description,comments, postedDate, image, upvote, downvote, role, upvoteUser, downvoteUser } = forumData || {}
    useEffect(()=> {
      // For up vote 
      if(upvoteUser){
        const isUpvoted = upvoteUser.find(item => item === getUser?._id)
        if(isUpvoted){
          setUpVote(true)
          setDownVote(false)
        }
      }
      // For down vote 
      if(downvoteUser){
        const isUpvoted = downvoteUser.find(item => item === getUser?._id)
        if(isUpvoted){
          setUpVote(false)
          setDownVote(true)
        }
      }
    }, [downvoteUser, getUser, upvoteUser])

    // Hangle upvote 
    const handleUpVote = async () => {
        // setUpVote(!upVote)   
        if(user){
          if(!upVote){
            const {data} = await axiosSecured.post(`/forum-api/upvote/${_id}`, {userId: getUser?._id})
            if(data.modifiedCount > 0){
              refetch()
            }
          }else{
            toast.error("You already voted")
          }
        } else{
          toast.error("Your must login for voted")
        }
    }

    // Handle Down vote 
      const handleDownVote = async () => {
        // setUpVote(!upVote)   
        if(user){
          if(!downVote){
            const {data} = await axiosSecured.post(`/forum-api/downvote/${_id}`, {userId: getUser?._id})
            if(data.modifiedCount > 0){
              refetch()
            }
          }else{
            toast.error("You already voted")
          }
        } else{
          toast.error("Your must login for voted")
        }
    }

  return (
    <div className="w-full lg:w-[80%] lg:mx-auto xl:w-full bg-[#fff] font-poppins rounded blog-shadow hover:bg-gray-100 dark:border-gray-700 dark:bg-gray-800 dark:hover:bg-gray-700 flex flex-col">
      <div className="flex w-full justify-between items-center p-4">
        <div className="flex items-center gap-4">
          <div className="w-[50px] h-[50px] flex items-center
          justify-center text-[#fff] text-[1.3rem] rounded-full">
            <img src={image} alt="" className="rounded-full"/>
          </div>

          <div className="">
            <h2 className="font-[500] text-[1.2rem] dark:text-gray-200">{name} <span className="font-normal text-sm">{format(postedDate, "PP")}</span></h2>
            <p className="text-[#424242] text-[0.9rem] dark:text-gray-400">Posted by {role}</p>
          </div>
        </div>
        <BsThreeDotsVertical className="text-text rounded-full
        text-[2.5rem] p-2 hover:bg-[#ececec] cursor-pointer" />
        
      </div>

       <h3 className="flex-wrap flex-1 w-full px-4 text-xl font-semibold">{title}</h3>
      <p className="text-[#424242] p-4 dark:text-slate-300 h-[84px] line-clamp-3 mb-3">
        {description}
      </p>
      
      <img
        src={coverImage}
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
                  
                  <span className={`inline-block mt-1 text-base ${upVote? "text-main" : ""}`}>. <span className="text-gray-500">{upvote}</span></span>
              </button>
              <button onClick={handleDownVote} className="flex items-center gap-1 text-slate-600 px-1 dark:text-slate-400 hover:text-main dark:hover:text-main-light">
                  {
                      downVote ? <span className="text-main"><PiArrowFatDownFill size={18}/></span> : <span><PiArrowFatDown size={18}/></span>
                  }
                  <span>{downvote}</span>
              </button>
            </div>
            <div className="">
                <button className="flex items-center gap-2 text-slate-600 px-1 dark:text-slate-400 hover:text-main dark:hover:text-main-light">
                    <span><FaRegCommentAlt /></span>
                    <span>{comments}</span>
                </button>
            </div>
        </div>
        
        <div>
        <Link to={`/forums/details/${_id}`}>
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
            