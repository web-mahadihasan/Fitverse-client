import { cn } from "@/lib/utils";
import { AnimatePresence, motion } from "framer-motion";
// import Link from "next/link";
import { useState } from "react";
import { BsThreeDotsVertical } from "react-icons/bs";
import { RiTeamFill } from "react-icons/ri";
import { Link } from "react-router";
// import { BorderBeam } from "@/components/ui/border-beam";

export const HoverEffect = ({
  items,
  className
}) => {
  let [hoveredIndex, setHoveredIndex] = useState(null);

  return (
    (<div
      className={cn("grid grid-cols-1 md:grid-cols-2  lg:grid-cols-4 gap-3  py-10", className)}>
      {items?.map((item, idx) => (
        <div
          // to={item?.link}
          key={item?.link}
          className="relative group  block p-2 h-full w-full "
          onMouseEnter={() => setHoveredIndex(idx)}
          onMouseLeave={() => setHoveredIndex(null)}>
          <AnimatePresence>
            {hoveredIndex === idx && (
              <motion.span
                className="absolute inset-0 h-full w-full bg-neutral-200 dark:bg-slate-800/[0.8] block  rounded-3xl hover:border-gray-200"
                layoutId="hoverBackground"
                initial={{ opacity: 0 }}
                animate={{
                  opacity: 1,
                  transition: { duration: 0.15 },
                }}
                exit={{
                  opacity: 0,
                  transition: { duration: 0.15, delay: 0.2 },
                }} />
            )}
          </AnimatePresence>
          <Card className={'bg-white flex flex-col dark:bg-gray-800 dark:hover:bg-gray-700 text-black p-0 hover:bg-gray-100 dark:border-gray-700 border-gray-200'}>
              <div className="w-full flex items-center justify-between mb-4">
                <div className="flex items-center gap-2">
                  <RiTeamFill className="text-[2rem] p-2 rounded-full 
                  bg-[#3b9df828] text-[#3B9DF8] cursor-pointer" />
                  <div>
                    <h3 className="font-poppins text-lg">Mehedi Hasan</h3>
                    <p className="text-gray-500 font-poppins text-base">Trainer</p>
                  </div>
                </div>
                <BsThreeDotsVertical className="text-[2rem] p-2 
                rounded-full bg-[#3b9df828] text-[#3B9DF8] cursor-pointer" />
              </div>

              <div className="flex-1 flex flex-col justify-between">
                <div>
                <img
                  src={item?.image}
                  alt=""
                  className="h-[180px] w-full test-shadow object-fit rounded-full"
                />
                </div>

                <div className="h-full flex flex-col justify-between flex-1">
                <h2 className="font-[600] text-[1.3rem] py-4">Simple Design</h2>
                <p className="flex-1">{item.description}</p>
                <div className="w-full mt-auto ">
                    <button className="font-poppins w-fit mx-auto px-6 bg-gradient-to-r from-[#5A29E4] to-[#9F72F9] hover:bg-transparent py-2 rounded-md border border-main-light relative overflow-hidden before:absolute before:inset-0 before:translate-x-full hover:before:translate-x-0 before:transition-transform before:duration-300 before:bg-gradient-to-r before:from-indigo-500 before:via-purple-500 before:to-pink-500  before:z-[-1] text-white z-10" >
                        View More
                    </button>
                </div>
                </div>
              </div>
              
          </Card>
        </div>
      ))}
    </div>)
  );
};

export const Card = ({
  className,
  children
}) => {
  return (
    (<div
      className={cn(
        "rounded-2xl h-full flex flex-col w-full p-4 bg-black border border-gray-100 shadow dark:border-white/[0.2] group-hover:border-slate-400 relative z-20",
        className
      )}>
      <div className="relative z-40">
        <div className="p-4">{children}</div>
      </div>
    </div>)
  );
};
export const CardTitle = ({
  className,
  children
}) => {
  return (
    (<h4 className={cn("text-zinc-100 font-bold tracking-wide mt-4", className)}>
      {children}
    </h4>)
  );
};
export const CardDescription = ({
  className,
  children
}) => {
  return (
    (<p
      className={cn("mt-4 text-zinc-400 tracking-wide leading-relaxed text-sm", className)}>
      {children}
    </p>)
  );
};


{/* <Card className={'bg-white flex flex-col dark:bg-gray-800 dark:hover:bg-gray-700 text-black p-0 hover:bg-gray-100 dark:border-gray-700 border-gray-200'}>
            <figure className="rounded-lg">
              <img src="https://i.ibb.co.com/zSBdj98/Warriorr-Workout.png" alt="" className="h-[150px] w-[150px] mx-auto rounded-full object-cover trainer-shadow"/>
            </figure>
            <div className="flex flex-col justify-between flex-1 h-full w-full">
              <CardTitle className={'text-black'}>{item.title}</CardTitle>
              <div className="flex-1">
                <CardDescription className={'text-gray-400 flex-1'}>{item.description}</CardDescription>
              </div>
              <div className="">
                <Link to={"/trainer-details"}>
                  <button className="bg-gradient-to-r from-[#5A29E4] to-[#9F72F9] hover:bg-transparent px-6 py-2 rounded-md border border-main-light relative overflow-hidden before:absolute before:inset-0 before:translate-x-full hover:before:translate-x-0 before:transition-transform before:duration-300 before:bg-gradient-to-r before:from-indigo-500 before:via-purple-500 before:to-pink-500  before:z-[-1] text-white z-10" >
                    Know More
                  </button>
                </Link>
              </div>
            </div>
          </Card> */}