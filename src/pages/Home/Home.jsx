import { useEffect, useState } from "react";
import Banner from "../../components/common/Banner/Banner";
import ClassCard from "../../components/common/ClassCard";
import { useQuery } from "@tanstack/react-query";
import useGetClass from "../../hooks/useGetClass";
import FeaturedSection from "./FeaturedCard";
import { Icon } from "@iconify/react/dist/iconify.js";
import { Link } from "react-router";
import AboutSection from "./AboutSection";
import { HeroPill, StarIcon } from "@/components/ui/hero-pill"
import SectionBadge from "../../components/common/SectionBadge";
import Testimonial from "./Testimonial/Testimonial";
import axios from "axios";
import SectionHeading from "../../components/common/SectionHeading";
import TeamSection from "./TeamSection/TeamSection";
import BlogCard from "../../components/common/BlogCard";
import NewsLetterSection from "./NewLetterSection/NewsLetterSection";



const Home = () => {
    const [allClass] = useGetClass()
    const {data: testimonial} = useQuery({
        queryKey: ["testimonial"],
        queryFn: async () => {
            const {data} = await axios.get("/testReview.json")
            return data
        }
    })
    const ourTeam = [
        {
          "name": "James Wilson",
          "title": "Lead Fitness Trainer",
          "image": "https://i.ibb.co.com/N708JzN/team2.png"
        },
        {
          "name": "Emily Johnson",
          "title": "Yoga & Wellness Coach",
          "image": "https://i.ibb.co/z89FhWy/team3.png"
        },
        {
          "name": "Sarah Thompson",
          "title": "Strength Training Specialist",
          "image": "https://i.ibb.co/sm4VGSD/team4.png"
        },
        {
          "name": "Michael Brown",
          "title": "Cardio Instructor",
          "image": "https://i.ibb.co/Z2kzFs1/team5.png"
        }
      ]
      
    return (
        <div className="min-h-screen font-poppins max-width mx-auto">
            <div>
                <Banner/>
            </div>
            <div className="max-width mx-auto px-4 xl:px-0 my-14">
                <SectionBadge title={"Our Fitness Featured"}/>
                <FeaturedSection />
            </div>

            {/* Top clasess  */}
            <section className="max-width mx-auto px-4 xl:px-0 my-24">
               <SectionBadge title={"Featured Class"}/>
               <SectionHeading title={"Workout with Featured Classes"}
                    subtitle={"From flexible workout options to premium amenities, explore the unique offerings that make our fitness center stand out. Join us and experience fitness at its finest."}
                />
                {/* <div className="h-1.5 rounded-full w-24  mb-10 bg-gradient-to-r from-[#5A29E4] to-[#9F72F9]"></div> */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 gap-6 my-10">
                    {
                        allClass?.slice(0, 6).map((classInfo) => <ClassCard key={classInfo._id} classInfo={classInfo}/>)
                    }
                </div>
                <Link to={"/all-classes"}>
                    <button className="text-center mx-auto flex group items-center gap-1 bg-gradient-to-r from-[#5A29E4] to-[#9F72F9] hover:bg-transparent px-6 py-2 rounded-md border border-main-light relative overflow-hidden before:absolute before:inset-0 before:translate-x-full hover:before:translate-x-0 before:transition-transform before:duration-300 before:bg-gradient-to-r before:from-indigo-500 before:via-purple-500 before:to-pink-500  before:z-[-1] text-white z-10" >
                         View All Class
                         <Icon icon="lineicons:arrow-right" width="24" height="24" className="px -rotate-45 group-hover:rotate-0 duration-300" />
                     </button>
                </Link>
            </section>

            {/* About us section  */}
            <section className="max-width mx-auto px-4 xl:px-0 my-24">
            <div className="text-center w-full mx-auto">
                <HeroPill className={"border w-fit rounded-full text-center mx-auto"}
                    icon={
                    <svg 
                        xmlns="http://www.w3.org/2000/svg" 
                        width="12" 
                        height="12" 
                        viewBox="0 0 24 24" 
                        className="fill-zinc-500"
                    >
                        <path d="M12 2L1 21h22L12 2z" />
                    </svg>
                    }
                    text="About us"
                />
            </div>
                {/* <div>
                    <h2 className="text-4xl font-bold  font-kanit capitalize text-secondary-black text-left mb-7 tracking-wide dark:text-main-dark">Explore Our Fitness Features</h2>
                    <p className="max-w-xl text-left text-gray-600 font-poppins mb-3">
                        From flexible workout options to premium amenities, explore the unique offerings that make our fitness center stand out. Join us and experience fitness at its finest.
                    </p>
                </div> */}
                <div>
                    <AboutSection/>
                </div>
            </section>

            {/* Testimonial section  */}
            <section className="max-width mx-auto px-4 xl:px-0 my-24">
                <SectionBadge title={"Testimonial"}/>
                <SectionHeading title={"Trusted by Fitness Enthusiasts"}
                    subtitle={"Every review tells a story of determination and achievement. Check out what our valued members have to say about their fitness journeys, memories with us."}
                />

                <div className=" mt-10">
                   {
                    testimonial &&  <Testimonial testimonial={testimonial}/>
                   }
                </div>
            </section>

            {/* Team section  */}
            <section className="my-24 px-4 xl:px-0">
                <SectionBadge title={"Our Team"}/>
                <SectionHeading title={"Our Dedicated Fitness Team"}
                    subtitle={"Behind every great workout is an amazing team. Get to know the skilled professionals who bring energy, expertise, and encouragement to your fitness experience."}
                />
                <div className="grid grid-cols-1 gap-6 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 my-10">
                    {
                        ourTeam.map((team, idx) => <TeamSection key={idx} team={team}/>)
                    }
                    
                </div>

            </section>

            {/* Recent Blog section  */}
            <section className="mx-auto my-24 px-4 xl:px-0">
                <SectionBadge title={"Recent Blogs"}/>
                <SectionHeading title={"Our Dedicated Fitness Team"}
                    subtitle={"Behind every great workout is an amazing team. Get to know the skilled professionals who bring energy, expertise, and encouragement to your fitness experience."}
                />

                {/* Blog card  */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 gap-8 my-10">
                    <BlogCard/>
                    <BlogCard/>
                    <BlogCard/>
                </div>
                <Link to={"/all-classes"}>
                    <button className="text-center mx-auto flex group items-center gap-1 bg-gradient-to-r from-[#5A29E4] to-[#9F72F9] hover:bg-transparent px-6 py-2 rounded-md border border-main-light relative overflow-hidden before:absolute before:inset-0 before:translate-x-full hover:before:translate-x-0 before:transition-transform before:duration-300 before:bg-gradient-to-r before:from-indigo-500 before:via-purple-500 before:to-pink-500  before:z-[-1] text-white z-10" >
                         View All Blogs
                         <Icon icon="lineicons:arrow-right" width="24" height="24" className="px -rotate-45 group-hover:rotate-0 duration-300" />
                     </button>
                </Link>
            </section>

            {/* News Letter section  */}
            <section className="mx-auto px-4 xl:px-0 my-24">
                <NewsLetterSection/>
            </section>
        </div>
    );
};

export default Home;