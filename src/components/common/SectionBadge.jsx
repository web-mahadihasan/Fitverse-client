import { HeroPill, StarIcon } from "@/components/ui/hero-pill"
import { ShinyButton } from "@/components/ui/shiny-button";

const SectionBadge = ({title}) => {
    return (
        <div className="text-center w-full mx-auto">
            <HeroPill className={"border w-fit rounded-full text-center mx-auto text-gray-200 opacity-70"}
                    icon={
                    <svg 
                        xmlns="http://www.w3.org/2000/svg" 
                        width="12" 
                        height="12" 
                        viewBox="0 0 24 24" 
                        className="fill-zinc-500"
                    >
                        <path d="M12 2L1 21h22L12 2z" />
                    </svg>
                    }
                    text={title}
                />
        </div>
    );
};

export default SectionBadge;

{/* <ShinyButton className={"p-[0px] px-4 rounded-full font-poppins text-sm"}>
                <HeroPill className={"border-none shadow-none py-0 px-0 m-0 outline-none"}
                    icon={
                    <svg 
                        xmlns="http://www.w3.org/2000/svg" 
                        width="12" 
                        height="12" 
                        viewBox="0 0 24 24" 
                        className="fill-zinc-500 border-none shadow-none px-0 py-0"
                    >
                        <path d="M12 2L1 21h22L12 2z" />
                    </svg>
                    }
                    text="About us"
                />
                </ShinyButton> */}