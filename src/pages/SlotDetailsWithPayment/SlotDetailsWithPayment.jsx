
import React, {useState} from "react";

// react icons
import {MdDone} from "react-icons/md";
import {IoSearchOutline} from "react-icons/io5";
import {BsCashStack} from "react-icons/bs";
import {SlLocationPin} from "react-icons/sl";
import {HiOutlineUpload} from "react-icons/hi";

import { Badge } from 'antd';
import PricingSection from "./PricingSection";
import toast from "react-hot-toast";
import Step2Content from "./Step2Content";
import { useQuery } from "@tanstack/react-query";
import useAxiosSecured from "../../hooks/useAxiosSecured";
import { useNavigate, useParams } from "react-router";
import useAxiosPublic from "../../hooks/useAxiosPublic";
import Step3Content from "./Step3Content";
import useAdmin from "../../hooks/useAdmin";
import useTrainer from "../../hooks/useTrainer";
import { Helmet } from "react-helmet";
import AnimatedLoader from "../Loading/Loading";

const SlotDetailsWithPayment = () => {
    const [packagePrice, setPackagePrice] = useState({})
    const [selectedClass, setSelectedClass] = useState("")
    const navigate = useNavigate()
    const [isAdmin] = useAdmin()
    const [isTrainer] = useTrainer()

    const [step, setStep] = useState(1)
    const axiosSecured = useAxiosSecured()
    const axiosPublic = useAxiosPublic()
    const {id} = useParams()


    const {data: slotDetails, isLoading} = useQuery({
        queryKey: ["slotDetails"],
        queryFn: async() => {
            const {data} = await axiosSecured.get(`/slot-api/slots/id/${id}`)
            return data
        },
    })


    const handleNextStep = () => {
        
        if(!packagePrice.price){
            toast.error("Please choose a plan for next step")
            return
        }else if(step < 2) {
             return setStep(step + 1)
        }

        
        if(!selectedClass){
            toast.error("Please Select a class for next step")
            return
        }
        if(step < 3) {
            setStep(step + 1)
        }
        
    };
    const handlePrevStep = () => setStep(step - 1);

    const steps = [
        {
            id: 1,
            name: "Choose a Plan"
        },
        {
            id: 2,
            name: "Slot Details"
        },
        {
            id: 3,
            name: "Checkout Slot"
        },
    ]
    const handleContinuePayment = () => {
        const paymentInfo = {
            ...slotDetails,
            packagePrice: packagePrice.price,
            packageName: packagePrice.name,
            selectedClass
        }
        if(isAdmin){
            return toast.error("You're admin! Only user can booked slot")
        }
        if(isTrainer){
            return toast.error("You're already trainer! you can't booked any slot")
        }

        navigate(`/booked-slot/payment/${slotDetails._id}`, {state: {paymentInfo}})
    }
    if(isLoading) return <AnimatedLoader/>
    return (
        <div className="w-full font-poppins sm:w-[90%] max-w-7xl px-4 xl:px-0 my-24 mx-auto">
            <Helmet>
                <title>Fitverse | Booked Slot </title>
                <meta name="author" content="https://fitverse-bd.web.app/" />
            </Helmet>
            <div className="w-full sm:flex-row flex-col flex items-center gap-[20px] sm:gap-[10px]">
                {
                    steps?.map((stepItem, index) => (
                        <div key={index} className="flex items-center w-full gap-[10px]">
                            {
                                step <= stepItem.id && (
                                    <p className={`w-[30px] h-[30px] p-[20px] text-gray-500 flex items-center justify-center text-[1.2rem] rounded-full bg-gray-50`}>{stepItem?.id}</p>
                                )
                            }

                            {
                                step >= (stepItem.id + 1) && (
                                    <div
                                        className="p-[10px] h-[40px] w-[40px] rounded-full bg-blue-500 text-white flex items-center justify-center">
                                        <MdDone className="text-[3rem]"/>
                                    </div>
                                )
                            }

                            <p className={`${step > stepItem.id ? "text-blue-500" : "text-gray-600"} text-[0.9rem] font-[400] sm:w-[75%] min-w-fit`}>{stepItem?.name}</p>

                            {
                                index < steps?.length - 1 && (
                                    <div className={`${
                                        step >= (stepItem.id + 1) ? "bg-blue-500" : "bg-gray-300"
                                    } w-full h-[5px] rounded-full`}></div>
                                )
                            }
                        </div>
                    ))
                }
            </div>

            <form onSubmit={(e) => e.preventDefault()} className="mt-16 w-full">
                {
                    step === 1 && (
                        <>
                            <PricingSection setPackagePrice={setPackagePrice}/>
                        </>
                    )
                }

                {
                    step === 2 && (
                        <div>
                            <Step2Content slotInfo={slotDetails} setSelectedClass={setSelectedClass} selectedClass={selectedClass}/>
                        </div>
                       
                    )
                }

                {
                    step === 3 && (
                        <div>
                            <Step3Content slotInfo={slotDetails} selectedClass={selectedClass} packagePrice={packagePrice}/>
                        </div>
                        
                    )
                }

                {
                    step === 4 && (
                        <div className="flex items-center justify-center w-full flex-col">
                            <img src="https://i.ibb.co/LC1yhZG/Prize-cup-for-the-first-place-removebg-preview.png"
                                 alt="vector" className="w-[200px]"/>

                            <h1 className="text-[1.4rem] font-[600] mt-4">We"ve receive your application!</h1>
                            <p className="text-gray-500 text-[1rem] font-[400] mt-1">We will process it and reach out to you
                                in a days.</p>
                        </div>
                    )
                }

                <div className="w-full flex items-end justify-end mt-12">
                    <button disabled={step <= 1} type="button" onClick={handlePrevStep}
                            className={`${step <= 1 && "cursor-not-allowed"} text-[1rem] text-gray-500 px-6 py-2.5`}>Previous
                    </button>
                    
                    {
                        step === 3 ? <button disabled={step > 3} type="button" onClick={handleContinuePayment}
                        className={`${step > 3 && "!bg-blue-300 cursor-not-allowed"} bg-blue-500 py-2.5 px-6 rounded-md text-white`}>
                            {step > 2 ? "Continue Payment" : "Next"}
                        </button> : <button disabled={step > 3} type="button" onClick={handleNextStep}
                            className={`${step > 3 && "!bg-blue-300 cursor-not-allowed"} bg-blue-500 py-2.5 px-6 rounded-md text-white`}>
                            {step > 2 ? "Continue Payment" : "Next"}
                        </button>
                    }
                    
                   
                </div>
            </form>
        </div>
    );
};

export default SlotDetailsWithPayment;
                    