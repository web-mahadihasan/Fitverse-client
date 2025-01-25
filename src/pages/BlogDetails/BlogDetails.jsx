import React, { useState } from "react";
import { Helmet } from "react-helmet";
import { FaRegCommentAlt } from "react-icons/fa";
import { PiArrowFatDown, PiArrowFatDownFill, PiArrowFatUp, PiArrowFatUpFill } from "react-icons/pi";

const BlogDetails = ({  }) => {
    const [upVote, setUpVote] = useState(false);
    const [downVote, setDownVote] = useState(false);
    // Example Usage
    const blog = {
    coverImage: "https://i.ibb.co.com/GpGVT7j/gym-workout-66d087d56ef90.jpg",
    title: "5 Essential Fitness Tips for Beginners",
    description:
      "Starting your fitness journey can be challenging, but with the right mindset and approach, anyone can succeed. In this blog, we will discuss how setting realistic and achievable goals, staying consistent, and choosing the right workouts will set you on the right path to success.",
    postedDate: "Nov 28, 2024",
    name: "John Doe",
    image: "https://randomuser.me/api/portraits/men/1.jpg",
    role: "Trainer",
    upvote: 45,
    downvote: 3,
    comments: 10,
  };
  const handleUpVote = () => {
    setUpVote(!upVote)
    setDownVote(false)
    }
    const handleDownVote = () => {
        setDownVote(!downVote)
        setUpVote(false)
    }
  return (
    <div className="max-w-7xl mx-auto px-4 xl:px-0  my-24">
      <Helmet>
          <title>Fitverse | Blog Details </title>
          <meta name="Mahadi hasan" content="https://fitverse-bd.web.app/" />
      </Helmet>
      <div className="max-w-3xl w-full bg-white mx-auto shadow-lg rounded-2xl overflow-hidden">
        <img
          src={blog.coverImage}
          alt={blog.title}
          className="w-full h-80 object-cover"
        />
        <div className="p-6">
          <h1 className="text-2xl font-bold text-gray-800">{blog.title}</h1>
          <p className="text-gray-600 mt-4">{blog.description}</p>

          <div className="mt-6 flex items-center gap-4">
            <img
              src={blog.image}
              alt={blog.name}
              className="w-14 h-14 rounded-full object-cover"
            />
            <div>
              <h2 className="text-lg font-semibold text-gray-800">{blog.name}</h2>
              <p className="text-sm text-gray-500">{blog.role}</p>
            </div>
          </div>

          <div className="mt-6 flex justify-between items-center text-gray-600 text-sm">
            <p className="font-medium">Posted on: {blog.postedDate}</p>
            <div className="flex items-center gap-6 md:gap-4">
                <div className="flex items-center gap-4 border p-[2px] px-3 rounded-full divide-x border-gray-200 dark:bg-[#393939] backdrop-blur-lg dark:text-slate-200 dark:border-slate-500">
                <button onClick={handleUpVote} className="flex items-center gap-1 text-slate-600 dark:text-slate-400 hover:text-main dark:hover:text-main-light">
                    {
                        upVote ?  <span className="text-main"><PiArrowFatUpFill size={18}/></span> : <PiArrowFatUp size={18} />
                    }
                    
                    {/**/}
                    <span className={`inline-block mt-1 text-base ${upVote? "text-main" : ""}`}>. <span className="text-gray-500">{blog.upvote}</span></span>
                </button>
                <button onClick={handleDownVote} className="flex items-center gap-1 text-slate-600 px-1 dark:text-slate-400 hover:text-main dark:hover:text-main-light">
                    {
                        downVote ? <span className="text-main"><PiArrowFatDownFill size={18}/></span> : <span><PiArrowFatDown size={18}/></span>
                    }
                    {/*  */}
                    {/* <Icon icon="bxs:downvote" width="24" height="24" /> */}
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