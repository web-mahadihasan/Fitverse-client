import { useQuery } from "@tanstack/react-query";
import useAxiosPublic from "../../hooks/useAxiosPublic";
import BlogCard from "../../components/common/BlogCard";
import Loading from "../Loading/Loading";
import { BsChevronLeft, BsChevronRight } from "react-icons/bs";
import { useState } from "react";
import { Helmet } from "react-helmet";
import PageCover from "../../components/common/PageCover";

const Forums = () => {
    const [currentPage, setCurrentPage] = useState(1)
    const axiosPublic = useAxiosPublic()

    const {data: allForums, isLoading} = useQuery({
        queryKey: ["allForums", currentPage],
        queryFn: async () => {
            const {data} = await axiosPublic.get(`/forum-api/forums?page=${currentPage}`)
            return data
        }
    })
    const {blogs, totalPage, page} = allForums || {}

    if(isLoading) return <Loading/>
    return (
        <div className="my-2 mb-4 mx-auto">
          <Helmet>
              <title>Fitverse | Forums </title>
              <meta name="Mahadi hasan" content="https://fitverse-bd.web.app/" />
          </Helmet>
          <PageCover title={"Forums"} page={"forums"}/>
            <div className="max-width mx-auto px-4 xl:px-0">
            <div className="w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 justify-between gap-8 my-10">
                {
                    blogs?.map(forum => <BlogCard key={forum._id} forumData={forum}/>)
                }
            </div>

            {/* Pagination Control  */}
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
        </div>
    );
};

export default Forums;