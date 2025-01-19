import { useEffect, useMemo, useRef, useState } from "react";

// react icons
import {RxCross1} from "react-icons/rx";
import { HiOutlineArrowsUpDown } from "react-icons/hi2";
import {
  BsChevronLeft,
  BsChevronRight,
  BsThreeDotsVertical,
} from "react-icons/bs";
import { MdDeleteOutline,  } from "react-icons/md";
import { IoCheckmarkDoneSharp, IoEyeOutline } from "react-icons/io5";
import { IoIosArrowDown } from "react-icons/io";
import { useMutation, useQuery } from "@tanstack/react-query";
import useAxiosSecured from "../../../hooks/useAxiosSecured";
import Swal from "sweetalert2";
import RejectedFeedback from "./rejectedFeedback";

const AppliedTrainer = () => {
  const [tableData, setTableData] = useState([])
  const [rejectionModalOpen, setRejectionModalOpen] = useState(false);
  const [rejectionId, setRejectionId] = useState(null);
  const [rejectFeedback, setRejectFeedback] = useState("")
  const [disabledButton, setDisabledButton] = useState(true);
  const [sortConfig, setSortConfig] = useState({ key: null, direction: "asc" });
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(7);
  const [openActionMenuId, setOpenActionMenuId] = useState(null);

  // Get all application
  const axiosSecured = useAxiosSecured();
  const { data: allApplication, isLoading, refetch } = useQuery({
    queryKey: ["applicantAdmin"],
    queryFn: async () => {
      const { data } = await axiosSecured.get("/application-api/get-application");
      return data;
    },
  });

  useEffect(()=> {
    if(allApplication?.length > 0){
      setTableData(allApplication)
    }
  }, [allApplication])

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

  const toggleActionMenu = (id) => {
    setOpenActionMenuId(openActionMenuId === id ? null : id);
  };

  const handleToggle = () => setIsOpen((prev) => !prev);

  // Modal check confirm
  const checkIsConfirmAction = (e) => {
        setDisabledButton(true)
        setRejectFeedback(e.target.value)

        if(rejectFeedback.length > 10){
            setDisabledButton(false)
        }
        
    }

  // Handle accept application 
  const handleAcceptApplication = async (applicationData) => {
    try {
        const {data} = await axiosSecured.patch(`/application-api/accept-application/${applicationData._id}`, applicationData)
        console.log(data)
        if(data.modifiedCount > 0){
            Swal.fire({
              title: "Successfull",
              text: "Your applicaiton has been approved.",
              icon: "success"
            })
            refetch()
            setOpenActionMenuId(null)
        }
    } catch (error) {
        console.log(error)
    }
  }
  // Handle Delete application 
  const handleRejectApplication = async(id) => {
    Swal.fire({
      title: "Are you sure Reject Application?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#10b981",
      confirmButtonText: "Reject Application",
      cancelButtonText: "Keep it"
    }).then(async(result) => {
      if (result.isConfirmed) {
        setRejectionId(id)
        setRejectionModalOpen(true)
       
      }
    }); 
  }
  const handleRejectConfirmation = async () => {
    const rejectNote = {
      rejectNote: rejectFeedback
    }
     try {
          const {data} = await axiosSecured.patch(`/application-api/reject-application/${rejectionId}`, rejectNote)
          console.log(data)
          if(data.modifiedCount > 0){
              Swal.fire({
                title: "Successfull",
                text: "Your applicaiton has been approved.",
                icon: "success"
              })
              setRejectFeedback("")
              setRejectionModalOpen(false)
              refetch()
              setOpenActionMenuId(null)
          }
          } catch (error) {
              console.log(error)
          }
  }
 
  if(isLoading) return <p>Loading....</p>

  return (
    <div className="mx-auto p-4 my-10">
      <div className="text-center mt-5 mb-10 space-y-4">
          <h3 className="font-kanit text-3xl font-semibold uppercase tracking-wide text-main dark:text-main">
            Here's All Trainer Applications
          </h3>
          <p className="max-w-2xl mx-auto text-center font-poppins text-gray-600 dark:text-gray-300">
            Create and manage new training slots with details like date, time,
            duration, and capacity for efficient scheduling.
          </p>
        </div>
      <div className="rounded-md border border-gray-200 w-full">
        <table className="w-full text-sm">
          <thead className="bg-gray-100">
            <tr>
              <th
                className="p-3 text-left font-medium text-gray-700 cursor-pointer"
                onClick={() => handleSort("name")}
              >
                <div className="flex items-center gap-[5px]">
                  Name
                  <HiOutlineArrowsUpDown className="hover:bg-gray-200 p-[5px] rounded-md text-[1.6rem]" />
                </div>
              </th>
              {/* Email  */}
              <th
                className="p-3 text-left font-medium text-gray-700 cursor-pointer"
                onClick={() => handleSort("email")}
              >
                <div className="flex items-center gap-[5px]">
                  Email
                  <HiOutlineArrowsUpDown className="hover:bg-gray-200 p-[5px] rounded-md text-[1.6rem]" />
                </div>
              </th>
              {/* Role  handleSort(allApplication)*/}
              <th
                className="p-3 text-left font-medium text-gray-700 cursor-pointer"
                onClick={() => handleSort("date") }
              >
                <div className="flex items-center gap-[5px]">
                  Date
                  <HiOutlineArrowsUpDown className="hover:bg-gray-200 p-[5px] rounded-md text-[1.6rem]" />
                </div>
              </th>
               {/* Role  handleSort(allApplication)*/}
               
              {/* Status  */}
              <th
                className="p-3 text-left font-medium text-gray-700 cursor-pointer"
                onClick={() => handleSort("status")}
              >
                <div className="flex items-center gap-[5px]">
                  Status
                  <HiOutlineArrowsUpDown className="hover:bg-gray-200 p-[5px] rounded-md text-[1.6rem]" />
                </div>
              </th>

              <th className="p-3 text-left font-medium text-gray-700">
                Actions
              </th>
            </tr>
          </thead>
          <tbody>
            {paginatedData?.map((application) => (
              <tr
                key={application._id}
                className="border-t py-2 h-14 border-gray-200 hover:bg-gray-50 font-poppins text-gray-700 text-base dark:text-gray-300"
              >
                <td className="p-3">{application.name}</td>
                <td className="p-3">{application.email}</td>
                <td className="p-3">{application.date}</td>
                {/* <td className="p-3">{application.role}</td> */}
                <td className={``}> <span className={`inline-flex items-center justify-center gap-1 rounded px-3 py-[3px] text-sm text-white ${application.trainerStatus === "approved" && "bg-emerald-500" || application.trainerStatus === "pending" && "bg-orange-600 px-4" || application.trainerStatus === "reject" && "bg-red-600 px-4"}`}>
                  {
                  application?.trainerStatus === "approved" && "Approved" 
                  || application?.trainerStatus === "pending" && "Pending" 
                  || application?.trainerStatus === "reject" && "Rejected"
                  }</span> 
                </td>
                <td className="p-3 relative">
                  <BsThreeDotsVertical
                    onClick={() => toggleActionMenu(application._id)}
                    className="action-btn action-btn text-gray-600 cursor-pointer"
                  />

                  <div
                    className={`${
                      openActionMenuId === application._id
                        ? "opacity-100 scale-[1] z-30"
                        : "opacity-0 scale-[0.8] z-[-1]"
                    } zenui-table absolute top-[90%] right-[80%] p-1.5 rounded-md bg-white shadow-md min-w-[180px] space-y-1 transition-all duration-100`}
                  >
                    <button disabled={application?.trainerStatus === "approved"} onClick={() => handleAcceptApplication(application)} className="flex items-center gap-[8px] text-[0.9rem] py-1.5 px-2 w-full rounded-md text-gray-700 cursor-pointer hover:bg-gray-100 hover:text-green-600 font-poppins transition-all duration-200">
                      <IoCheckmarkDoneSharp />
                      {application?.trainerStatus === "approved" ? "Already Approved" : "Accept"}
                    </button>
                    <button disabled={application?.trainerStatus === "reject"} onClick={() => handleRejectApplication(application._id)} className={`flex items-center gap-[8px] text-[0.9rem] py-1.5 px-2 w-full rounded-md text-red-700 cursor-pointer hover:bg-gray-50 transition-all duration-200 ${application?.trainerStatus === "reject" ? "bg-gray-300 cursor-default hover:bg-gray-300": ""}`}>
                      <MdDeleteOutline size={16}/>
                      {application?.trainerStatus === "reject" ? "Already Reject" : "Reject"}
                    </button>
                    <button className="flex items-center gap-[8px] text-[0.9rem] py-1.5 px-2 w-full rounded-md text-gray-700 cursor-pointer hover:bg-gray-50 transition-all duration-200">
                      <IoEyeOutline />
                      View Details
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {!allApplication?.length && (
          <p className="text-[0.9rem] text-gray-500 py-6 text-center w-full">
            No data found!
          </p>
        )}
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
                   rejectionModalOpen ? " visible" : " invisible"
               } w-full h-screen fixed top-0 left-0 z-50 bg-[#0201012a] flex items-center justify-center transition-all duration-300`}
           >
               <div
                   className={`${
                    rejectionModalOpen
                           ? " scale-[1] opacity-100"
                           : " scale-[0] opacity-0"
                   } lg:w-[30%] md:w-[40%] sm:w-[90%] w-full bg-gray-100 rounded-lg p-5 transition-all duration-300`}
               >
                   <div className="min-w-full flex items-center justify-between">
                       <h2 className="primary-black my-3 dark:text-gray-100 text-2xl font-poppins font-[600]">Add a Feeback for user</h2>
                       <RxCross1
                           className="p-2 text-[2rem] hover:bg-[#e7e7e7] rounded-full transition-all duration-300 cursor-pointer"
                           onClick={() => setRejectionModalOpen(false)}
                       />
                   </div>
                   <div className="w-full">
                       <p className="text-gray-500 text-[1rem] font-poppins font-[400]">
                           Provide a brief reason for rejection and guide the applicant on how to improve and reapply.  
                       </p>
                       <div className="mt-5 flex flex-col gap-4">
                           <label className="font-[400] text-gray-700 font-poppins">Write something for comfirm rejection.</label>
                           <textarea onChange={checkIsConfirmAction} value={rejectFeedback} name="description" className="font-poppins peer min-h-[100px] border-[#e5eaf2] border rounded-md outline-none px-4 py-3 w-full focus:border-main transition-colors duration-300"></textarea>                    
                       </div>
                       <div className="mt-8 flex w-full items-end justify-end gap-[13px]">
                           <button onClick={() => setRejectionModalOpen(false)}
                                   className={`py-2 px-6 rounded font-[500] z-10 border border-[#cecece] text-gray-500`}>Cancel
                           </button>
                           <button onClick={handleRejectConfirmation}
                                   className={`py-2 font-popins text-lg font-medium px-5 rounded-md ${disabledButton ? "!bg-[#FDECEB] !border-[#FDECEB] text-red-200 cursor-not-allowed" : "bg-red-600 text-white border-red-600"}`}
                                   disabled={disabledButton}>Rejected
                           </button>
                       </div>
                   </div>
                   
               </div>
           </div>
          </>
    </div>
  );
};

export default AppliedTrainer;
