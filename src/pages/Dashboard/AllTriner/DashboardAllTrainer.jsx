import { useQuery } from "@tanstack/react-query";
import useAxiosPublic from "../../../hooks/useAxiosPublic";
import { BsChevronLeft, BsChevronRight, } from "react-icons/bs";
import { Icon } from "@iconify/react/dist/iconify.js";
import { ShinyButton } from "@/components/ui/shiny-button";
import SectionBadge from "../../../components/common/SectionBadge";
import { format } from "date-fns";
import { useState } from "react";
import { Trash2 } from "lucide-react";
import { Modal } from 'antd';
const { confirm } = Modal;
import { ExclamationCircleFilled } from '@ant-design/icons';
import useAxiosSecured from "../../../hooks/useAxiosSecured";
import Loading from "../../Loading/Loading";
import Swal from "sweetalert2";
import { Helmet } from "react-helmet";

const DashboardAllTrainer = () => {
    const axiosPublic = useAxiosPublic()
    const [currentPage, setCurrentPage] = useState(1)
    const axiosSecured = useAxiosSecured()

    const {data: allTrainers, refetch, isLoading} = useQuery({
        queryKey: ["allTrainers"],
        queryFn: async () => {
            const {data} = await axiosPublic.get(`/trainer-api/trainers?page=${currentPage}`)
            return data
        }
    })
    const {trainers, totalPage, page} = allTrainers || {}
    // Handle reject application 
  const showPromiseConfirm = (id) => {
    confirm({
      title: <span className="font-popins" style={{ fontWeight: 'bold', fontSize: '20px', color: '#ff4d4f' }}>Are you sure to Reject Application?</span>,
      icon: <ExclamationCircleFilled style={{ color: '#faad14' }} />,
      content: <span className="font-poppins my-4" style={{ fontSize: '16px', color: '#595959', marginBottom: '8px' }}>This will make changes, but you can change it again anytime</span>,
      okButtonProps: { style: { backgroundColor: '#52c41a', borderColor: '#52c41a', color: '#fff', fontFamily: "poppins"} },
      cancelButtonProps: { style: { backgroundColor: '#ff4d4f', borderColor: '#ff4d4f', color: '#fff', fontFamily: "poppins" } },
      onOk() {
        return new Promise((resolve, reject) => {
          setTimeout( resolve , 1000);
        })
          .then(async () => {
            handleRemoveTrainer(id)
          })
      },
      onCancel() {
        console.log('Cancelled');
      },
    });
  };
    const handleRemoveTrainer = async (id) =>{
      try {
            const {data} = await axiosSecured.delete(`/trainer-api/removed-trainer/${id}`)
            console.log(data)
            if(data.deletedCount > 0){
                Swal.fire({
                  title: "Successfull",
                  text: "Trainer has been demotion to member.",
                  icon: "success"
                })
                refetch()
            }
        } catch (error) {
          console.log(error)
        }

    }
    if(isLoading) return <Loading/>

    return (
        <div className="mx-auto p-4">
          <Helmet>
              <title>Fitverse | Dashboard - All trainers </title>
              <meta name="Mahadi hasan" content="https://fitverse-bd.web.app/" />
          </Helmet>
            <div className="text-center mt-5 mb-10 space-y-4">
                <SectionBadge title={"Activity Logs"}/>
                
                <h3 className="pb-6 text-4xl text-center font-bold  font-kanit capitalize text-secondary-black  mb-7 tracking-wide dark:text-main-dark">Managed Your all trainers</h3>
            </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mb-24">
            
            {
                trainers?.map(data => <div key={data._id} className="w-full sm:w-[80%] lg:w-full flex flex-col  justify-center p-6 transition-colors duration-300 transform border cursor-pointer rounded-xl hover:border-transparent group hover:bg-gray-200 dark:hover:bg-gray-700  dark:border-gray-700 dark:hover:border-transparent">         
                    <img className="mx-auto object-cover w-32 h-32 rounded-full ring-4 ring-gray-300" src={data?.image} alt=""/>
                    <div className="flex items-center justify-between mt-3">
                       <p className="flex items-center gap-1">
                         <span className="text-main"><Icon icon="material-symbols-light:work-history-outline-rounded" width="20" height="20" /></span>
                         <span className="font-poppins text-sm text-gray-700 dark:text-gray-400">Experience: {data.experience} Yr</span>
                       </p>
                       <p className="flex items-center gap-1">
                         <span className="text-main"><Icon icon="material-symbols:data-usage" width="20" height="20" /></span>
                         <span className="font-poppins text-sm text-gray-700 dark:text-gray-400">Age: {data.age} Yr</span>
                       </p>
                     </div>
                    <h1 className="mt-3 text-2xl font-semibold text-gray-700 capitalize dark:text-white  group-hover:text-secondary-black dark:group-hover:text-white">{data.name}</h1>
    
                    <p className="mt-2 text-gray-500 capitalize dark:text-gray-300  dark:group-hover:text-white/85 group-hover:text-gary-900 font-poppins">{data.role}</p>
                    <p className="mt-2 text-gray-500 capitalize dark:text-gray-300 dark:group-hover:text-white/85 group-hover:text-gary-900 font-poppins">Joining Date: {format(data.date, "PP")}</p>
    
                    <div className="mt-3 w-full text-center">
                    <ShinyButton onClick={() => showPromiseConfirm(data._id)} className={"mt-2 px-0 py-0 border-none border-red-500 hover:bg-red-600  duration-300 transition-all ease-linear group"}>
                         <button size="lg" className="flex items-center gap-1 py-2.5 border border-red-500 px-6 rounded-lg text-red-500 font-poppins tracking-wide group-hover:text-gray-800 hover:text-white">
                             Removed Trainer <Trash2 className="w-4 h-4 md:hidden lg:block" />
                         </button>
                     </ShinyButton>
                    </div>
                </div>)
            }
            
         </div>

         {/* Paginate Data  */}

         <div className="flex items-center gap-2 justify-center">
               <button
                 onClick={() => setCurrentPage(currentPage - 1)}
                 disabled={currentPage === 1}
                 className="border border-gray-200 hover:bg-gray-50 cursor-pointer px-[10px] text-[0.9rem] py-[5px] rounded-md dark:hover:text-secondary-black"
               >
                 <BsChevronLeft />
               </button>
        
               {/* Page Numbers */}
               <div className="flex items-center gap-1">
                 {Array.from({ length: Math.min(5, totalPage) }, (_, i) => {
                   let pageNum;
                   if (totalPage <= 5) {
                     pageNum = i + 1;
                   } else if (currentPage <= 3) {
                     pageNum = i + 1;
                   } else if (currentPage >= totalPage - 2) {
                     pageNum = totalPage - 4 + i;
                   } else {
                     pageNum = currentPage - 2 + i;
                   }
        
                   return (
                     <button
                       key={pageNum}
                       onClick={() => setCurrentPage(pageNum)}
                       className={`${
                         pageNum === currentPage && "bg-black dark:bg-white dark:text-secondary-black font-poppins text-white"
                       } border border-gray-200 px-[10px] text-[0.9rem] py-[1px] rounded-md`}
                     >
                       {pageNum}
                     </button>
                   );
                 })}
               </div>
        
               <button
                 onClick={() => setCurrentPage(currentPage + 1)}
                 disabled={currentPage === totalPage}
                 className="border border-gray-200 px-[10px] cursor-pointer hover:bg-gray-50 text-[0.9rem] py-[5px] rounded-md dark:hover:text-secondary-black"
               >
                 <BsChevronRight />
               </button>
         </div>
        </div>
    );
};

export default DashboardAllTrainer;