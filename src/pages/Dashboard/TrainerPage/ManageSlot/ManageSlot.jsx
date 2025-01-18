import { useEffect, useMemo, useRef, useState } from "react";
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
import Swal from "sweetalert2";
import useAuth from "../../../../hooks/useAuth";
import useAxiosSecured from "../../../../hooks/useAxiosSecured";

const ManageSlot = () => {
  const [tableData, setTableData] = useState([])
  const {user} = useAuth()
  // Get all application
  const axiosSecured = useAxiosSecured();
  const { data: mySlots, isLoading, refetch } = useQuery({
    queryKey: ["mySlots"],
    queryFn: async () => {
      const { data } = await axiosSecured.get(`/slot-api/slots/${user?.email}`);
      return data;
    },
  });

  useEffect(()=> {
    if(mySlots?.length > 0){
      setTableData(mySlots)
    }
  }, [mySlots])

  console.log(mySlots)

  const [sortConfig, setSortConfig] = useState({ key: null, direction: "asc" });
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [openActionMenuId, setOpenActionMenuId] = useState(null);


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

  const handleAcceptApplication = async (applicationData) => {
    // try {
    //     const {data} = await axiosSecured.patch(`/application-api/accept-application/${applicationData._id}`, applicationData)
    //     console.log(data)
    //     if(data.modifiedCount > 0){
    //         Swal.fire({
    //           title: "Successfull",
    //           text: "Your applicaiton has been approved.",
    //           icon: "success"
    //         })
    //         refetch()
    //         setOpenActionMenuId(null)
    //     }
    // } catch (error) {
    //     console.log(error)
    // }
  }
  if(isLoading) return <p>Loading....</p>

  return (
    <div className="mx-auto p-4 my-10">
      <div className="text-center mt-5 mb-10 space-y-4">
          <h3 className="font-kanit text-3xl font-semibold uppercase tracking-wide text-main dark:text-main">
            Trainer Slot Management
          </h3>
          <p className="max-w-2xl mx-auto text-center font-poppins text-gray-600 dark:text-gray-300">
            Manage trainer slots efficiently with options to view, sort, filter, and update schedules for seamless coordination.
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
                <div className="flex items-center gap-[5px] text-base font-poppins text-gray-700 dark:text-gray-200">
                  Slot Name
                      <HiOutlineArrowsUpDown className="hover:bg-gray-200 p-[5px] rounded-md text-[1.6rem]" />
                </div>
              </th>
              {/* Email  */}
              <th
                className="p-3 text-left font-medium text-gray-700 cursor-pointer"
                onClick={() => handleSort("email")}
              >
                <div className="flex items-center gap-[5px] text-base font-poppins text-gray-700 dark:text-gray-200">
                  Classes
                  <HiOutlineArrowsUpDown className="hover:bg-gray-200 p-[5px] rounded-md text-[1.6rem]" />
                </div>
              </th>
              {/* Role  handleSort(allApplication)*/}
              <th
                className="p-3 text-left font-medium text-gray-700 cursor-pointer"
                onClick={() => handleSort("date") }
              >
                <div className="flex items-center gap-[5px] text-base font-poppins text-gray-700 dark:text-gray-200">
                  Class Hours
                  <HiOutlineArrowsUpDown className="hover:bg-gray-200 p-[5px] rounded-md text-[1.6rem]" />
                </div>
              </th>
               {/* Role  handleSort(allApplication)*/}
               
              {/* Status  */}
              <th
                className="p-3 text-left font-medium text-gray-700 cursor-pointer"
                onClick={() => handleSort("status")}
              >
                <div className="flex items-center gap-[5px] text-base font-poppins text-gray-700 dark:text-gray-200">
                  Status
                  <HiOutlineArrowsUpDown className="hover:bg-gray-200 p-[5px] rounded-md text-[1.6rem]" />
                </div>
              </th>

              <th className="p-3 text-left font-medium text-gray-700 text-base font-poppins text-gray-700 dark:text-gray-200">
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
                <td className="p-3 w-fit font-poppins text-base font-medium text-gray-600 dark:text-gray-300">{application.slotName}</td>
                <td className="p-3 flex flex-col gap-1">
                    <div>
                    {
                         application.classtitle.slice(0,2).map((classTitle, index) => (
                            <span key={index} className="border mx-[2px] px-1 border-main-light rounded-lg bg-main-dark text-gray-600 dark:text-gray-400">{classTitle}</span>))
                    }
                    </div>
                    <div>
                        {
                         application.classtitle.slice(2).map((classTitle, index) => (
                            <span key={index} className="border mx-[2px] px-1 border-main-light rounded-lg bg-main-dark text-gray-600 dark:text-gray-400">{classTitle}</span>))
                    }
                    </div>
                </td>
                <td className="p-3 font-poppins text-base font-medium text-gray-600 dark:text-gray-300  ">{application.classHour} Hours</td>
                {/* <td className="p-3">{application.role}</td> */}
                <td className={``}> <span className={`border w-fit px-4 py-[2px] font-base font-kanit font-normal text-gray-600 dark:text-gray-300 rounded-full ${application?.status === "pending" && "bg-orange-200 border-orange-200"} ${application?.status === "approved" && "bg-emerald-200 border-emerald-300 "} ${application?.status === "reject" && "bg-red-500 border-red-500"}`}>{application.slotStatus}</span> </td>
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
                    } zenui-table absolute top-[90%] right-[80%] p-1.5 rounded-md bg-white shadow-md min-w-[160px] transition-all duration-100`}
                  >
                    <button onClick={() => handleAcceptApplication(application)} className="flex items-center gap-[8px] text-[0.9rem] py-1.5 px-2 w-full rounded-md text-gray-700 cursor-pointer hover:bg-gray-100 hover:text-green-600 font-poppins transition-all duration-200">
                      <IoCheckmarkDoneSharp />
                      Accept
                    </button>
                    <button className="flex items-center gap-[8px] text-[0.9rem] py-1.5 px-2 w-full rounded-md text-red-700 cursor-pointer hover:bg-gray-50 transition-all duration-200">
                      <MdDeleteOutline size={16}/>
                      Reject
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

        {!tableData?.length && (
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
    </div>
  );
};

export default ManageSlot;
