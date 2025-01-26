import { useEffect, useRef, useState } from "react";
import { HiOutlineArrowsUpDown } from "react-icons/hi2";
import {
  BsChevronLeft,
  BsChevronRight,
} from "react-icons/bs";
import { IoIosArrowDown } from "react-icons/io";
import useAuth from "../../../../hooks/useAuth";
import useAxiosSecured from "../../../../hooks/useAxiosSecured";
import { useQuery } from "@tanstack/react-query";
import { IoEyeOutline } from "react-icons/io5";
import { RxCross1 } from "react-icons/rx";
import SectionBadge from "../../../../components/common/SectionBadge";
import SectionHeading from "../../../../components/common/SectionHeading";
import { format } from "date-fns";
import { Helmet } from "react-helmet";
import AnimatedLoader from "../../../Loading/Loading";

const ActivityLog = () => {
    const [tableData, setTableData] = useState([])
    const [viewFeedbackModal, setViewFeedbackModal] = useState(false);
    const {user} = useAuth()
    const [sortConfig, setSortConfig] = useState({ key: null, direction: "asc" });
    const [currentPage, setCurrentPage] = useState(1);
    const [pageSize, setPageSize] = useState(10);
    const [isNote, setIsNote] = useState("")
    const feedbackRef = useRef()

    // Get all application
    const axiosSecured = useAxiosSecured();
    const { data: userApplicationInfo, isLoading, } = useQuery({
        queryKey: ["userApplicationInfo"],
        queryFn: async () => {
        const { data } = await axiosSecured.get(`/application-api/get-application/${user.email}`);
        return data;
        },
    });
    

    useEffect(()=> {
        if(userApplicationInfo?.length > 0){
            setTableData(userApplicationInfo)
        }
    }, [userApplicationInfo])

    // Handle sorting 
    const handleSort = (key) => {
        let direction = "asc";
        if (sortConfig.key === key && sortConfig.direction === "asc") {
        direction = "desc";
        }
        setSortConfig({ key, direction });
    
        // Perform the sort on tableData
        const sorted = [...tableData].sort((a, b) => {
        if (a[key] < b[key]) {
            return direction === "asc" ? -1 : 1;
        }
        if (a[key] > b[key]) {
            return direction === "asc" ? 1 : -1;
        }
        return 0;
        });
    
        // Update the state with the sorted data
        setTableData(sorted);
    };

    // Pagination calculations
    const totalPages = Math.ceil(tableData?.length / pageSize);

    const paginatedData = tableData?.slice(
        (currentPage - 1) * pageSize,
        currentPage * pageSize
    );

    const handlePageChange = (page) => {
        setCurrentPage(Math.min(Math.max(1, page), totalPages));
    };

    const [isOpen, setIsOpen] = useState(false);
    const selectRef = useRef(null);

    // handle how many row show in one col
    const handleOptionClick = (value) => {
        setPageSize(Number(value));
        setCurrentPage(1);
        setIsOpen(false);
    };

    const handleToggle = () => setIsOpen((prev) => !prev);

    const handleViewFeedback = (id) => {
        const getApplication = userApplicationInfo.find(item => item._id === id)
        const feedback = getApplication.note
        if (feedbackRef.current) {
            feedbackRef.current.innerText = feedback;
          }
          setViewFeedbackModal(true)
    }

    if(isLoading) return <AnimatedLoader/>

  return (
    <div className="mx-auto p-4">
      <Helmet>
          <title>Fitverse | Dashboard - Activity logs </title>
          <meta name="Mahadi hasan" content="https://fitverse-bd.web.app/" />
      </Helmet>
      <div className="text-center mt-5 mb-10 space-y-4">
          <SectionBadge title={"Activity Logs"}/>
          <SectionHeading
            title={"User Activity Log and Engagement"}
            subtitle={"Monitor and review user actions, from logins to updates, ensuring transparency and a comprehensive view of system engagement."}
          />
        </div>
      <div className="overflow-y-auto">
      <div className="rounded-md border border-gray-200 w-full">
        <table className="w-full text-sm">
          <thead className="bg-gray-100 dark:bg-gray-400 text-gray-700 dark:text-white/85">
            <tr>
              <th
                className="p-3 text-left font-medium  cursor-pointer"
                onClick={() => handleSort("name")}
              >
                <div className="flex items-center gap-[5px]">
                  Name
                  <HiOutlineArrowsUpDown className="hover:bg-gray-200 p-[5px] rounded-md text-[1.6rem]" />
                </div>
              </th>
              {/* Email  */}
              <th
                className="p-3 text-left font-medium  cursor-pointer"
                onClick={() => handleSort("email")}
              >
                <div className="flex items-center gap-[5px]">
                  Email
                  <HiOutlineArrowsUpDown className="hover:bg-gray-200 p-[5px] rounded-md text-[1.6rem]" />
                </div>
              </th>
              {/* Role  handleSort(newsLetterSubscriber)*/}
              <th
                className="p-3 text-left font-medium  cursor-pointer"
                onClick={() => handleSort("date") }
              >
                <div className="flex items-center gap-[5px]">
                  Date
                  <HiOutlineArrowsUpDown className="hover:bg-gray-200 p-[5px] rounded-md text-[1.6rem]" />
                </div>
              </th>
               {/* Role  handleSort(newsLetterSubscriber)*/}
               
              {/* Status  */}
              <th
                className="p-3 text-left font-medium  cursor-pointer"
                onClick={() => handleSort("status")}
              >
                <div className="flex items-center gap-[5px]">
                  Status
                  <HiOutlineArrowsUpDown className="hover:bg-gray-200 p-[5px] rounded-md text-[1.6rem]" />
                </div>
              </th>

              <th className="p-3 text-left font-medium ">
                Admin Feedback
              </th>
            </tr>
          </thead>
          <tbody>
            {paginatedData?.map((application) => (
              <tr
                key={application._id}
                className="border-t py-2 h-14 border-gray-200 hover:bg-gray-50 font-poppins text-gray-700 text-base dark:text-gray-300 dark:hover:bg- gray-700"
              >
                <td className="p-3">{application.name}</td>
                <td className="p-3">{application.email}</td>
                <td className="p-3">{format(application.date, "PP")}</td>
                {/* <td className="p-3">{application.role}</td> */}
                <td className={``}> <span className={`inline-flex items-center justify-center gap-1 rounded px-3 py-[3px] text-sm text-white ${application.trainerStatus === "approved" && "bg-emerald-500" || application.trainerStatus === "pending" && "bg-orange-600 px-4" || application.trainerStatus === "reject" && "bg-red-600 px-4"}`}>
                  {
                  application?.trainerStatus === "approved" && "Approved" 
                  || application?.trainerStatus === "pending" && "Pending" 
                  || application?.trainerStatus === "reject" && "Rejected"
                  }</span> 
                </td>
                <td className="p-3 relative">
                  {
                    application?.trainerStatus === "pending" ? "Under Review" : <button onClick={()=> handleViewFeedback(application._id)} className="flex items-center gap-[8px] text-[0.9rem] py-1.5 px-2 w-full rounded-md text-gray-700 cursor-pointer hover:bg-gray-50 transition-all duration-200">
                    <IoEyeOutline size={20}/>
                    View Details
                  </button>
                  }
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {!userApplicationInfo?.length && (
          <p className="text-[0.9rem] text-gray-500 py-6 text-center w-full">
            No data found!
          </p>
        )}
      </div>
      </div>

        {/* TODO  */}
        {/* Exchange sortedData to tableData  */}
      <div className="mt-4 flex items-center justify-between">
        <div className="flex items-center gap-[5px]">
          <div className="text-sm text-gray-500">
            Showing {(currentPage - 1) * pageSize + 1} to{" "}
            {Math.min(currentPage * pageSize, tableData.length)} of{" "}
            {tableData.length} results
          </div>

          <div ref={selectRef} className="relative w-44">
            <button
              onClick={handleToggle}
              className="w-max px-2 py-0.5 text-left bg-white border border-gray-300 rounded shadow-sm flex items-center justify-between gap-[10px] hover:border-gray-400 focus:outline-none"
            >
              {pageSize}

              <IoIosArrowDown
                className={`${
                  isOpen ? "rotate-[180deg]" : "rotate-0"
                } transition-all duration-200`}
              />
            </button>
            {isOpen && (
              <div className="absolute w-max mt-1 bg-white border border-gray-300 rounded shadow-lg">
                <div
                  className="px-4 py-2 cursor-pointer hover:bg-gray-100"
                  onClick={() => handleOptionClick(5)}
                >
                  5
                </div>
                <div
                  className="px-4 py-2 cursor-pointer hover:bg-gray-100"
                  onClick={() => handleOptionClick(10)}
                >
                  10
                </div>
              </div>
            )}
          </div>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => handlePageChange(currentPage - 1)}
            disabled={currentPage === 1}
            className="border border-gray-200 hover:bg-gray-50 cursor-pointer px-[10px] text-[0.9rem] py-[5px] rounded-md"
          >
            <BsChevronLeft />
          </button>

          {/* Page Numbers */}
          <div className="flex items-center gap-1">
            {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
              let pageNum;
              if (totalPages <= 5) {
                pageNum = i + 1;
              } else if (currentPage <= 3) {
                pageNum = i + 1;
              } else if (currentPage >= totalPages - 2) {
                pageNum = totalPages - 4 + i;
              } else {
                pageNum = currentPage - 2 + i;
              }

              return (
                <button
                  key={pageNum}
                  onClick={() => handlePageChange(pageNum)}
                  className={`${
                    pageNum === currentPage && "bg-black text-white"
                  } border border-gray-200 px-[10px] text-[0.9rem] py-[1px] rounded-md`}
                >
                  {pageNum}
                </button>
              );
            })}
          </div>

          <button
            onClick={() => handlePageChange(currentPage + 1)}
            disabled={currentPage === totalPages}
            className="border border-gray-200 px-[10px] cursor-pointer hover:bg-gray-50 text-[0.9rem] py-[5px] rounded-md"
          >
            <BsChevronRight />
          </button>
        </div>
      </div>

      {/* Modal show  */}
       <>
           <div
               className={`${
                   viewFeedbackModal ? " visible" : " invisible"
               } w-full h-screen fixed top-0 left-0 z-50 bg-[#0201012a] flex items-center justify-center transition-all duration-300`}
           >
               <div
                   className={`${
                    viewFeedbackModal
                           ? " scale-[1] opacity-100"
                           : " scale-[0] opacity-0"
                   } lg:w-[30%] md:w-[40%] sm:w-[90%] w-full bg-gray-100 rounded-lg p-5 transition-all duration-300`}
               >
                   <div className="min-w-full flex items-center justify-between">
                       <h2 className="primary-black my-3 dark:text-gray-100 text-2xl font-poppins font-[600]">Admin Feedback is here</h2>
                       <RxCross1
                           className="p-2 text-[2rem] hover:bg-[#e7e7e7] rounded-full transition-all duration-300 cursor-pointer"
                           onClick={() => setViewFeedbackModal(false)}
                       />
                   </div>
                   <div className="w-full">
                       <p ref={feedbackRef} className="text-red-500 text-[1rem] font-poppins font-[400]">
                             
                       </p>
                       <div className="mt-8 flex w-full items-end justify-end gap-[13px]">
                           <button onClick={() => setViewFeedbackModal(false)}
                                   className={`py-2 px-6 font-popins rounded font-[500] z-10 border border-[#cecece] text-gray-500`}>Close
                           </button>
                       </div>
                   </div>
                   
               </div>
           </div>
          </>
    </div>
  );
};

export default ActivityLog;
