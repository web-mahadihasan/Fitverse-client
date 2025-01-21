
import React from "react";
import { FaRegUser } from "react-icons/fa6";
import {MdOutlineMail} from "react-icons/md";

const NewsLetterSection = () => {

    return (
        <section
            className="w-full rounded-xl py-[20px] sm:py-[40px] px-[40px] overflow-hidden sm:px-[80px] bg-gradient-to-br from-[#161819] to-[#5C26B5] relative">
            <div className="w-full lg:w-[70%]">
                <div className="w-full sm:w-[60%]">
                    <h1 className="text-[2rem] sm:text-[2.8rem] text-[#71ECD2] font-[400] leading-[45px]">Subscibe
                        to Our
                        Newsletter</h1>
                    <p className="text-[0.9rem] text-[#CBCBCB] mt-5">Get weekly update about our
                        product
                        on your email, no spam guaranteed we promise ✌️</p>
                </div>

                <div className="relative mt-12 mb-6">
                    <form >
                        <div className="flex md:items-center gap-6 mb-5 flex-wrap flex-col md:flex-row">
                            <div className="flex-1 relative">
                            <input className="py-3 pr-4 pl-12 flex-1 w-full outline-none rounded-md"
                                placeholder="Your Name"/>
                                <FaRegUser className="p-1.5 bg-[#F8F8F8] text-[#6C777C] text-[2rem] absolute top-[50%] left-2 transform translate-y-[-50%]"/>
                            </div>
                            <div className="flex-1 relative">
                                <input className="py-3 pr-4 pl-12 w-full outline-none rounded-md"
                                placeholder="Email Address"/>
                                <MdOutlineMail className="p-1.5 bg-[#F8F8F8] text-[#6C777C] text-[2rem] absolute top-[50%] left-2 transform translate-y-[-50%]"/>
                            </div>
                        </div>
                        {/* <MdOutlineMail
                            className="p-1.5 bg-[#F8F8F8] text-[#6C777C] text-[2rem] absolute top-[50%] left-2 transform translate-y-[-50%]"/> */}

                        <button type="submit" className="md:absolute md:bottom-[-20px] md:right-[-20px] bg-[#825FF1] hover:bg-[#7755e8] text-white py-3 px-8 rounded">subscribe</button>
                    </form>
                </div>
            </div>

            <MdOutlineMail
                className="text-[30rem] absolute top-[-100px] right-[-100px] text-white opacity-10 rotate-[-30deg]"/>
        </section>
    );
};

export default NewsLetterSection;
                    