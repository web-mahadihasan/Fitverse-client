
import React from "react";

// react icons
import {FaXTwitter} from "react-icons/fa6";
import {ImFacebook2} from "react-icons/im";
import {FaDribbble} from "react-icons/fa";

const TeamSection = ({team}) => {

    return (
        <div
            className="w-[80%] mx-auto rounded-md relative group overflow-hidden cursor-pointer">

            {/*  image  */}
            <img
                src={team?.image}
                alt="animated_cards" className="w-full h-[350px] object-cover"/>

            {/*  texts  */}
            <div
                className="flex flex-col items-center justify-center backdrop-blur-md text-white absolute bottom-0 w-full pt-[10px] pb-[20px] translate-y-[0px] transition-all duration-[400ms] overflow-hidden">
                    {/* <p>name</p> */}
                <h3 className="text-[1.7rem] translate-y-[0px] transition-all duration-700 font-bold tracking-[2px] leading-[30px] opacity-100">{team?.name}</h3>
                <p className="text-[1rem] translate-y-[0px]  transition-all duration-500 opacity-100">{team?.title}</p>

                {/*  socials icons  */}
                <div className="flex items-center gap-[20px] mt-[15px]">
                    <div
                        className="translate-y-[100px] group-hover:translate-y-0 transition-all duration-500 opacity-0 group-hover:opacity-100">
                        <ImFacebook2
                            className="text-[1.3rem] text-white cursor-pointer hover:scale-[1.3] transition-all duration-200"/>
                    </div>
                    <div
                        className="translate-y-[100px] group-hover:translate-y-0 transition-all duration-[800ms] opacity-0 group-hover:opacity-100">
                        <FaXTwitter
                            className="text-[1.3rem] text-white cursor-pointer hover:scale-[1.3] transition-all duration-200"/>
                    </div>
                    <div
                        className="translate-y-[100px] group-hover:translate-y-0 transition-all duration-[1100ms] opacity-0 group-hover:opacity-100">
                        <FaDribbble
                            className="text-[1.3rem] text-white cursor-pointer hover:scale-[1.3] transition-all duration-200"/>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default TeamSection;
              