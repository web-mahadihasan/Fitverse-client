import { useQuery } from "@tanstack/react-query";
import React, { useEffect, useState } from "react";
import { Helmet } from "react-helmet";
import { FaRegCommentAlt } from "react-icons/fa";
import { PiArrowFatDown, PiArrowFatDownFill, PiArrowFatUp, PiArrowFatUpFill } from "react-icons/pi";
import useAxiosSecured from "../../hooks/useAxiosSecured";
import AnimatedLoader from "../Loading/Loading";
import { useParams } from "react-router";
import useAuth from "../../hooks/useAuth";
import useGetUser from "../../hooks/useGetUser";
import toast from "react-hot-toast";

const BlogDetails = () => {
    const axiosSecured = useAxiosSecured()
    const {id} = useParams()
    const [upVote, setUpVote] = useState(false);
    const [downVote, setDownVote] = useState(false);
    const {user} = useAuth()
    const [getUser] = useGetUser()

    const {data : blog, refetch, isLoading} = useQuery({
      queryKey: ["blogDetails"],
      queryFn: async () => {
        const {data} = await axiosSecured.get(`/forum-api/forum-details/${id}`)
        return data
      }
    })

    const {_id, name, coverImage, title, description,comments, postedDate, image, upvote, downvote, role, upvoteUser, downvoteUser } = blog || {}
    useEffect(()=> {
      if(upvoteUser){
        const isUpvoted = upvoteUser.find(item => item === getUser?._id)
        if(isUpvoted){
          setUpVote(true)
          setDownVote(false)
        }
      }
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
  if(isLoading) return <AnimatedLoader/>
  return (
    <div className="max-w-7xl mx-auto px-4 xl:px-0  my-24">
      <Helmet>
          <title>Fitverse | Blog Details </title>
          <meta name="Mahadi hasan" content="https://fitverse-bd.web.app/" />
      </Helmet>
      <div className="max-w-3xl w-full bg-white mx-auto shadow-lg rounded-2xl overflow-hidden">
        <img
          src={coverImage}
          alt={title}
          className="w-full h-80 object-cover"
        />
        <div className="p-6">
          <h1 className="text-2xl font-bold text-gray-800">{title}</h1>
          <p className="text-gray-600 mt-4">{description}</p>

          <div className="mt-6 flex items-center gap-4">
            <img
              src={image}
              alt={name}
              className="w-14 h-14 rounded-full object-cover"
            />
            <div>
              <h2 className="text-lg font-semibold text-gray-800">{name}</h2>
              <p className="text-sm text-gray-500">{role}</p>
            </div>
          </div>

          <div className="mt-6 flex justify-between items-center text-gray-600 text-sm">
            <p className="font-medium">Posted on: {postedDate}</p>
            <div className="flex items-center gap-6 md:gap-4">
                <div className="flex items-center gap-4 border p-[2px] px-3 rounded-full divide-x border-gray-200 dark:bg-[#393939] backdrop-blur-lg dark:text-slate-200 dark:border-slate-500">
                <button onClick={handleUpVote} className="flex items-center gap-1 text-slate-600 dark:text-slate-400 hover:text-main dark:hover:text-main-light">
                    {
                        upVote ?  <span className="text-main"><PiArrowFatUpFill size={18}/></span> : <PiArrowFatUp size={18} />
                    }
                    
                    <span className={`inline-block mt-1 text-base ${upVote? "text-main" : ""}`}>. <span className="text-gray-500">{blog.upvote}</span></span>
                </button>
                <button onClick={handleDownVote} className="flex items-center gap-1 text-slate-600 px-1 dark:text-slate-400 hover:text-main dark:hover:text-main-light">
                    {
                        downVote ? <span className="text-main"><PiArrowFatDownFill size={18}/></span> : <span><PiArrowFatDown size={18}/></span>
                    }
                    <span>{blog.downvote}</span>
                </button>
                </div>
                <div className="">
                    <button className="flex items-center gap-2 text-slate-600 px-1 dark:text-slate-400 hover:text-main dark:hover:text-main-light">
                        <span><FaRegCommentAlt /></span>
                        <span>{blog.comments}</span>
                    </button>
                </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BlogDetails