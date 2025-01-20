import { Divider } from "antd";
import { GoArrowRight } from "react-icons/go";
import {BsInstagram, BsLinkedin, BsSend, BsTwitter} from "react-icons/bs";
import {CgFacebook} from "react-icons/cg"
import { FaLinkedinIn } from "react-icons/fa";
import React, {useRef, useState} from "react";
import bg from "../../assets/images/ctabg.png"
import FlickeringGrid from "@/components/ui/flickering-grid";
import { Tiles } from "@/components/ui/tiles"
import CTa from "./CallToAction";
import CallToAction from "./CallToAction";
import { Link, useParams } from "react-router";
import { useQuery } from "@tanstack/react-query";
import useAxiosPublic from "../../hooks/useAxiosPublic";
import { User, Zap } from "lucide-react";
import { IoLocationOutline } from "react-icons/io5";
import useAuth from "../../hooks/useAuth";

const TrainerDetails = () => {
    const {id} = useParams()
    const {user} = useAuth()
    const axiosPublic = useAxiosPublic()
    const {data: trainerData} = useQuery({
        queryKey: ["trainerDetails"],
        queryFn: async () => {
            const {data} = await axiosPublic.get(`/trainer-api/trainers/byId/${id}`)
            return data
        }
    })

    const {data: trainerSlotData} = useQuery({
        queryKey: [trainerData?.email, "trainerSlotData"],
        queryFn: async () => {
            const {data} = await axiosPublic.get(`/slot-api/slots/${trainerData?.email}`)
            return data
        },
        enabled: !!trainerData?.email
    })
    console.log(trainerSlotData)
    const {name, image, experience, role, skills, date, biography, availableDays, availableSlot, age} = trainerData || {}
    const lines = biography?.split("\n").filter((line) => line.trim() !== "");
    const firstBiography = lines?.slice(0, 4).join("\n"); 
    const secondBiography = lines?.slice(4).join("\n"); 

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
                    <h3 className="text-3xl uppercase font-kanit font-semibold text-main dark:text-main-light">{name}</h3>
                    <p className="text-lg font-normal font-poppins text-gray-600 dark:text-gray-400">{role}</p>
                </div>
                </Divider>

                {/* Details  */}
                <div className="grid grid-cols-3 gap-6">
                    {/* Left side  */}
                    <div>
                        <img src={image} alt="" className="trainer-shadow h-[450px] rounded-lg" />
                    </div>

                    {/* Right side  */}
                    <div onMouseMove={handleMouseMove}
                        onMouseEnter={() => setIsHovering(true)}
                        onMouseLeave={() => setIsHovering(false)}
                        ref={cardRef}
                        className="col-span-2 w-full relative overflow-hidden  rounded-lg px-4 cursor-pointer">

                        <div className="">
                        <p className="bg-gradient-to-r from-[#5A29E4] to-[#9F72F9] mt-4 py-[2px] px-6 w-fit text-white font-poppins text-sm rounded-sm"style={{clipPath: 'polygon(0 1%, 100% 1%, 89% 100%, 0% 100%)'}}>About Me</p>
                        <p className="line-clamp-4 text-base  leading-7 font-poppins text-gray-600 dark:text-gray-200 my-8">{firstBiography}</p>
                        {/* Skills class  */}
                        <div>
                            <h5 className=" flex items-center gap-2 text-gray-700 font-kanit text-lg dark:text-gray-300"><span>Skills</span> <GoArrowRight size={22} className="align-middle"/></h5>
                            <div className="flex flex-wrap gap-2 items-center">
                                {
                                    skills?.map(skill =>  <p key={skill} className="px-3 py-[2px] bg-main-light w-fit shadow rounded-sm text-white font-poppins">{skill}</p>)
                                }
                            </div>
                        </div>
                        {/* Available Days  */}
                        <div className="mt-6">
                            <h5 className=" flex items-center gap-2 text-gray-700 font-kanit text-lg dark:text-gray-300"><span>Available Days</span> <GoArrowRight size={22} className="align-middle"/></h5>
                            <div className="flex flex-wrap gap-2 items-center">
                                {
                                    availableDays?.map(day =>  <p key={day} className="px-3 py-[2px] bg-main-light w-fit shadow rounded-sm text-white font-poppins">{day}</p>)
                                }
                            </div>
                        </div>
                        <div className="mt-4">
                            <h5 className=" flex items-center gap-2 text-gray-700 font-kanit text-2xl dark:text-gray-300"><span>Follow him</span></h5>
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

                

                {/* Part 2  */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 my-14">
                   
                    {/* Content  */}
                    <div className="space-y-4">
                        <div>
                            <h5 className=" flex items-center gap-2 text-gray-700 font-kanit text-2xl dark:text-gray-300"><span>Joining Date:</span></h5>
                            <p className="font-poppins text-lg text-gray-500 dark:text-gray-500">{date}</p>
                        </div>
                        <div>
                            <h5 className=" flex items-center gap-2 text-gray-700 font-kanit text-2xl dark:text-gray-300"><span>Experience:</span></h5>
                            <p className="font-poppins text-lg text-gray-500 dark:text-gray-500">{experience} years</p>
                        </div>
                        <div>
                            <h5 className=" flex items-center gap-2 text-gray-700 font-kanit text-2xl dark:text-gray-300"><span>Age:</span></h5>
                            <p className="font-poppins text-lg text-gray-500 dark:text-gray-500">{age} years</p>
                        </div>
                        <div>
                            <h5 className=" flex items-center gap-2 text-gray-700 font-kanit text-2xl dark:text-gray-300"><span>Available Slot:</span></h5>
                            <div className="flex items-center flex-wrap gap-4">
                                {
                                    availableSlot?.map(slot => <p key={slot} className="font-poppins text-lg text-gray-600 dark:text-gray-400">{slot}</p>)
                                }
                            </div>
                        </div>
                            {
                                lines?.length > 4 && <div>
                                    <h5 className=" flex items-center gap-2 text-gray-700 font-kanit text-2xl dark:text-gray-300"><span>Biography:</span></h5>
                                    <p className="line-clamp-3 text-base leading-7 font-poppins text-gray-600 dark:text-gray-200 my-2">{secondBiography}</p>
                                </div>
                            }
                        
                        <div>

                        </div>
                    </div>

                    {/* Image  */}
                    <div>
                        <img src="https://quanticalabs.com/wp_themes/gymbase/files/2020/03/image_04.jpg" alt="" className="rounded-lg" />
                    </div>

                </div>

                {/* Slot info  */}
            <div>
                <h3 className="font-kanit text-2xl font-semibold uppercase tracking-wide text-gray-700 text-center my-6 mt-10">All Available Slot here</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {
                    trainerSlotData?.map((data) => (
                        <div key={data._id} className="bg-gradient-to-r from-[#5A29E4]/15 to-[#9F72F9]/10 w-full rounded-xl">
                <div className="flex flex-col p-[15px] gap-4 justify-between h-full">
                    <div className="flex items-center justify-between w-full">
                        <h1 className="text-[1rem] flex items-center gap-2 lg:text-[1.3rem] font-bold text-main">
                            <span><BsSend className="p-[6px] lg:p-[5px] rounded-xl bg-blue-100 text-blue-800 text-[1.5rem] lg:text-[2rem]"/></span>
                            <span>{data?.slotName}</span>
                        </h1>   
                        <div className=" flex font-medium backdrop-blur-2xl font-poppins items-center gap-2 rounded-full bg-gray-100 px-4 py-1 text-sm text-main">
                            <Zap className="text-main h-4 w-4 " />
                            Duration: {data?.classHour} Hours
                        </div>
                    </div>
                    <div className="">
                    <div className="gap-[10px] my-2">
                        <h3 className="font-poppins text-lg text-gray-700 dark:text-gray-200">Classes:</h3>
                        <div className="flex flex-wrap gap-2">
                             {
                                 data?.classtitle.map(slot => <p key={slot} className="font-poppins text-base text-gray-600 mt-1 dark:text-gray-400">{slot},</p>)
                             }
                         </div>
                    </div>
                    <div className="gap-[10px]">
                        <h3 className="font-poppins text-lg text-gray-700 dark:text-gray-200">Days</h3>
                        <div className="flex items-center flex-wrap gap-4">
                             {
                                 data?.availableDays.map(slot => <p key={slot} className="font-poppins text-base text-gray-600 dark:text-gray-400">{slot}</p>)
                             }
                         </div>
                    </div>
                    </div>
                    <Link to={`/slot-details/${data._id}`}>
                        <button className="font-poppins bg-gradient-to-r from-[#5A29E4] to-[#9F72F9] hover:bg-transparent px-6 py-2 rounded-md border border-main-light relative overflow-hidden before:absolute before:inset-0 before:translate-x-full hover:before:translate-x-0 before:transition-transform before:duration-300 before:bg-gradient-to-r before:from-indigo-500 before:via-purple-500 before:to-pink-500  before:z-[-1] text-white z-10" >
                            Booked Slot
                        </button>
                    </Link>
                </div>
                </div>
                    ))
                }
            </div>
            </div>

                {/* Call to action  */}
                <div className="my-24 min-h-[500px] object-cover bg-center bg-no-repeat max-w-7xl mx-auto px-4 xl:px-0">
                    {/* <div className="w-full h-[500px]">
                    <div>
                            <h5 className=" flex items-center gap-2 text-gray-700 font-kanit text-2xl dark:text-gray-300"><span>Experience:</span></h5>
                            <p className="font-poppins text-lg text-gray-500 dark:text-gray-500">3 years</p>
                        </div>
                    <Tiles 
                        rows={50} 
                        cols={8}
                        tileSize="md"
                    />
                    dgdgd */}
                    {/* </div> */}
                <div className="relative h-[500px] rounded-lg w-full bg-background overflow-hidden border">
                    <FlickeringGrid
                        className="z-0 absolute inset-0 size-full w-full"
                        squareSize={4}
                        gridGap={8}
                        color="#6B7280"
                        maxOpacity={0.5}
                        flickerChance={0.1}
                        height={800}
                    />
                    <div className="flex flex-col justify-center items-center h-full w-full">
                            {/* <p className="">Together, We’re Better</p>
                            <h5 className=" flex items-center gap-2 text-gray-700 font-kanit text-4xl text-center dark:text-gray-300"><span>Experience:</span></h5>
                            <p className="font-poppins text-lg text-gray-500 dark:text-gray-500">3 years</p> */}
                            <CallToAction/>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default TrainerDetails;