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
import {  useQuery } from "@tanstack/react-query";
import useAxiosSecured from "../../../hooks/useAxiosSecured";
import Swal from "sweetalert2";
import RejectedFeedback from "./rejectedFeedback";
import SectionBadge from "../../../components/common/SectionBadge";
import SectionHeading from "../../../components/common/SectionHeading";
import { Link, useNavigate } from "react-router";
import { format } from "date-fns";
import { Helmet } from "react-helmet";
import AnimatedLoader from "../../Loading/Loading";

const AppliedTrainer = () => {
  const [tableData, setTableData] = useState([])
  const [sortConfig, setSortConfig] = useState({ key: null, direction: "asc" });
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(7);
  const [openActionMenuId, setOpenActionMenuId] = useState(null);
  const navigate = useNavigate()

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

  if(isLoading) return <AnimatedLoader/>

  return (
    <div className="mx-auto p-4 md:max-w-6xl">
      <Helmet>
          <title>Fitverse | Dashboard - trainer applications </title>
          <meta name="Mahadi hasan" content="https://fitverse-bd.web.app/" />
      </Helmet>
      <div className="text-center mt-5 mb-10 space-y-4">
          <SectionBadge title={"Applied Trainer"}/>
          <SectionHeading
            title={"Here's All Trainer Applications"}
            subtitle={"Create and manage new training slots with details like date, time, duration, and capacity for efficient scheduling."}
          />
        </div>

        {/* Table start  */}

      <div className="overflow-y-auto h-full">
      <div className=" min-w-[950px] rounded-md border border-gray-200 w-full">
        <table className="w-full text-sm">
          <thead className="bg-gray-100 dark:bg-gray-600 text-gray-700 dark:text-white/85">
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
                className="p-3 text-left font-medium cursor-pointer"
                onClick={() => handleSort("email")}
              >
                <div className="flex items-center gap-[5px]">
                  Email
                  <HiOutlineArrowsUpDown className="hover:bg-gray-200 p-[5px] rounded-md text-[1.6rem]" />
                </div>
              </th>
              <th
                className="p-3 text-left font-medium  cursor-pointer"
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
                className="p-3 text-left font-medium cursor-pointer"
                onClick={() => handleSort("trainerStatus")}
              >
                <div className="flex items-center gap-[5px]">
                  Status
                  <HiOutlineArrowsUpDown className="hover:bg-gray-200 p-[5px] rounded-md text-[1.6rem]" />
                </div>
              </th>

              <th className="p-3 text-left font-medium ">
                Actions
              </th>
            </tr>
          </thead>
          <tbody>
            {paginatedData?.map((application) => (
              <tr
                key={application._id}
                className="border-t py-2 h-14 border-gray-200 hover:bg-gray-50 font-poppins text-gray-700 text-base dark:text-gray-300 dark:hover:bg-gray-600"
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
                  <button onClick={()=> navigate(`/dashboard/admin/applicant-details/${application._id}`, {state: {id: application._id}})} className="flex items-center gap-[8px] text-[0.9rem] py-1.5 px-2 rounded-md text-gray-700 cursor-pointer transition-all duration-300 p-1.5 border w-fit hover:bg-gray-200">
                    <IoEyeOutline  size={22}/>
                  </button>
         
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
              className="w-max px-2 py-0.5 text-left bg-white border border-gray-300 rounded shadow-sm flex items-center justify-between gap-[10px] hover:border-gray-400 focus:outline-none dark:text-secondary-black"
            >
              {pageSize}

              <IoIosArrowDown
                className={`${
                  isOpen ? "rotate-[180deg]" : "rotate-0"
                } transition-all duration-200`}
              />
            </button>
            {isOpen && (
              <div className="absolute w-max mt-1 bg-white border border-gray-300 rounded shadow-lg dark:bg-gray-500 dark:hover:text-secondary-black">
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
            className="border border-gray-200 hover:bg-gray-50 cursor-pointer px-[10px] text-[0.9rem] py-[5px] rounded-md dark:hover:text-secondary-black"
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
                    pageNum === currentPage && "bg-black dark:bg-white dark:text-secondary-black font-poppins text-white"
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
            className="border border-gray-200 px-[10px] cursor-pointer hover:bg-gray-50 text-[0.9rem] py-[5px] rounded-md dark:hover:text-secondary-black"
          >
            <BsChevronRight />
          </button>
        </div>
      </div>

      {/* Modal show  */}
       
    </div>
  );
};

export default AppliedTrainer;
