import { SlArrowRight } from "react-icons/sl";
import { TbArrowBigRightLines } from "react-icons/tb";

const PageCover = ({title, page}) => {
    return (
        <div className="relative h-[320px] w-full bg-cover bg-center mt-3" style={{ backgroundImage: "url('https://maruthi.wpengine.com/wp-content/uploads/2014/01/portfolio1.jpg')" }}>
          {/* Overlay */}
          <div className="absolute inset-0 bg-black bg-opacity-60"></div>
    
          {/* Text Content */}
          <div className="relative z-10 flex flex-col items-center justify-center h-full text-center text-white">
            <h1 className="text-5xl font-bold mb-4 font-kanit">{title}</h1>
            <p className="text-lg font-medium mb-6 font-poppins  flex items-center gap-1">
                <span>Home</span>
                <TbArrowBigRightLines className="text-white"/>
                <span>{page}</span>
            </p>
          </div>
        </div>
      );
};

export default PageCover;