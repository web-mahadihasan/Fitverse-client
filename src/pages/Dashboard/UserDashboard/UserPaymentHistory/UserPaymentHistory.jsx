
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
import { format } from "date-fns";
import SectionBadge from "../../../../components/common/SectionBadge";
import SectionHeading from "../../../../components/common/SectionHeading";
import { Helmet } from "react-helmet";

const UserPaymentHistory = () => {
    const [tableData, setTableData] = useState([])
    const {user} = useAuth()
    const [sortConfig, setSortConfig] = useState({ key: null, direction: "asc" });
    const [currentPage, setCurrentPage] = useState(1);
    const [pageSize, setPageSize] = useState(10);


    // Get all application
    const axiosSecured = useAxiosSecured();
    const { data: userPaymentHistory, isLoading, } = useQuery({
        queryKey: ["userPayment"],
        queryFn: async () => {
        const { data } = await axiosSecured.get(`/payment-api/my-payment/${user.email}`);
        return data;
        },
    });
    

    useEffect(()=> {
        if(userPaymentHistory?.length > 0){
            setTableData(userPaymentHistory)
        }
    }, [userPaymentHistory])

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


    if(isLoading) return <p>Loading....</p>

  return (
    <div className="mx-auto p-4">
      <Helmet>
          <title>Fitverse | Dashboard - Payments History </title>
          <meta name="Mahadi hasan" content="https://fitverse-bd.web.app/" />
      </Helmet>
      <div className="text-center mt-5 mb-10 space-y-4">
        <SectionBadge title={"Payment History"}/>
        <SectionHeading
            title={"Your Detailed Payment History"}
            subtitle={"View your complete payment history with detailed information, including dates, amounts, and payment methods"}
        />
          
        </div>
      <div className="overflow-y-auto">
      <div className="min-w-[950px] rounded-md border border-gray-200 w-full">
        <table className="w-full text-sm">
          <thead className="bg-gray-100 dark:bg-gray-400 text-gray-700 dark:text-white/85">
            <tr>
              <th
                className="p-3 text-left font-medium  cursor-pointer"
                onClick={() => handleSort("trainerName")}
              >
                <div className="flex items-center gap-[5px]">
                  Trainer Name
                  <HiOutlineArrowsUpDown className="hover:bg-gray-200 p-[5px] rounded-md text-[1.6rem]" />
                </div>
              </th>
              {/* Email  */}
              <th
                className="p-3 text-left font-medium  cursor-pointer"
                onClick={() => handleSort("packageName")}
              >
                <div className="flex items-center gap-[5px]">
                    packageName
                  <HiOutlineArrowsUpDown className="hover:bg-gray-200 p-[5px] rounded-md text-[1.6rem]" />
                </div>
              </th>

              <th
                className="p-3 text-left font-medium  cursor-pointer"
                onClick={() => handleSort("paymentId")}
              >
                <div className="flex items-center gap-[5px]">
                    Transaction ID
                  <HiOutlineArrowsUpDown className="hover:bg-gray-200 p-[5px] rounded-md text-[1.6rem]" />
                </div>
              </th>
              {/* Role  handleSort(newsLetterSubscriber)*/}
              <th
                className="p-3 text-left font-medium  cursor-pointer"
                onClick={() => handleSort("packagePrice") }
              >
                <div className="flex items-center gap-[5px]">
                    packagePrice
                  <HiOutlineArrowsUpDown className="hover:bg-gray-200 p-[5px] rounded-md text-[1.6rem]" />
                </div>
              </th>
               {/* Role  handleSort(newsLetterSubscriber)*/}
               
              {/* Status  */}
              <th
                className="p-3 text-left font-medium  cursor-pointer"
                onClick={() => handleSort("selectedClass")}
              >
                <div className="flex items-center gap-[5px]">
                  Selected Class
                  <HiOutlineArrowsUpDown className="hover:bg-gray-200 p-[5px] rounded-md text-[1.6rem]" />
                </div>
              </th>
              {/* Status  */}
              <th
                className="p-3 text-left font-medium  cursor-pointer"
                onClick={() => handleSort("paymentDate")}
              >
                <div className="flex items-center gap-[5px]">
                  Payment Date
                  <HiOutlineArrowsUpDown className="hover:bg-gray-200 p-[5px] rounded-md text-[1.6rem]" />
                </div>
              </th>

              
            </tr>
          </thead>
          <tbody>
            {paginatedData?.map((userPayment) => (
              <tr
                key={userPayment._id}
                className="border-t py-2 h-14 border-gray-200 hover:bg-gray-50 font-poppins text-gray-700 text-base dark:text-gray-300 dark:hover:bg-gray-700"
              >
                <td className="p-3">{userPayment.trainerName}</td>
                <td className="p-3">{userPayment.packageName}</td>
                <td className="p-3">{userPayment.paymentId}</td>
                <td className="p-3">$ {userPayment.packagePrice}</td>
                <td className="p-3">{userPayment.selectedClass}</td>
                <td className="p-3">{format(userPayment.paymentDate, "PP")}</td>
                {/* <td className="p-3">{userPayment.role}</td> */}
                
              </tr>
            ))}
          </tbody>
        </table>

        {!userPaymentHistory?.length && (
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
              className="w-max px-2 py-0.5 text-left bg-white border border-gray-300 rounded shadow-sm flex items-center justify-between gap-[10px]  dark:text-secondary-black"
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

      {/* Modal show  */}
      
    </div>
  );
};

export default UserPaymentHistory;
