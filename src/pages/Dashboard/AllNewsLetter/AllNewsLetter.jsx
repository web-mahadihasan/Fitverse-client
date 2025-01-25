import { useEffect, useRef, useState } from "react";
import { HiOutlineArrowsUpDown } from "react-icons/hi2";
import {
  BsChevronLeft,
  BsChevronRight,
} from "react-icons/bs";

import useAxiosSecured from "../../../hooks/useAxiosSecured";
import { useQuery } from "@tanstack/react-query";
import { IoIosArrowDown } from "react-icons/io";
import { format } from "date-fns";
import SectionBadge from "../../../components/common/SectionBadge";
import SectionHeading from "../../../components/common/SectionHeading";
import { Helmet } from "react-helmet";


const ActivityLog = () => {
    const [tableData, setTableData] = useState([])
    const [sortConfig, setSortConfig] = useState({ key: null, direction: "asc" });
    const [currentPage, setCurrentPage] = useState(1);
    const [pageSize, setPageSize] = useState(7);
    

    // Get all application
    const axiosSecured = useAxiosSecured();
    const { data: newsLetterSubscriber, isLoading } = useQuery({
        queryKey: ["newsLetterSubscriber"],
        queryFn: async () => {
        const { data } = await axiosSecured.get(`/newsletter-api/all-subscription-user`);
        return data;
        },
    });

    useEffect(()=> {
        if(newsLetterSubscriber?.length > 0){
        setTableData(newsLetterSubscriber)
        }
    }, [newsLetterSubscriber])

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
    // console.log( new Date(Jan 1, 2025))
 
  if(isLoading) return <p>Loading....</p>

  return (
    <div className="mx-auto p-4 my-10 md:max-w-6xl">
      <Helmet>
          <title>Fitverse | Dashboard - All newsletter </title>
          <meta name="Mahadi hasan" content="https://fitverse-bd.web.app/" />
      </Helmet>
      <div className="text-center mt-5 mb-10 space-y-4">
        <SectionBadge title={"All Newsletter"}/>
        <SectionHeading
          title={"Subscriber List and Insights"}
          subtitle={"Monitor and review user actions, from logins to updates, ensuring transparency and a comprehensive view of system engagement."}
        />
        </div>
      <div className="overflow-y-auto">
      <div className="overflow-x-auto min-w-[950px] rounded-md border border-gray-200 w-full ">
        <table className="w-full text-sm">
          <thead className="bg-gray-100 dark:bg-gray-400 text-gray-700 dark:text-white/85">
            <tr>
              <th
                className="p-3 text-left font-medium cursor-pointer"
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
              
            </tr>
          </thead>
          <tbody>
            {paginatedData?.map((subscriber) => (
              <tr
                key={subscriber._id}
                className="border-t py-2 h-14 border-gray-200 hover:bg-gray-50 font-poppins text-gray-700 text-base dark:text-gray-300 dark:hover:bg-gray-600"
              >
                <td className="p-3">{subscriber.name}</td>
                <td className="p-3">{subscriber.email}</td>
                <td className="p-3">{format(subscriber.date, "PP")}</td>
                
              </tr>
            ))}
          </tbody>
        </table>

        {!newsLetterSubscriber?.length && (
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
              className="w-max px-2 dark:text-gray-700 py-0.5 text-left bg-white border border-gray-300 rounded shadow-sm flex items-center justify-between gap-[10px] hover:border-gray-400 focus:outline-none"
            >
              {pageSize}

              <IoIosArrowDown
                className={`${
                  isOpen ? "rotate-[180deg]" : "rotate-0"
                } transition-all duration-200`}
              />
            </button>
            {isOpen && (
              <div className="absolute w-max mt-1 bg-white border border-gray-300 dark:bg-gray-500 rounded shadow-lg ">
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
            className="border border-gray-200 px-[10px] cursor-pointer hover:bg-gray-50 text-[0.9rem] py-[5px] rounded-md"
          >
            <BsChevronRight />
          </button>
        </div>
      </div>

      
    </div>
  );
};

export default ActivityLog;
