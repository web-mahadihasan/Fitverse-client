import { useQuery } from "@tanstack/react-query";
import ClassCard from "../../components/common/ClassCard";
import SectionBadge from "../../components/common/SectionBadge";
import SectionHeading from "../../components/common/SectionHeading";
import useAxiosPublic from "../../hooks/useAxiosPublic";
import { useState } from "react";
import Loading from "../Loading/Loading";
import { BsChevronLeft, BsChevronRight } from "react-icons/bs";
import { PiListStarFill, PiToolboxThin } from "react-icons/pi";
import Select from 'react-select'
import { TbCategoryPlus } from "react-icons/tb";
import { useForm } from "react-hook-form";
import useParamsFilter from "../../hooks/useParamsFilter";
import { Helmet } from "react-helmet";
import PageCover from "../../components/common/PageCover";

const AllClass = () => {
    const axiosPublic = useAxiosPublic()

    const  {
        search,
        sort,
        currentPage,
        setFilters,
        clearFilters
    } = useParamsFilter()

    console.log(search)
    const {data: ClassList, isLoading} = useQuery({
        queryKey: ["ClassList", currentPage, search, sort],
        queryFn: async () => {
            const queryParams = new URLSearchParams();
            if (search) queryParams.append("search", search);
            if (sort) queryParams.append("sort", sort);
            if (currentPage) queryParams.append("page", currentPage);
          const {data} = await axiosPublic.get(`/class-api/allClass?&${queryParams}`)
          return data
        }
      })
    const {allClasses, totalPage,} = ClassList || {}
    const customStyles = {
      control: (provided, state) => ({
        ...provided,
        border: "none",
        boxShadow: "none", 
        "&:hover": {
          border: "none", 
        },
        background: "transparent",
      }),
    };
    const options = [
      { value: "asc", label: "Sort Total Booked Ascending" },
      { value: "dsc", label: "Sort Total Booked Descending" },
    ];
    
    const optionOnChange = (selectedOption) => {
        setFilters({sort: selectedOption.value || undefined})
      };
    const handleQuery = (e) => {
        e.preventDefault()
        const searchText = e.target.searchText.value 
         setFilters({search: searchText || undefined})
    }
    
    if(isLoading) return <Loading/>
    
    return (
        <div className=" mb-24">
            <Helmet>
                <title>Fitverse | All classes </title>
                <meta name="author" content="https://fitverse-bd.web.app/" />
            </Helmet>
            <PageCover title={"All Classes"} page={"all-classes"}/>
            <div className="mt-8">
            <SectionBadge title={"Our Trainers"}/>
            <SectionHeading
              title={"Find Your Perfect Class Today"}
              subtitle={"Our comprehensive list of classes has something for everyone. Join a session that matches your fitness goals and start transforming your health today"}
            />
            </div>

            {/* Search & Sort  */}
            <div className="py-4 max-w-5xl mx-auto px-4 font-poppins mt-4">
            <form onSubmit={handleQuery} className="flex min-h-20 items-center p-3 backdrop-blur-2xl btn-shadow border gap-2 rounded-md bg-white/50 flex-wrap">
                <div className="flex items-center flex-1 gap-1 rounded-md p-3 bg-gray-100">
                    <span className="px-2 border-r border-gray-400"> <PiListStarFill size={24} className="text-main"/> </span>
                    <input type="text" defaultValue={search} name="searchText" id="" className="bg-transparent border-none font-medium outline-none placeholder-primary-dark px-2" placeholder="Class Title"/>
                </div>
                <div className="flex items-center flex-1 gap-1 rounded-md p-1 bg-gray-100 z-20">
                    <span className="px-2 border-r border-gray-300"> <TbCategoryPlus size={22} className="text-main"/> </span>
                    <Select onChange={optionOnChange} options={options} name="sorting" className="w-full border-none outline-none" styles={customStyles}/>
                </div>
                <div>
                    <button type="submit" className="font-poppins bg-gradient-to-r from-[#5A29E4] to-[#9F72F9] hover:bg-transparent px-6 py-2 rounded-md border border-main-light relative overflow-hidden before:absolute before:inset-0 before:translate-x-full hover:before:translate-x-0 before:transition-transform before:duration-300 before:bg-gradient-to-r before:from-indigo-500 before:via-purple-500 before:to-pink-500  before:z-[-1] text-white z-10" >
                        Search
                    </button>
                </div>
            </form>
                {
                    (search || sort || currentPage > 1) && <p  onClick={clearFilters} className="my-1 cursor-pointer text-blue-600">Clear Filter</p> 
                }
            </div>

            <section className="max-width mx-auto px-4 xl:px-0">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 my-6">
                    {
                        allClasses?.map(classInfo => <ClassCard key={classInfo._id} classInfo={classInfo}/>)
                    }
                </div>
            </section>

            {/* Pagination control  */}
            <div className="flex items-center gap-2 justify-center">
                  <button
                    onClick={() =>  setFilters({ currentPage: currentPage - 1 })}
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
                          onClick={() => setFilters({ currentPage: pageNum })}
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
                    onClick={() => setFilters({ currentPage: currentPage + 1 })}
                    disabled={currentPage === totalPage}
                    className="border border-gray-200 px-[10px] cursor-pointer hover:bg-gray-50 text-[0.9rem] py-[5px] rounded-md dark:hover:text-secondary-black"
                  >
                    <BsChevronRight />
                  </button>
            </div>
        </div>
    );
};

export default AllClass;