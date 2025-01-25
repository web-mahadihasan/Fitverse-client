import SectionBadge from "../../components/common/SectionBadge";
import SectionHeading from "../../components/common/SectionHeading";
import about1 from "../../assets/images/about1.png"
import about2 from "../../assets/images/about2.png"
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import Testimonial from "../Home/Testimonial/Testimonial";
import useAxiosPublic from "../../hooks/useAxiosPublic";
import { Helmet } from "react-helmet";
import PageCover from "../../components/common/PageCover";

const AboutUs = () => {
    const axiosPublic = useAxiosPublic()
    const {data: AboutTestimonial} = useQuery({
        queryKey: ["AboutTestimonial"],
        queryFn: async () => {
            const {data} = await axiosPublic.get("/review-api/all-review")
            return data
        }
    })
    const about = [
        { title: "No long-term contract", des: "Our popular month to month plan is offered as pay as you work-out with no long term contract"},
        { title: "Best equipment", des: "Practice on the best equipment global brands that addresses a wide range of people"},
        { title: "Every detail matters", des: "We want you to feel supported – by dedicated team members who really care about you"}
    ]
    const award =  [
        {
          "title": "YMCA Award Received",
          "description": "We received the YMCA award for our work in advancing fitness and sport in the Chicago area. It was our first major achievement."
        },
        {
          "title": "National Fitness Excellence Award",
          "description": "We were honored with the National Fitness Excellence Award for promoting innovative programs and healthy lifestyles in communities."
        },
        {
          "title": "Chicago Sports Leadership Award",
          "description": "We received the Chicago Sports Leadership Award for fostering teamwork and inspiring the next generation of athletes."
        }
      ]
    
    
    return (
        <div className="mt-2 mb-24">
            <Helmet>
                <title>Fitverse | About us </title>
                <meta name="Mahadi hasan" content="https://fitverse-bd.web.app/" />
            </Helmet>
            <PageCover title={"About us"} page={"about-us"}/>
            <div className="max-width mx-auto px-4 xl:px-0">
            <div className="my-6">
                <SectionBadge title={"About us"}/>
                <SectionHeading
                title={"Our Fitness Journey"}
                subtitle={"From passion to progress, we’re here to support you in every step of your fitness journey. Together, we build strength and confidence."}
                />
            </div>

            <section className="mt-10 h-full grid  grid-cols-1 lg:grid-cols-2 gap-8">
                <div className="flex flex-col justify-between">
                    <img src={about1} alt="" className="h-[300px] w-full flex-1 rounded"/>
                    <div>
                        <h6 className="font-kani max-w-md mx-auto text-xl font-medium text-secondary-black dark:text-main-dark text-center my-6">The owners, trainers, staff and this place make me feel like I am part of the family. It is great experience to be and train here every day</h6>
                        <div className="flex items-center gap-2 justify-center">
                            <p className="w-20 h-[2px] bg-main"></p>
                            <p className="font-kanit tracking-wider text-sm font-medium">AMY FLYNN</p>
                        </div>
                    </div>

                </div>
                <div>
                    <p className="font-poppins text-gray-700 dark:text-gray-400 text-lg">Our Mission</p>
                    <p className="w-14 h-1 bg-main rounded-full my-1"></p>
                    <h3 className="text-xl md:text-[28px] font-semibold font-kanit my-6 text-secondary-black dark:text-main-dark">We started with a simple vision: to create the premier fitness community</h3>
                    <p className="my-6 font-poppins font-normal text-base text-gray-700 dark:text-gray-300">We want to share our passion for fitness and create a community based on the pursuit of fitness. Our mission is to keep people active. We are committed to providing excellent customer service, open communication and never losing focus on helping individuals achieve balance and success inside and outside of the gym.</p>
                    <img src={about2} alt="" className="max-h-[330px] w-full object-cover rounded-md my-6"/>
                </div>
            </section>

            <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 my-10">
                {
                    about.map((item, idx) =>(
                        <div key={idx} className="p-6 border blog-shadow bg-gray-100/70 rounded-md">
                            <div className="flex items-center gap-2">
                                <p className="w-14 h-[2px] rounded-md bg-main"></p>
                                <p className="font-kanit text-xl font-medium text-gray-800">{item.title}</p>
                            </div>
                            <p className="font-poppins text-gray-600 my-4">{item.des}</p>
                        </div>
                    ))
                }
            </section>

            {/* Award section  */}
            <section className="my-24">
                <SectionBadge title={"Our Award"}/>
                <h3 className="text-center mb-10 mt-4 text-3xl font-kanit font-bold text-secondary-black dark:text-main-dark">Our Recent Awards</h3>
                <div className="hidden md:block">
                    <div className="flex items-center justify-around my-2">
                        <span className="p-3 bg-main-light px-6 text-white font-poppins">NOV, 2022</span>
                        <span className="p-3 bg-gray-100 px-6 text-black font-poppins">JUN, 2018</span>
                        <span className="p-3 bg-main-light px-6 text-white font-poppins">AUG, 2024</span>
                    </div>
                    <div className="flex items-center justify-around mb-2">
                        <p className="h-16 w-0.5 bg-gray-700 dark:bg-gray-500"></p>
                        <p className="h-16 w-0.5 bg-gray-700 dark:bg-gray-500"></p>
                        <p className="h-16 w-0.5 bg-gray-700 dark:bg-gray-500"></p>
                    </div>
                </div>
                <div className="relative w-full items-center hidden md:flex">
                    {/* <!-- Horizontal Line --> */}
                    <div className="absolute top-1/2 w-full h-0.5 bg-gray-600"></div>

                    {/* <!-- Bullet 1 --> */}
                    <div className="flex-1 flex justify-center relative">
                    <div className="w-4 h-4 bg-main rounded-full"></div>
                    </div>
                    {/* <!-- Bullet 2 --> */}
                    <div className="flex-1 flex justify-center relative">
                    <div className="w-4 h-4 bg-main rounded-full"></div>
                    </div>
                    {/* <!-- Bullet 3 --> */}
                    <div className="flex-1 flex justify-center relative">
                    <div className="w-4 h-4 bg-main rounded-full"></div>
                    </div>
                </div>
                {/* content  */}
                <div className="flex justify-center gap-6 flex-col md:flex-row">
                    {
                        award.map((item, idx) => (
                            <div key={idx} className="text-center flex-1 my-4">
                                <p className="font-kanit text-xl font-medium text-gray-800 dark:text-gray-400">{item.title}</p>
                                <p className="font-poppins text-gray-600 my-4 px-4">{item.description}</p>
                            </div>
                        ))
                    }
                </div>
            </section>

            {/* REview  */}
            <section className="my-24">
                <div className="my-10">
                <SectionBadge title={"User Review"}/>
                <SectionHeading
                title={"Some User Feedback here"}
                subtitle={"This keeps it short and engaging while inviting users to explore the feedback. Let me know if you need alternate phrasing!"}
                />
                </div>

                <div>
                    {
                     AboutTestimonial &&  <Testimonial testimonial={AboutTestimonial}/>
                    }
                </div>
            </section>

            </div>
        </div>
    );
};

export default AboutUs;