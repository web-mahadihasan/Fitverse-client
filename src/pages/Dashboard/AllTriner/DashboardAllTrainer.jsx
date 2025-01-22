import { useQuery } from "@tanstack/react-query";
import useAxiosSecured from "../../../hooks/useAxiosSecured";
import useAxiosPublic from "../../../hooks/useAxiosPublic";
import { RiTeamFill } from "react-icons/ri";
import { BsThreeDotsVertical } from "react-icons/bs";
import { Icon } from "@iconify/react/dist/iconify.js";
import { ShinyButton } from "@/components/ui/shiny-button";
import { ArrowUpRightFromSquareIcon, Trash2 } from "lucide-react";
import SectionBadge from "../../../components/common/SectionBadge";
import SectionHeading from "../../../components/common/SectionHeading";

const DashboardAllTrainer = () => {
    const axiosSecured = useAxiosSecured()
 
    const {data: trainerData} = useQuery({
        queryKey: ["trainerData"],
        queryFn: async () => {
            const {data} = await axiosSecured.get("/trainer-api/trainers")
            return data
        }
    })

   console.log(trainerData)

    return (
        <div className="mx-auto p-4">
            <div className="text-center mt-5 mb-10 space-y-4">
                <SectionBadge title={"Activity Logs"}/>
                
                <h3 className="pb-6 text-4xl text-center font-bold  font-kanit capitalize text-secondary-black  mb-7 tracking-wide dark:text-main-dark">Managed Your all trainers</h3>
            </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mb-24">
            
            {
                trainerData?.map(data => <div key={data._id} className="w-full sm:w-[80%] lg:w-full flex flex-col  justify-center p-6 transition-colors duration-300 transform border cursor-pointer rounded-xl hover:border-transparent group hover:bg-gray-200  dark:border-gray-700 dark:hover:border-transparent">         
                    <img className="mx-auto object-cover w-32 h-32 rounded-full ring-4 ring-gray-300" src={data?.image} alt=""/>
                    <div className="flex items-center justify-between mt-3">
                       <p className="flex items-center gap-1">
                         <span className="text-main"><Icon icon="material-symbols-light:work-history-outline-rounded" width="20" height="20" /></span>
                         <span className="font-poppins text-sm text-gray-700 dark:text-gray-400">Experience: 32 Yr</span>
                       </p>
                       <p className="flex items-center gap-1">
                         <span className="text-main"><Icon icon="material-symbols:data-usage" width="20" height="20" /></span>
                         <span className="font-poppins text-sm text-gray-700 dark:text-gray-400">Age: 32 Yr</span>
                       </p>
                     </div>
                    <h1 className="mt-3 text-2xl font-semibold text-gray-700 capitalize dark:text-white group-hover:text-gray-800">arthur melo</h1>
    
                    <p className="mt-2 text-gray-500 capitalize dark:text-gray-300 group-hover:text-gray-700">design director</p>
                    <p>Joining Date: 21-01-2025</p>
    
                    <div className="mt-3 w-full text-center">
                    <ShinyButton className={"mt-2 px-0 py-0 border-none border-red-500 hover:bg-red-600  duration-300 transition-all ease-linear group"}>
                         <button size="lg" className="flex items-center gap-1 py-2.5 border border-red-500 px-6 rounded-lg text-red-500 font-poppins tracking-wide group-hover:text-gray-800 hover:text-white">
                             Removed Trainer <Trash2 className="w-4 h-4 md:hidden lg:block" />
                         </button>
                     </ShinyButton>
                    </div>
                </div>)
            }
            
         </div>
        </div>
    );
};

export default DashboardAllTrainer;