import { Divider } from "antd";
import { GoArrowRight } from "react-icons/go";
import {BsInstagram, BsLinkedin, BsTwitter} from "react-icons/bs";
import {CgFacebook} from "react-icons/cg"
import { FaLinkedinIn } from "react-icons/fa";
import React, {useRef, useState} from "react";

const TrainerDetails = () => {
    const skillsOption = [
        { label: "Bootcamp", value: "Bootcamp" },
        { label: "Pilates", value: "Pilates" },
        { label: "Yoga", value: "Yoga" },
        { label: "Indoor cycling", value: "Indoor cycling" },
        { label: "Bounce & Burn", value: "Bounce & Burn" },
        { label: "Body Blast", value: "Body Blast" },
        { label: "Pump & Sculpt", value: "Pump & Sculpt" },
      ];
      const [isHovering, setIsHovering] = useState(false);
      const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
      const cardRef = useRef(null);
  
      // handle mouse move
      const handleMouseMove = (e) => {
          if (cardRef.current) {
              const rect = cardRef.current.getBoundingClientRect();
              setMousePosition({
                  x: e.clientX - rect.left,
                  y: e.clientY - rect.top,
              });
          }
      };
    return (
        <div className="max-w-7xl mx-auto px-4 xl:px-0 my-10">
            
            <section>
            <Divider orientation="left" style={{
                borderColor: '#d1d5db',
            }}>
                <div className="flex mt-8 items-center gap-4 mb-10">
                    <h3 className="text-3xl uppercase font-kanit font-semibold">Amitee Loiselle</h3>
                    <p className="text-lg font-normal font-poppins">Fitness Coach</p>
                </div>
                </Divider>

                {/* Details  */}
                <div className="grid grid-cols-3 gap-8">
                    {/* Left side  */}
                    <div>
                        <img src="https://i.ibb.co.com/Y2n6tqL/Cardio-Crush.png" alt="" className="trainer-shadow h-[430px] rounded-lg" />
                    </div>

                    {/* Right side  */}
                    <div onMouseMove={handleMouseMove}
                        onMouseEnter={() => setIsHovering(true)}
                        onMouseLeave={() => setIsHovering(false)}
                        ref={cardRef}
                        className="col-span-2 w-full relative overflow-hidden  rounded-lg px-4 cursor-pointer">

                        <div className="">
                        <p className="bg-main mt-4 py-[2px] px-6 w-fit text-white font-poppins text-sm rounded-sm"style={{clipPath: 'polygon(0 1%, 100% 1%, 89% 100%, 0% 100%)'}}>About Me</p>
                        <p className="text-base  leading-7 font-poppins text-gray-600 dark:text-gray-200 my-8">Going to the gym started off as a hobby. Later it became something that I was truly passionate about. As I continued to work on my strength I came to the realization that perhaps I could not only better myself, but others as well. As I continue my journey, I hope to spread my knowledge.</p>
                        {/* Skills class  */}
                        <div>
                            <h5 className=" flex items-center gap-2 text-gray-700 font-kanit text-lg"><span>Skills</span> <GoArrowRight size={22} className="align-middle"/></h5>
                            <div className="flex flex-wrap gap-2 items-center">
                                {
                                    skillsOption.slice(0, 5).map(skill =>  <p key={skill.label} className="px-3 py-[2px] bg-main-light w-fit shadow rounded-sm text-white font-poppins">{skill.label}</p>)
                                }
                            </div>
                        </div>
                        {/* Available Days  */}
                        <div className="mt-6">
                            <h5 className=" flex items-center gap-2 text-gray-700 font-kanit text-lg"><span>Available Days</span> <GoArrowRight size={22} className="align-middle"/></h5>
                            <div className="flex flex-wrap gap-2 items-center">
                                {
                                    skillsOption.slice(0,4).map(skill =>  <p key={skill.label} className="px-3 py-[2px] bg-main-light w-fit shadow rounded-sm text-white font-poppins">{skill.label}</p>)
                                }
                            </div>
                        </div>
                        <div className="mt-4">
                            <h5 className=" flex items-center gap-2 text-gray-700 font-kanit text-2xl"><span>Follow him</span></h5>
                            <div className="flex gap-[7px] text-black">
                                <a className="text-[1.3rem] p-1.5 group cursor-pointer hover:text-white transition-all rounded-full hover:bg-main border border-main duration-300">
                                    <CgFacebook className="text-main group-hover:text-white"/>
                                </a>
                                <a className="text-[1.2rem] group p-1.5 cursor-pointer hover:text-white transition-all hover:bg-main border border-main duration-300 rounded-full">
                                    <BsTwitter className="text-main group-hover:text-white"/>
                                </a>
                                <a className="group text-[1.2rem] p-1.5 cursor-pointer hover:text-white transition-all hover:bg-main border border-main duration-300 rounded-full">
                                    <BsInstagram className="text-main group-hover:text-white"/>
                                </a>
                                <a className="text-[1.2rem] p-1.5 cursor-pointer group hover:text-white transition-all hover:bg-main border border-main duration-300 rounded-full">
                                    <FaLinkedinIn className="text-main group-hover:text-white"/>
                                </a>
                            </div>
                        </div>
                    </div>
                        {/*  hovered color shadow  */}
                        {isHovering && (
                            <div
                                className="absolute inset-0 pointer-events-none blur-[50px]"
                                style={{
                                    background: `radial-gradient(circle 50px at ${mousePosition.x}px ${mousePosition.y}px, #DB06F9, transparent)`,
                                }}
                            />
                        )}

                    </div>

                </div>
            </section>
        </div>
    );
};

export default TrainerDetails;