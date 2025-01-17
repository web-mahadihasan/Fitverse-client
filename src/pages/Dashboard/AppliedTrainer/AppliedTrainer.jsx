import React, { useEffect, useMemo, useRef, useState } from "react";

// react icons
import { HiOutlineArrowsUpDown } from "react-icons/hi2";
import {
  BsChevronLeft,
  BsChevronRight,
  BsThreeDotsVertical,
} from "react-icons/bs";
import { MdDeleteOutline, MdOutlineEdit } from "react-icons/md";
import { IoCheckmarkDoneSharp, IoEyeOutline } from "react-icons/io5";
import { IoIosArrowDown } from "react-icons/io";
import { useMutation, useQuery } from "@tanstack/react-query";
import useAxiosSecured from "../../../hooks/useAxiosSecured";
import Swal from "sweetalert2";

const AppliedTrainer = () => {
  // Get all application
  const axiosSecured = useAxiosSecured();
  const { data: allApplication, refetch } = useQuery({
    queryKey: ["applicantAdmin"],
    queryFn: async () => {
      const { data } = await axiosSecured("/get-application");
      return data;
    },
  });

//   const initialData = Array.from(
//     { length: allApplication?.length || 1 },
//     (_, index) => ({
//       id: index + 1,
//       name: `User ${index + 1}`,
//       email: `user${index + 1}@example.com`,
//       role: index % 3 === 0 ? "Admin" : index % 2 === 0 ? "Editor" : "User",
//       status: index % 2 === 0 ? "Active" : "Inactive",
//     })
//   );

  const [data, setData] = useState(allApplication || []);
  const [search, setSearch] = useState("");
  const [sortConfig, setSortConfig] = useState({ key: null, direction: "asc" });
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [openActionMenuId, setOpenActionMenuId] = useState(null);

  // Handle search
  const filteredData = useMemo(() => {
    return data.filter((item) =>
      Object.values(item).some((value) =>
        value.toString().toLowerCase().includes(search.toLowerCase())
      )
    );
  }, [data, search]);

  // Handle sort
  const handleSort = (key) => {
    let direction = "asc";
    if (sortConfig.key === key && sortConfig.direction === "asc") {
      direction = "desc";
    }
    setSortConfig({ key, direction });
  };

  const sortedData = useMemo(() => {
    if (!sortConfig.key) return filteredData;

    return [...filteredData].sort((a, b) => {
      if (a[sortConfig.key] < b[sortConfig.key]) {
        return sortConfig.direction === "asc" ? -1 : 1;
      }
      if (a[sortConfig.key] > b[sortConfig.key]) {
        return sortConfig.direction === "asc" ? 1 : -1;
      }
      return 0;
    });
  }, [filteredData, sortConfig]);

  // Pagination calculations
  const totalPages = Math.ceil(sortedData.length / pageSize);

  const paginatedData = sortedData.slice(
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

  const handleOutsideClick = (event) => {
    if (selectRef.current && !selectRef.current.contains(event.target)) {
      setIsOpen(false);
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleOutsideClick);
    return () =>
      document.removeEventListener("mousedown", () => {
        handleOutsideClick();
      });
  }, []);

  const handleAcceptApplication = async (applicationData) => {
    try {
        const {data} = await axiosSecured.patch(`/accept-application/${applicationData._id}`, applicationData)
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

    // const {isPending ,mutateAsync} = useMutation({
    //     mutationFn: async () =>  {
    //         await axiosSecured.patch(`/accept-application`, )
    //     },
    // })
  }

  return (
    <div className="mx-auto p-4 my-10">
      <div className="rounded-md border border-gray-200 w-full">
        <table className="w-full text-sm">
          <thead className="bg-gray-100">
            <tr>
              <th
                className="p-3 text-left font-medium text-gray-700 cursor-pointer"
                onClick={() => handleSort(allApplication)}
              >
                <div className="flex items-center gap-[5px]">
                  Name
                  <HiOutlineArrowsUpDown className="hover:bg-gray-200 p-[5px] rounded-md text-[1.6rem]" />
                </div>
              </th>
              {/* Email  */}
              <th
                className="p-3 text-left font-medium text-gray-700 cursor-pointer"
                onClick={() => handleSort(allApplication)}
              >
                <div className="flex items-center gap-[5px]">
                  Email
                  <HiOutlineArrowsUpDown className="hover:bg-gray-200 p-[5px] rounded-md text-[1.6rem]" />
                </div>
              </th>
              {/* Role  */}
              <th
                className="p-3 text-left font-medium text-gray-700 cursor-pointer"
                onClick={() => handleSort(allApplication)}
              >
                <div className="flex items-center gap-[5px]">
                  Role
                  <HiOutlineArrowsUpDown className="hover:bg-gray-200 p-[5px] rounded-md text-[1.6rem]" />
                </div>
              </th>
              {/* Status  */}
              <th
                className="p-3 text-left font-medium text-gray-700 cursor-pointer"
                onClick={() => handleSort(allApplication)}
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
            {allApplication?.map((application) => (
              <tr
                key={application._id}
                className="border-t py-2 h-14 border-gray-200 hover:bg-gray-50 font-poppins text-gray-700 text-base dark:text-gray-300"
              >
                <td className="p-3">{application.name}</td>
                <td className="p-3">{application.email}</td>
                <td className="p-3">{application.date}</td>
                <td className={``}> <span className={`border w-fit px-4 py-[2px] font-base font-kanit font-normal text-gray-600 dark:text-gray-300 rounded-full ${application?.status === "pending" && "bg-orange-200 border-orange-200"} ${application?.status === "approved" && "bg-emerald-200 border-emerald-300 "} ${application?.status === "reject" && "bg-red-500 border-red-500"}`}>{application.status}</span> </td>
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
            {/* {paginatedData.map((item) => (
                        <tr key={item.id} className="border-t border-gray-200 hover:bg-gray-50">
                            {Object.entries(item).map(([key, value]) => (
                                key !== "id" && (
                                    <td key={key} className="p-3">
                                        {value}
                                    </td>
                                )
                            ))}
                            <td className="p-3 relative">
                                <BsThreeDotsVertical onClick={() => toggleActionMenu(item
                                    .id)}
                                                     className="action-btn action-btn text-gray-600 cursor-pointer"/>

                                <div
                                    className={`${openActionMenuId === item.id ? "opacity-100 scale-[1] z-30" : "opacity-0 scale-[0.8] z-[-1]"} zenui-table absolute top-[90%] right-[80%] p-1.5 rounded-md bg-white shadow-md min-w-[160px] transition-all duration-100`}>
                                    <p className="flex items-center gap-[8px] text-[0.9rem] py-1.5 px-2 w-full rounded-md text-gray-700 cursor-pointer hover:bg-gray-50 transition-all duration-200">
                                        <MdOutlineEdit/>
                                        Edit
                                    </p>
                                    <p className="flex items-center gap-[8px] text-[0.9rem] py-1.5 px-2 w-full rounded-md text-gray-700 cursor-pointer hover:bg-gray-50 transition-all duration-200">
                                        <MdDeleteOutline/>
                                        Delete
                                    </p>
                                    <p className="flex items-center gap-[8px] text-[0.9rem] py-1.5 px-2 w-full rounded-md text-gray-700 cursor-pointer hover:bg-gray-50 transition-all duration-200">
                                        <IoEyeOutline/>
                                        View Details
                                    </p>
                                </div>
                            </td>
                        </tr>
                    ))} */}
          </tbody>
        </table>

        {!allApplication?.length && (
          <p className="text-[0.9rem] text-gray-500 py-6 text-center w-full">
            No data found!
          </p>
        )}
      </div>

      <div className="mt-4 flex items-center justify-between">
        <div className="flex items-center gap-[5px]">
          <div className="text-sm text-gray-500">
            Showing {(currentPage - 1) * pageSize + 1} to{" "}
            {Math.min(currentPage * pageSize, sortedData.length)} of{" "}
            {sortedData.length} results
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

export default AppliedTrainer;
