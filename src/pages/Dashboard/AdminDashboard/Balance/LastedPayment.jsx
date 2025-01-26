
import { useEffect, useRef, useState } from "react";
import { HiOutlineArrowsUpDown } from "react-icons/hi2";
import {
  BsChevronLeft,
  BsChevronRight,
} from "react-icons/bs";
import useAuth from "../../../../hooks/useAuth";
import useAxiosSecured from "../../../../hooks/useAxiosSecured";
import { useQuery } from "@tanstack/react-query";
import { IoEyeOutline } from "react-icons/io5";
import { RxCross1 } from "react-icons/rx";
import { format } from "date-fns";
import AnimatedLoader from "../../../Loading/Loading";

const LatestPayment = () => {
    const [tableData, setTableData] = useState([])
    const {user} = useAuth()
    const [sortConfig, setSortConfig] = useState({ key: null, direction: "asc" });
    const [currentPage, setCurrentPage] = useState(1);
    // const [pageSize, setPageSize] = useState(10);


    // Get all application
    const axiosSecured = useAxiosSecured();
    const { data: latestPayments, isLoading, } = useQuery({
        queryKey: ["latestPayments"],
        queryFn: async () => {
        const { data } = await axiosSecured.get(`/payment-api/all-payments?page=${currentPage}`);
        return data;
        },
    });
    
    const {payments, totalPage, pageNo} = latestPayments || {}
    console.log(payments, currentPage)

    useEffect(()=> {
        if(payments?.length > 0){
            setTableData(payments)
        }
    }, [payments])

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
    
        setTableData(sorted);
    };

    if(isLoading) return <AnimatedLoader/>

  return (
    <div className="mx-auto p-4 mb-24">
      <div className="text-center mt-5 mb-10 space-y-4">
        <h3 className="text-2xl font-poppins text-gray-700 dark:text-gray-400 capitalize font-medium">Lasted payments</h3>
          
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
                  User Name
                  <HiOutlineArrowsUpDown className="hover:bg-gray-200 p-[5px] rounded-md text-[1.6rem]" />
                </div>
              </th>
              {/* Email  */}
              <th
                className="p-3 text-left font-medium  cursor-pointer"
                onClick={() => handleSort("packageName")}
              >
                <div className="flex items-center gap-[5px]">
                    User Email
                  <HiOutlineArrowsUpDown className="hover:bg-gray-200 p-[5px] rounded-md text-[1.6rem]" />
                </div>
              </th>

              <th
                className="p-3 text-left font-medium  cursor-pointer"
                onClick={() => handleSort("paymentId")}
              >
                <div className="flex items-center gap-[5px]">
                    Package Name
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
            {tableData?.map((userPayment) => (
              <tr
                key={userPayment._id}
                className="border-t py-2 h-14 border-gray-200 hover:bg-gray-50 font-poppins text-gray-700 text-base dark:text-gray-300 dark:hover:bg-gray-700"
              >
                <td className="p-3">{userPayment.userName}</td>
                <td className="p-3">{userPayment.userEmail}</td>
                <td className="p-3">{userPayment.packageName}</td>
                <td className="p-3">{userPayment.selectedClass}</td>
                <td className="p-3">$ {userPayment.packagePrice}</td>
                <td className="p-3">{format(userPayment.paymentDate, "PP")}</td>
                {/* <td className="p-3">{userPayment.role}</td> */}
                
              </tr>
            ))}
          </tbody>
        </table>

        {!payments?.length && (
          <p className="text-[0.9rem] text-gray-500 py-6 text-center w-full">
            No data found!
          </p>
        )}
      </div>
      </div>

        {/* TODO  */}
        {/* Exchange sortedData to tableData  */}
      <div className="mt-4 flex items-center justify-center">

        <div className="flex items-center gap-2">
          <button
            onClick={() => setCurrentPage(currentPage - 1)}
            disabled={currentPage === 1}
            className="border border-gray-200 hover:bg-gray-50 cursor-pointer px-[10px] text-[0.9rem] py-[5px] rounded-md"
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

export default LatestPayment;
