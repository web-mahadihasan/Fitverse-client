import { useQuery } from "@tanstack/react-query";
import useAuth from "../../../../hooks/useAuth";
import { useEffect, useState } from "react";
import useAxiosSecured from "../../../../hooks/useAxiosSecured";
import Loading from "../../../Loading/Loading";
import SectionBadge from "../../../../components/common/SectionBadge";
import SectionHeading from "../../../../components/common/SectionHeading";
import { ShinyButton } from "@/components/ui/shiny-button";
import { ArrowUpRightFromSquareIcon } from "lucide-react";
import { format } from "date-fns";

const BookedTrainer = () => {
    const {user} = useAuth()

    const axiosSecured = useAxiosSecured();
    const { data: myPayment, isLoading } = useQuery({
        queryKey: ["myPayment"],
        queryFn: async () => {
        const { data } = await axiosSecured.get(`/payment-api/my-payment/${user.email}`);
        return data;
        },
    });
    
    

    if(isLoading) return <Loading/>

    return (
        <div className="mx-auto p-4">
            <div className="text-center mt-5 mb-10 space-y-4">
                <SectionBadge title={"Activity Logs"}/>
                <SectionHeading
                    title={"User Activity Log and Engagement"}
                    subtitle={"Monitor and review user actions, from logins to updates, ensuring transparency and a comprehensive view of system engagement."}
                />
            </div>

            {/* Booked Data Card  */}
            <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
                {
                    myPayment.length > 0 ? myPayment?.map((item, idx) => (
                        <div key={idx}
                            className="bg-[#F2F4F5] dark:bg-gray-800 p-5 md:p-8 gap-[30px] md:gap-[15px] w-full rounded-md flex flex-col md:flex-row md:items-center md:justify-between">
                            <div className="flex-1">
                                <div className="my-2">
                                    <h3 className="text-2xl font-kanit font-medium text-secondary-black dark:text-main-dark">Trainer Info</h3>
                                    <p className="font-poppins flex items-center gap-2 text-gray-700 dark:text-gray-400 mt-2">
                                        <span>Name:</span>
                                        <span>{item?.trainerName}</span>
                                    </p>
                                    <p className="font-poppins mt-1 flex items-center gap-2 text-gray-700 dark:text-gray-400">
                                        <span>Email:</span>
                                        <span>{item?.trainerEmail}</span>
                                    </p>
                                </div>
                                <div className="">
                                    <h3 className="text-2xl font-kanit font-medium text-secondary-black dark:text-main-dark">Classes & Slot Info</h3>
                                    <p className="font-poppins flex items-center gap-2 text-gray-700 dark:text-gray-400 mt-2">
                                        <span>Slot Name:</span>
                                        <span>{item?.slotName}</span>
                                    </p>
                                    <p className="font-poppins mt-1 flex items-center gap-2 text-gray-700 dark:text-gray-400">
                                        <span>Selected Class:</span>
                                        <span>{item?.selectedClass}</span>
                                    </p>
                                    <p className="font-poppins flex mt-1 items-center gap-2 text-gray-700 dark:text-gray-400">
                                        <span>Class Duaration:</span>
                                        <span>{item?.classHour}</span>
                                    </p>
                                    
                                </div>
                            </div>
                            {/* Part two Payment */}
                            <div className="flex-1">
                                <div className="border-b-2 py-2 border-gray-300 dark:border-gray-600">
                                    <h3 className="text-2xl font-kanit font-medium text-secondary-black dark:text-main-dark">Payment Info</h3>
                                    <p className="font-poppins flex mt-1 items-center gap-2 text-gray-700 dark:text-gray-400">
                                            <span>Package Name:</span>
                                            <span>{item?.packageName}</span>
                                    </p>
                                    <p className="font-poppins flex mt-1 items-center gap-2 text-gray-700 dark:text-gray-400">
                                            <span>Package Price:</span>
                                            <span>$ {item?.packagePrice}</span>
                                    </p>
                                    <p className="font-poppins flex mt-1 items-center gap-2 text-gray-700 dark:text-gray-400 flex-wrap">
                                            <span>Payment ID:</span>
                                            <span>{item?.paymentId}</span>
                                    </p>
                                    <p className="font-poppins flex mt-1 items-center gap-2 text-gray-700 dark:text-gray-400">
                                            <span>Payment Date:</span>
                                            <span>{format(item?.paymentDate, "PP")}</span>
                                    </p>
                                </div>
                                <div className="my-2">
                                    <ShinyButton className={"mt-2 px-0 py-0 border-none border-main hover:bg-main  duration-300 transition-all ease-linear group"}>
                                        <button size="lg" className="flex items-center gap-1 py-2.5 border border-main px-6 rounded-lg text-main font-poppins tracking-wide group-hover:text-white">
                                            Write A Review <ArrowUpRightFromSquareIcon className="w-4 h-4 md:hidden lg:block" />
                                        </button>
                                    </ShinyButton>
                                </div>

                            </div>
                        </div>
                    ))  : <h3 className="text-center my-10 text-red-500 font-semibold font-kanit text-3xl col-span-2">No Trainer booked found 🥺</h3>
                }
                {/* <div
                    className="bg-[#F2F4F5] p-5 md:p-8 gap-[30px] md:gap-[15px] w-full rounded-md flex flex-col md:flex-row md:items-center md:justify-between">
                    <div className="w-full md:w-[55%]">
                        <span className="py-1.5 px-4 text-[0.8rem] rounded-md bg-blue-400 text-white">INTRODUCING</span>
                        <h3 className="text-[1.4rem] font-semibold text-gray-900 my-2">New Apple Homepod Mini</h3>
                        <p className="text-[0.9rem] text-gray-700 mb-4">Jam-packed with innovation, HomePod mini delivers
                            unexpectedly.</p>
                        <button
                            className="group w-max flex items-center gap-[10px] bg-[#FA8232] text-white py-2.5 rounded-md hover:bg-[#DE732D] transition-all duration-300 px-8 justify-center">
                            Shop now
                            <BsArrowRight className="group-hover:ml-1 transition-all duration-300"/>
                        </button>
                    </div>
                    <div className="w-[90%] mx-auto md:w-[40%]">
                        <img alt="product/image" src="https://i.ibb.co.com/jyffZqg/image-6.png"
                            className=""/>
                    </div>
                </div> */}
            </div>
        </div>
    );
};

export default BookedTrainer;