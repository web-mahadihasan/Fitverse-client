import { Meteors } from "@/components/ui/meteors";
import BannerCarousel from "./Carousel/BannerCarousel";
import { Component,  Zap } from 'lucide-react'
import { Icon } from "@iconify/react/dist/iconify.js";
import {motion} from "framer-motion"
import { Button } from "@/components/ui/button";
import { Link } from "react-router";
import { ShinyButton } from "@/components/ui/shiny-button";

const Banner = () => {
 
  return (
    <div className="max-w-[1440px] mx-auto px-4 xl:px-0 ">
        <div className="relative flex items-center justify-center min-h-[700px] w-full flex-col overflow-hidden rounded-lg bg-background z-40">
            <Meteors number={30} />
              <svg
                aria-hidden="true"
                className="z-20 pointer-events-none h-full w-full fill-neutral-400/80 [mask-image:radial-gradient(800px_circle_at_center,white,transparent)] absolute inset-0 opacity-50 bg-[#1d4ed8]/20"
            >
                <defs>
                <pattern
                    id=":r0:"
                    width="16"
                    height="16"
                    patternUnits="userSpaceOnUse"
                    patternContentUnits="userSpaceOnUse"
                    x="0"
                    y="0"
                >
                    <circle id="pattern-circle" cx="1" cy="1" r="1"></circle>
                </pattern>
                </defs>
                <rect
                width="100%"
                height="100%"
                strokeWidth="0"
                fill="url(#:r0:)"
                ></rect>
            </svg>
            {/* content  */}
            <div className="flex items-center justify-between flex-col lg:flex-row gap-6 h-full">
                <div className="flex-1 text-left">
                   <div className="pl-6 space-y-5 py-8">
                        <motion.div className="flex font-medium font-poppins w-fit items-center gap-2 rounded-full bg-gray-100 px-4 py-1 text-sm text-main"
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }} 
                            transition={{ duration: 0.8, ease: "easeInOut" }}
                        >
                            <Zap className="text-main h-4 w-4 " />
                            Your Journey to Fitness Starts Here!
                        </motion.div>
                        <motion.h1 className="text-3xl text-secondary-black dark:text-main-dark lg:text-5xl font-kanit leading-relaxed font-bold capitalize"
                            initial={{ opacity: 0, y: 30 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.1, duration: 0.8, ease: "linear" }}
                        >Achive your <span className="font-gagalin tracking-wide font-medium text-main inline-block mb-3">fitness goal</span> <br /> with FitVerse</motion.h1>
                        <motion.p className="text-gray-700 dark:text-gray-400"
                            initial={{ opacity: 0, y: 30 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.2, duration: 0.8, ease: "easeIn" }}
                        >
                            FitVerse isn’t just about fitness—it’s about transforming your lifestyle and becoming the best version of yourself. Take the first step today and let FitVerse guide you toward a healthier, stronger, and happier you!
                        </motion.p>
                        <motion.div className="flex flex-wrap gap-5 pt-6"
                            initial={{ opacity: 0, y: 30 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.3, duration: 0.8, ease: "easeIn"  }}
                        >   
                            <Link to={"/all-classes"}>
                            <button className="flex group items-center gap-1 bg-gradient-to-r from-[#5A29E4] to-[#9F72F9] hover:bg-transparent px-6 py-2 rounded-md border border-main-light relative overflow-hidden before:absolute before:inset-0 before:translate-x-full hover:before:translate-x-0 before:transition-transform before:duration-300 before:bg-gradient-to-r before:from-indigo-500 before:via-purple-500 before:to-pink-500  before:z-[-1] text-white z-10" >
                                Book A Slot
                                <Icon icon="lineicons:arrow-right" width="22" height="22" className="px -rotate-45 group-hover:rotate-0 duration-300" />
                            </button>
                            </Link>
                            <Link to={"/all-trainers"}>
                                <ShinyButton className={"px-0 py-0 border-none"}>
                                <Button size="lg" className="gap-2 py-2.5 font-poppins text-secondary-black tracking-wide" variant="outline">
                                    Explorer Trainer <Component className="w-4 h-4" />
                                </Button>
                                </ShinyButton>
                            </Link>
                        </motion.div>
                   </div>
                   

                </div>
                
                <div className="relative w-full h-full overflow-hidden z-20 flex-1">
                <div className="w-full max-h-[400px] lg:min-h-[700px] bg-transparent clipped">
                        <BannerCarousel/>
                </div>
        </div>
            </div>
            {/* content  */}
        </div>
      
    </div>
  );
};

export default Banner;


// flex items-center justify-center 
{/* <div className="relative w-full h-full overflow-hidden z-20">
            <div className="w-full h-full bg-gray-200" >
                <img
                src="https://zele.bold-themes.com/slant/wp-content/uploads/sites/3/2021/06/image_03_team.png" // Replace with your image path
                alt="Clipped Shape"
                className="w-full h-full object-cover"
                style={{
                    clipPath: "polygon(36% 0, 100% 0%, 100% 98%, 0% 100%)",
                }}
                />
            </div>
        </div> */}