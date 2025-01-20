
import { Icon } from "@iconify/react/dist/iconify.js";
import { useQuery } from "@tanstack/react-query";
import React, {useState} from "react";

// react icons
import {MdOutlineDone} from "react-icons/md";
import {RxCross1} from "react-icons/rx";
import { useLoaderData } from "react-router";

const PricingSection = ({setPackagePrice}) => {

    const [toggle, setToggle] = useState(false)
    const [selected, setSelected] = useState("")
    const pricingInfo = useLoaderData()
    
    const handleAnnualPrice = () => {
        setToggle(!toggle)
    }
    const handleSelectPackage = (packageName, price) => {
        setSelected(packageName)
        const finalPrice = toggle ? price * 10 : price;
        const packageInfo = {
            name: packageName,
            price: finalPrice
        }
        setPackagePrice(packageInfo); 
    }
    return (
        <section className="">
        <div className="w-full rounded-xl py-[20px] px-6">
            <h1 className="text-[30px] font-[500] leading-[40px] text-center">The Right Plan for Your Business</h1>
            <p className="text-[18px] font-[400] text-gray-400 w-full sm:w-[50%] text-center mx-auto mt-2">We have
                several powerful plans to showcase your business and get discovered
                as a creative entrepreneurs. Everything you need.</p>

            <div className="w-full flex-col sm:flex-row flex items-center justify-center mt-8 gap-[20px]">
                <p className="text-[1rem] font-[600] text-gray-800">Bill Monthly</p>
                <div
                    className={`${
                        toggle ? " bg-[#3B9DF8]" : "bg-[#f0f0f0]"
                    } w-[57px] h-[30px] px-[0.150rem] py-[0.160rem] cursor-pointer border transition-colors duration-500 border-[#e5eaf2]  rounded-full relative`}
                    onClick={handleAnnualPrice}
                >
                    <div
                        className={`${
                            toggle ? " translate-x-[27px]" : "translate-x-[0px]"
                        } w-[23px] h-[23px] pb-1 transition-all duration-500 rounded-full bg-[#fff]`}
                        style={{boxShadow: "1px 2px 5px 2px rgb(0,0,0,0.1)"}}
                    ></div>
                </div>
                <p className="text-[1rem] font-[400] text-gray-800">Bill Annualy</p>
            </div>

            {/*  pricing cards  */}
            <div
                className="grid grid-cols-3 md:grid-cols-2 lg:grid-cols-3 items-center  py-[30px] gap-[30px] justify-center rounded-xl mt-10">
                    {/* Card one  */}
                {
                    pricingInfo?.map((packageItem, idx) => (
                        <div key={idx}
                    className={`w-full flex flex-col max-w-[400px] justify-between h-full toastshadow rounded-xl p-[20px] shadow-[2px_4px_16px_0px_rgba(248,248,248,0.06)_inset] border-2 ${idx === 1 ? "bg-gray-800 relative dark:bg-[rgba(40,40,40,0.70)] bottom-[30px]": "dark:bg-slate-800 bg-gray-100"} ${selected === packageItem.packageTitle ? `${idx === 1 ? "border-pink-500" : "border-main/65"} ` : `${idx === 1 ? "border-gray-800" :"border-gray-200"} `}`}>
                    <div>

                        <h3 className={`text-[1.5rem] font-[600] my-6 ${idx === 1 ? " text-gray-200" : "text-primary-black dark:text-main-dark"}`}>{packageItem.packageTitle}</h3>

                        <div className="flex flex-col gap-[10px] mt-5">
                            {
                                packageItem?.features.map((feature, index) => (
                                    <p key={index} className={`text-[1rem] flex items-center gap-[10px] ${!feature?.accessible? `${idx === 1 ? "text-gray-600" : "text-gray-500"} `: `${idx === 1 ? "text-gray-200" : "text-gray-800 dark:text-gray-300"}`}`}>
                                        <span className={`${feature?.accessible ? `${idx === 1 ? "text-gray-300" : "text-gray-700 dark:text-gray-400"} ` : `${idx === 1 ? "text-gray-700 dark:text-gray-700": "text-gray-400 dark:text-gray-600"} `}`}><Icon icon="ri:checkbox-circle-fill" width="22" height="22" /></span>
                                       {feature.feature}
                                    </p>
                                ))
                            }
                            
                        </div>
                    </div>

                    <div className="mt-8">
                        <div className="flex items-end gap-[8px]">
                            <h3 className={`text-[1.8rem] font-[800] ${idx === 1 && "text-gray-300"}`}>
                            $ {toggle
                                ? packageItem.price * 10
                                : packageItem.price}
                            </h3>
                            <span className="text-[1rem] text-gray-400 mb-2">/{toggle? "Yearly" : "Monthly"}</span>
                        </div>
                        
                        {
                            idx === 1 ? <button onClick={() => handleSelectPackage(packageItem.packageTitle, packageItem.price)} className="w-full font-poppins bg-gradient-to-r from-[#5A29E4] to-[#9F72F9] hover:bg-transparent px-6 py-2 rounded-md border border-main-light relative overflow-hidden before:absolute before:inset-0 before:translate-x-full hover:before:translate-x-0 before:transition-transform before:duration-300 before:bg-gradient-to-r before:from-indigo-500 before:via-purple-500 before:to-pink-500  before:z-[-1] text-white z-10" >
                            Choose {packageItem.packageTitle}
                        </button> : <button onClick={() => handleSelectPackage(packageItem.packageTitle, packageItem.price)}
                            className="py-[12px] px-4 w-full bg-[#ece5f9] text-main font-poppins hover:bg-[#ddcef9] duration-300 font-medium rounded-md mt-3"> Choose {packageItem.packageTitle}
                        </button>
                        }
                        
                    </div>
                </div>
                    ))
                }

                {/* <div
                    className={`w-full flex flex-col max-w-[400px] justify-between h-full bg-gray-100 toastshadow rounded-xl p-[20px] dark:bg-slate-600 border-2 ${selected === "basic" && "border-main/65"}`}>
                    <div>

                        <h3 className="text-[1.5rem] font-[600] mt-3">Basic Membership</h3>

                        <div className="flex flex-col gap-[10px] mt-5">
                            {
                                pricingInfo[0]?.features.map((feature, idx) => (
                                    <p key={idx} className={`text-[1rem] flex items-center gap-[10px] ${!feature?.accessible? "text-gray-400": "text-gray-800"}`}>
                                        <span className={`${feature?.accessible ? "text-gray-700" : "text-gray-400"}`}><Icon icon="ri:checkbox-circle-fill" width="22" height="22" /></span>
                                       {feature.feature}
                                    </p>
                                ))
                            }
                            
                        </div>
                    </div>

                    <div className="mt-8">
                        <div className="flex items-end gap-[8px]">
                            <h3 className="text-[1.8rem] font-[800]">{packagePrice + 20}</h3>
                            <span className="text-[1rem] text-gray-400 mb-2">/{toggle? "Yearly" : "Monthly"}</span>
                        </div>

                        <button onClick={() => handleSelectPackage("basic")}
                            className="py-[12px] px-4 w-full bg-[#ece5f9] text-main font-poppins hover:bg-[#ddcef9] duration-300 font-medium rounded-md mt-3">Choose Basic
                        </button>
                    </div>
                </div> */}

                        {/* Card 2  */}
                {/* <div
                    className={`w-full flex flex-col max-w-[400px] justify-between h-full bg-gray-800  rounded-xl p-[25px] sm:mb-[70px] border-2 ${selected === "standard" ? "border-pink-500 shadow-md": "border-gray-800"}`}>
                    <div className="">

                        <div className="flex items-center justify-between w-full">
                            <h3 className="text-[1.5rem] font-[600] mt-3 text-white">Standard Membership</h3>
                            <span className="rounded-md px-4 py-[5px] bg-[#f8f4ff] text-[#8645FF] text-[0.8rem]"> Save $40 </span>
                        </div>

                        <div className="flex  flex-col gap-[10px] mt-5">
                            {
                                pricingInfo[1]?.features.map((feature, idx) => (
                                    <p key={idx} className={`text-[1rem] text-gray-200 flex items-center gap-[10px] ${!feature?.accessible? "text-gray-400": ""}`}>
                                        <span className={`${feature?.accessible ? "text-gray-200" : "text-gray-600"}`}><Icon icon="ri:checkbox-circle-fill" width="22" height="22" /></span>
                                       {feature.feature}
                                    </p>
                                ))
                            }
                           
                        </div>
                    </div>

                    <div className="mt-8">
                        <div className="flex items-end gap-[8px]">
                            <h3 className="text-[1.8rem] font-[800] text-white">{packagePrice + 100}</h3>
                            <span className="text-[1rem] text-gray-300 mb-2">/{toggle? "Yearly" : "Monthly"}</span>
                        </div>

                        <button onClick={() => handleSelectPackage("standard")} className="w-full font-poppins bg-gradient-to-r from-[#5A29E4] to-[#9F72F9] hover:bg-transparent px-6 py-2 rounded-md border border-main-light relative overflow-hidden before:absolute before:inset-0 before:translate-x-full hover:before:translate-x-0 before:transition-transform before:duration-300 before:bg-gradient-to-r before:from-indigo-500 before:via-purple-500 before:to-pink-500  before:z-[-1] text-white z-10" >
                            Choose Standard
                        </button>
                    </div>
                </div> */}


                        {/* Card 3 */}
                {/* <div
                    className={`w-full flex flex-col max-w-[400px] justify-between h-full bg-gray-100 toastshadow rounded-xl p-[20px] dark:bg-slate-600 border-2 ${selected == "premium" && "border-main/65"}`}>
                    <div>

                        <h3 className="text-[1.5rem] font-[600] mt-3">Premium Membership</h3>

                        <div className="flex flex-col gap-[10px] mt-5">
                            {
                                pricingInfo[2]?.features.map((feature, idx) => (
                                    <p key={idx} className={`text-[1rem] flex items-center gap-[10px] ${!feature?.accessible? "text-gray-400": "text-gray-800"}`}>
                                        <span className={`${feature?.accessible ? "text-gray-700" : "text-gray-400"}`}><Icon icon="ri:checkbox-circle-fill" width="22" height="22" /></span>
                                       {feature.feature}
                                    </p>
                                ))
                            }
                            
                        </div>
                    </div>

                    <div className="mt-8">
                        <div className="flex items-end gap-[8px]">
                            <h3 className="text-[1.8rem] font-[800]">{packagePrice + 220}</h3>
                            <span className="text-[1rem] text-gray-400 mb-2">/{toggle? "Yearly" : "Monthly"}</span>
                        </div>

                        <button onClick={() => handleSelectPackage("premium")}
                            className="py-[12px] px-4 w-full bg-[#ece5f9] text-main font-poppins hover:bg-[#ddcef9] duration-300 font-medium rounded-md mt-3">Choose Premium
                        </button>
                    </div>
                </div> */}
            </div>
        </div>
        
        </section>
    );
};

export default PricingSection;
                    