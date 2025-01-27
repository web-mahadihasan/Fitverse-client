import { useQuery } from "@tanstack/react-query";
import useAuth from "../../../../hooks/useAuth";
import { useEffect, useState } from "react";
import useAxiosSecured from "../../../../hooks/useAxiosSecured";
import SectionBadge from "../../../../components/common/SectionBadge";
import SectionHeading from "../../../../components/common/SectionHeading";
import { ShinyButton } from "@/components/ui/shiny-button";
import { ArrowUpRightFromSquareIcon } from "lucide-react";
import { format } from "date-fns";
import { RxCross1 } from "react-icons/rx";
import { FaStar } from "react-icons/fa6";
import fitnessLogo from "../../../../assets/icon/Fitness-log.png"
import useGetUser from "../../../../hooks/useGetUser";
import Swal from "sweetalert2";
import { Helmet } from "react-helmet";
import AnimatedLoader from "../../../Loading/Loading";

const BookedTrainer = () => {
    const {user} = useAuth()
    const [getUser] = useGetUser()
    const [modalOpen, setModalOpen] = useState(false)
    const axiosSecured = useAxiosSecured();
    const [rating, setRating] = useState(0);
    const [hover, setHover] = useState(null);

    const { data: myPayment, isLoading } = useQuery({
        queryKey: ["myPayment"],
        queryFn: async () => {
        const { data } = await axiosSecured.get(`/payment-api/my-payment/${user.email}`);
        return data;
        },
    });
    

    const handleReveiwSubmit = async (e) =>  {
        e.preventDefault()
        const form = e.target
        const feedback = form.feedback.value
 
        const review = {
            name: user?.displayName,
            email: user?.email,
            role: getUser?.role,
            date: new Date(),
            image: getUser?.image,
            rating,
            description: feedback
        }
        try {
            const {data} = await axiosSecured.post('/review-api/add-review', review)
            if(data.insertedId){
                Swal.fire({
                   title: "Successfull",
                   text: "Your review has been Successfull submited.",
                   icon: "success"
                 })
                 setRating(0)
                form.reset()
                setModalOpen(false)
            }
        } catch (error) {
            console.log(error)
        }

        
    }

    if(isLoading) return <AnimatedLoader/>

    return (
        <div className="mx-auto p-4">
            <Helmet>
                <title>Fitverse | Dashboard - Booked trainer </title>
                <meta name="Mahadi hasan" content="https://fitverse-bd.web.app/" />
            </Helmet>
            <div className="text-center mt-5 mb-10 space-y-4">
                <SectionBadge title={"Activity Logs"}/>
                <SectionHeading
                    title={"User Activity Log and Engagement"}
                    subtitle={"Monitor and review user actions, from logins to updates, ensuring transparency and a comprehensive view of system engagement."}
                />
            </div>

            {/* Booked Data Card  */}
            <div className="grid grid-cols-1 gap-6 max-w-5xl mx-auto">
                {
                    myPayment.length > 0 ? myPayment?.map((item, idx) => (
                        <div key={idx}
                            className="bg-[#F2F4F5] dark:bg-gray-800 p-5 md:p-8 gap-[30px] md:gap-[15px] w-full rounded-md flex flex-col md:flex-row md:items-center md:justify-between">
                            <div className="flex-1 sm:flex flex-row sm:justify-between lg:flex-col gap-4 flex-wrap">
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
                                    <ShinyButton onClick={() => setModalOpen(true)} className={"mt-2 px-0 py-0 border-none border-main hover:bg-main  duration-300 transition-all ease-linear group"}>
                                        <button size="lg" className="flex items-center gap-1 py-2.5 border border-main px-6 rounded-lg text-main font-poppins dark:text-white tracking-wide group-hover:text-white">
                                            Write A Review <ArrowUpRightFromSquareIcon className="w-4 h-4 md:hidden lg:block" />
                                        </button>
                                    </ShinyButton>
                                </div>

                            </div>
                        </div>
                    ))  : <h3 className="text-center my-10 text-red-500 font-semibold font-kanit text-3xl col-span-2">No Trainer booked found 🥺</h3>
                }
                
            </div>

            {/* Modal for review  */}
            <div>
            {/* Modal  */}
            <div
                className={`${
                modalOpen ? " scale-[1] opacity-100" : " scale-[0] opacity-0"
                } w-full h-screen fixed font-poppins top-0 left-0 z-50 bg-[#0000002a] flex items-center justify-center transition-all duration-300 `}>
                <div className="w-[90%] md:max-w-xl bg-[#ffffff] rounded-lg p-4 ">
                <div className="w-full flex items-end justify-end">
                    <RxCross1
                    className="p-2 text-[2.5rem] hover:bg-[#e7e7e7] border border-primary/50 rounded-full transition-all duration-300 cursor-pointer"
                    onClick={() => setModalOpen(false)}
                    />
                </div>
                <div>
                    <div className="flex items-center justify-center gap-2">
                        <div className="relative">
                            <img src={fitnessLogo} alt="" className="h-9"/>
                        </div>
                        <span className="text-4xl font-gagalin tracking-wider font-medium bg-clip-text text-transparent bg-gradient-to-r from-[#5A29E4] to-[#9F72F9]">
                            FitVerse
                        </span>
                    </div>
                    {/* Content  */}
                    <form onSubmit={handleReveiwSubmit}>
                    <div className="max-w-lg mx-auto my-8">
                        <h3 className="mb-4 text-[24px] font-semibold text-[#333333] text-center">Your Trainer Experience</h3>
                        <p className="text-base font-normal text-light-black text-center">
                            Please rate your review below
                        </p>

                        <div
                            className="flex items-center sm:flex-row flex-col sm:space-x-12 w-full my-[20px] justify-center">
                            <div className="flex items-center space-x-4 justify-center mb-[10px]">
                                {[...Array(5)].map((_, index) => {
                                    const starRating = index + 1;
                                    return (
                                        <FaStar
                                            key={starRating}
                                            className={`cursor-pointer ${
                                                starRating <= (hover || rating) ? "text-yellow-400" : "text-gray-300"
                                            }`}
                                            size={26}
                                            onClick={() => setRating(starRating)}
                                            onMouseEnter={() => setHover(starRating)}
                                            onMouseLeave={() => setHover(null)}
                                        />
                                    );
                                })}
                            </div>
                            <span className="text-lg font-medium text-light-black">{hover ? hover : rating }/5 stars</span>
                        </div>
                        {/* User name */}
                        <div className="my-4">
                            <label className="block text-[13px] mb-1 font-rubik font-medium text-[#5d5b58]">
                            Your Name
                            </label>
                            <input id="name" type="text" name="name" required readOnly value={user?.displayName}
                            className="w-full h-10 px-4 text-base transition-all border rounded outline-none focus-visible:outline-none peer border-slate-200 text-slate-500 autofill:bg-white focus:border-primary-light focus:outline-none bg-white bg-opacity-90" />
                        </div>
                        {/* User Email */}
                        <div className="my-4">
                            <label className="block text-[13px] mb-1 font-rubik font-medium text-[#5d5b58]">
                            Your Email
                            </label>
                            <input id="name" type="text" name="name" required readOnly value={user?.email}
                            className="w-full h-10 px-4 text-base transition-all border rounded outline-none focus-visible:outline-none peer border-slate-200 text-slate-500 autofill:bg-white focus:border-primary-light focus:outline-none bg-white bg-opacity-90" />
                        </div>
                        

                        <label className="text-gray-500 ">Your feedback</label>
                        <textarea name="feedback" placeholder="My feedback!!"
                            className="w-full border-gray-400 bg-white font-medium text-base text-light-black resize-none outline-none focus:border-primary border rounded-md p-2 min-h-[100px]">
                        </textarea>
                        <button type="submit" className="font-poppins w-full my-2 bg-gradient-to-r from-[#5A29E4] to-[#9F72F9] hover:bg-transparent px-6 py-2 rounded-md border border-main-light relative overflow-hidden before:absolute before:inset-0 before:translate-x-full hover:before:translate-x-0 before:transition-transform before:duration-300 before:bg-gradient-to-r before:from-indigo-500 before:via-purple-500 before:to-pink-500  before:z-[-1] text-white z-10" >
                            Submit Review
                        </button>
                    </div>
                    </form>
                    </div>
                </div>
                </div>
            </div>
        </div>
    );
};

export default BookedTrainer;