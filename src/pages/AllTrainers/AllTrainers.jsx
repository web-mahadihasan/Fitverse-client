import { HoverEffect } from "@/components/ui/hover-effect"
import { BsThreeDotsVertical } from "react-icons/bs";
import { RiTeamFill } from "react-icons/ri";

const AllTrainers = () => {
    const projects = [
        {
          title: "Stripe",
          description:
            "A technology company that builds economic infrastructure for the internet.",
          link: "https://stripe.com",
        },
        {
          title: "Netflix",
          description:
            "A streaming service that offers a wide variety of award-winning TV shows, movies, anime, documentaries, and more on thousands of internet-connected devices.",
          link: "https://netflix.com",
        },
        {
          title: "Google",
          description:
            "A multinational technology company that specializes in Internet-related services and products.",
          link: "https://google.com",
        },
        {
          title: "Meta",
          description:
            "A technology company that focuses on building products that advance Facebook's mission of bringing the world closer together.",
          link: "https://meta.com",
        },
        {
          title: "Amazon",
          description:
            "A multinational technology company focusing on e-commerce, cloud computing, digital streaming, and artificial intelligence.",
          link: "https://amazon.com",
        },
        {
          title: "Microsoft",
          description:
            "A multinational technology company that develops, manufactures, licenses, supports, and sells computer software, consumer electronics, personal computers, and related services.",
          link: "https://microsoft.com",
        },
      ]
    return (
        <div>
            <div className="max-w-7xl mx-auto px-4 xl:px-0 ">
                <HoverEffect items={projects} />
                {/* {
                  projects.map(protect => (
                    <div key={protect.link} className="w-full rounded shadow-lg p-4 border">
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
                    
                          <img
                            src="https://i.ibb.co.com/zSBdj98/Warriorr-Workout.png"
                            alt=""
                            className="rounded-lg h-[180px] w-full test-shadow"
                          />
                    
                          <h2 className="font-[600] text-[1.3rem] py-4">Simple Design</h2>
                            <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Praesentium at expedita odio voluptate officia cum!</p>
                          <div className="w-full flex items-center justify-between relative"> */}
                                {/* <button className="text-center w-full font-poppins bg-gradient-to-r from-red-700 to-red-400 hover:bg-transparent px-3 py-2 rounded-md border border-red-400 relative overflow-hidden before:absolute before:inset-0 before:translate-x-full hover:before:translate-x-0 before:transition-transform before:duration-300 before:bg-gradient-to-r before:from-red-500 before:via-red-600 before:to-red-700  before:z-[-1] text-white z-10" >
                                    Removed Trainer
                                </button> */}
                          {/* </div>
                        </div>
                  ))
                } */}
            </div> 
        </div>
    );
};

export default AllTrainers;