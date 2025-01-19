
import React, {useState} from "react";

// react icons
import {MdOutlineDone} from "react-icons/md";
import {RxCross1} from "react-icons/rx";

const PricingSection = () => {

    const [toggle, setToggle] = useState(false)

    return (
        <section className="">
        <div className="w-full rounded-xl p-[20px]">
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
                    onClick={() => setToggle(!toggle)}
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
                className="flex items-center flex-wrap  py-[30px] gap-[30px] justify-center rounded-xl mt-10">
                    {/* Card one  */}
                <div
                    className="w-full flex flex-col max-w-[280px] justify-between h-full bg-gray-100 toastshadow rounded-xl p-[20px] dark:bg-slate-600">
                    <div>

                        <h3 className="text-[1.5rem] font-[600] mt-3">Base</h3>

                        <div className="flex flex-col gap-[10px] mt-5">
                            <p className="text-[1rem] text-gray-500 flex items-center gap-[10px]">
                                <MdOutlineDone
                                    className="text-[1.5rem] p-1 rounded-full text-gray-800"/>
                                Upload Video with HD
                                Resolution
                            </p>
                            <p className="text-[1rem] text-gray-500 flex items-center gap-[10px]">
                                <MdOutlineDone
                                    className="text-[1.5rem] p-1 rounded-full text-gray-800"/>
                                Attachment & Post Scheduling
                            </p>
                            <p className="text-[1rem] text-gray-300 flex items-center gap-[10px]">
                                <RxCross1
                                    className="text-[1.5rem] p-1 rounded-full text-gray-300"/>
                                Set your rates
                            </p>
                            <p className="text-[1rem] text-gray-300 flex items-center gap-[10px]">
                                <RxCross1
                                    className="text-[1.5rem] p-1 rounded-full text-gray-300"/>
                                Exclusive Deals
                            </p>
                            <p className="text-[1rem] text-gray-300 flex items-center gap-[10px]">
                                <RxCross1
                                    className="text-[1.5rem] p-1 rounded-full text-gray-300"/>
                                Advanced Statistics
                            </p>
                        </div>
                    </div>

                    <div className="mt-8">
                        <div className="flex items-end gap-[8px]">
                            <h3 className="text-[1.8rem] font-[800]">$19</h3>
                            <span className="text-[1rem] text-gray-400 mb-2">/month</span>
                        </div>

                        <button
                            className="py-[14px] px-4 w-full bg-[#f8f4ff] text-[#8645FF] rounded-md mt-3">Choose
                        </button>
                    </div>
                </div>

                        {/* Card 2  */}
                <div
                    className="w-full flex flex-col max-w-[280px] justify-between h-full bg-gray-800  rounded-xl p-[25px] sm:mb-[70px] ">
                    <div className="">

                        <div className="flex items-center justify-between w-full">
                            <h3 className="text-[1.5rem] font-[600] mt-3 text-white">Pro</h3>
                            <span
                                className="rounded-md px-4 py-[5px] bg-[#f8f4ff] text-[#8645FF] text-[0.8rem]">
                                                    Save $40
                                                </span>
                        </div>

                        <div className="flex flex-col gap-[10px] mt-5">
                            <p className="text-[1rem] text-gray-200 flex items-center gap-[10px]">
                                <MdOutlineDone
                                    className="text-[1.5rem] p-1 rounded-full text-gray-200"/>
                                Upload Video with HD
                                Resolution
                            </p>
                            <p className="text-[1rem] text-gray-200 flex items-center gap-[10px]">
                                <MdOutlineDone
                                    className="text-[1.5rem] p-1 rounded-full text-gray-200"/>
                                Attachment & Post Scheduling
                            </p>
                            <p className="text-[1rem] text-gray-200 flex items-center gap-[10px]">
                                <MdOutlineDone
                                    className="text-[1.5rem] p-1 rounded-full text-gray-200"/>
                                Set your rates
                            </p>
                            <p className="text-[1rem] text-gray-200 flex items-center gap-[10px]">
                                <MdOutlineDone
                                    className="text-[1.5rem] p-1 rounded-full text-gray-200"/>
                                Exclusive Deals
                            </p>
                            <p className="text-[1rem] text-gray-500 flex items-center gap-[10px]">
                                <RxCross1
                                    className="text-[1.5rem] p-1 rounded-full text-gray-500"/>
                                Advanced Statistics
                            </p>
                        </div>
                    </div>

                    <div className="mt-8">
                        <div className="flex items-end gap-[8px]">
                            <h3 className="text-[1.8rem] font-[800] text-white">$123</h3>
                            <span className="text-[1rem] text-gray-300 mb-2">/month</span>
                        </div>

                        <button
                            className="py-[14px] px-4 w-full bg-[#8645FF] text-white rounded-md mt-3">Choose
                        </button>
                    </div>
                </div>


                        {/* Card 3 */}
                <div
                    className="w-full flex flex-col max-w-[280px] justify-between h-full bg-gray-100 toastshadow rounded-xl p-[20px] dark:bg-slate-600">
                    <div>

                        <h3 className="text-[1.5rem] font-[600] mt-3">Enterprise</h3>

                        <div className="flex flex-col gap-[10px] mt-5">
                            <p className="text-[1rem] text-gray-500 flex items-center gap-[10px]">
                                <MdOutlineDone
                                    className="text-[1.5rem] p-1 rounded-full text-gray-800"/>
                                Upload Video with HD
                                Resolution
                            </p>
                            <p className="text-[1rem] text-gray-500 flex items-center gap-[10px]">
                                <MdOutlineDone
                                    className="text-[1.5rem] p-1 rounded-full text-gray-800"/>
                                Attachment & Post Scheduling
                            </p>
                            <p className="text-[1rem] text-gray-800 flex items-center gap-[10px]">
                                <MdOutlineDone
                                    className="text-[1.5rem] p-1 rounded-full text-gray-800"/>
                                Set your rates
                            </p>
                            <p className="text-[1rem] text-gray-800 flex items-center gap-[10px]">
                                <MdOutlineDone
                                    className="text-[1.5rem] p-1 rounded-full text-gray-800"/>
                                Exclusive Deals
                            </p>
                            <p className="text-[1rem] text-gray-800 flex items-center gap-[10px]">
                                <MdOutlineDone
                                    className="text-[1.5rem] p-1 rounded-full text-gray-800"/>
                                Advanced Statistics
                            </p>
                        </div>
                    </div>

                    <div className="mt-8">
                        <div className="flex items-end gap-[8px]">
                            <h3 className="text-[1.8rem] font-[800]">$189</h3>
                            <span className="text-[1rem] text-gray-400 mb-2">/month</span>
                        </div>

                        <button
                            className="py-[14px] px-4 w-full bg-[#f8f4ff] text-[#8645FF] rounded-md mt-3">Choose
                        </button>
                    </div>
                </div>
            </div>
        </div>
        </section>
    );
};

export default PricingSection;
                    