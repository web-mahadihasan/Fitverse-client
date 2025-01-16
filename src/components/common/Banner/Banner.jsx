import { Meteors } from "@/components/ui/meteors";

const Banner = () => {
  return (
    <div className="max-w-7xl mx-auto px-4 xl:px-0">
        <div className="relative flex h-screen w-full flex-col items-center justify-center overflow-hidden rounded-lg bg-background z-40">
            <Meteors number={30} />
              <svg
                aria-hidden="true"
                className="pointer-events-none h-full w-full fill-neutral-400/80 [mask-image:radial-gradient(800px_circle_at_center,white,transparent)] absolute inset-0 opacity-50 bg-[#1d4ed8]/20"
            >
                <defs>
                <pattern
                    id=":r0:"
                    width="16"
                    height="16"
                    patternUnits="userSpaceOnUse"
                    patternContentUnits="userSpaceOnUse"
                    x="0"
                    y="0"
                >
                    <circle id="pattern-circle" cx="1" cy="1" r="1"></circle>
                </pattern>
                </defs>
                <rect
                width="100%"
                height="100%"
                strokeWidth="0"
                fill="url(#:r0:)"
                ></rect>
            </svg>
            {/* content  */}
        
            {/* content  */}
        </div>
      
    </div>
  );
};

export default Banner;



{/* <div className="relative w-full h-full overflow-hidden z-20">
            <div className="w-full h-full bg-gray-200" >
                <img
                src="https://zele.bold-themes.com/slant/wp-content/uploads/sites/3/2021/06/image_03_team.png" // Replace with your image path
                alt="Clipped Shape"
                className="w-full h-full object-cover"
                style={{
                    clipPath: "polygon(36% 0, 100% 0%, 100% 98%, 0% 100%)",
                }}
                />
            </div>
        </div> */}