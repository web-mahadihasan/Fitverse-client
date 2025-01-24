import { animate, motion } from "framer-motion"
import React, { useEffect } from "react"
import { cn } from "@/lib/utils"
import { RiTeamFill } from "react-icons/ri"
import { BsThreeDotsVertical } from "react-icons/bs"
import { useQuery } from "@tanstack/react-query"
import useAxiosPublic from "../../hooks/useAxiosPublic"
import { BorderBeam } from "@/components/ui/border-beam";
import { Icon } from "@iconify/react/dist/iconify.js"
import { Link } from "react-router"
import { Button } from "@/components/ui/button"
import { Facebook, Instagram, Linkedin, Moon, Send, Sun, Twitter } from "lucide-react"


export function AnimatedCard({trainerData}) {
  const axiosPublic = useAxiosPublic()
  const {_id, name, image, age, email, experience} = trainerData || {}

  const {data:findSlot, isLoading} = useQuery({
    queryKey: ["slotForCard"],
    queryFn: async () => {
      const {data} = await axiosPublic.get(`/slot-api/slots/${email}`)
      return data
    },
    enabled: !!email
  })


  if(isLoading) return <p>Loading...</p>
  return (
    
    (<div className="relative flex w-full sm:w-[70%] md:w-full mx-auto flex-col items-center justify-center overflow-hidden rounded-xl border md:shadow-xl">
      <div
      className={cn(
        "w-full h-full flex flex-col  p-4 rounded-xl border border-[rgba(255,255,255,0.10)] dark:bg-[rgba(40,40,40,0.70)] bg-gray-100 shadow-[2px_4px_16px_0px_rgba(248,248,248,0.06)_inset] group")}>
      <div className="w-full flex items-center justify-between ">
        <div className="flex items-center gap-2">
          <RiTeamFill className="text-[2rem] p-2 rounded-full 
          bg-[#3b9df828] text-[#3B9DF8] cursor-pointer" />
          <div>
            <h3 className="font-poppins text-lg">{name}</h3>
            <p className="text-gray-500 font-poppins text-base">Trainer</p>
          </div>
        </div>
        <BsThreeDotsVertical className="text-[2rem] p-2 
        rounded-full bg-[#3b9df828] text-[#3B9DF8] cursor-pointer" />
      </div>
        {/* Image  */}
      <div className="h-[150px] w-[150px] overflow-hidden mx-auto rounded-full">
          <img src={image} alt="" className="h-[150px] w-[150px] mx-auto trainer-shadow rounded-full hover:scale-110 duration-300"/>
      </div>
      
      <div className="flex flex-col justify-between flex-1">
        <div className="flex items-center justify-between mt-3">
          <p className="flex items-center gap-1">
            <span className="text-main"><Icon icon="material-symbols-light:work-history-outline-rounded" width="20" height="20" /></span>
            <span className="font-poppins text-sm text-gray-700 dark:text-gray-400">Experience: {experience} Yr</span>
          </p>
          <p className="flex items-center gap-1">
            <span className="text-main"><Icon icon="material-symbols:data-usage" width="20" height="20" /></span>
            <span className="font-poppins text-sm text-gray-700 dark:text-gray-400">Age: {age} Yr</span>
          </p>
        </div>
        <h3 className="py-2">
          <span className="text-lg font-semibold text-gray-800 dark:text-white ">
            Available Slots:
          </span>
          <div className="flex items-center flex-wrap gap-2 mt-2">
            {
              findSlot && findSlot.map(slot => <Link key={slot._id}>
                <span className={`inline-flex items-center justify-center gap-1 rounded px-2 py-[3px] text-sm font-poppins text-main dark:text-gray-200 border border-emerald-500 dark:bg-emerald-500`}>{slot?.slotName}</span>
                {/* <p>{slot?.slotName}</p> */}
              </Link>)
            }
          </div>
        </h3>

        <div className="flex-1 flex items-center gap-2 my-2">
          <p className="text-base font-semibold text-gray-800 dark:text-white ">
            Follow him:
          </p>
          <Button variant="outline" size="icon" className="rounded-full">
            <Facebook className="h-4 w-4" />
            <span className="sr-only">Instagram</span>
          </Button>
          <Button variant="outline" size="icon" className="rounded-full">
            <Instagram className="h-4 w-4" />
            <span className="sr-only">Instagram</span>
          </Button>
          <Button variant="outline" size="icon" className="rounded-full">
            <Linkedin className="h-4 w-4" />
            <span className="sr-only">Instagram</span>
          </Button>
          <Button variant="outline" size="icon" className="rounded-full">
            <Twitter className="h-4 w-4" />
            <span className="sr-only">Instagram</span>
          </Button>
          
        </div>
        <div className="">
          <Link to={`/trainer-details/${_id}`}>
            <button className="font-poppins w-fit mx-auto px-6 bg-gradient-to-r from-[#5A29E4] to-[#9F72F9] hover:bg-transparent py-2 rounded-md border border-main-light relative overflow-hidden before:absolute before:inset-0 before:translate-x-full hover:before:translate-x-0 before:transition-transform before:duration-300 before:bg-gradient-to-r before:from-indigo-500 before:via-purple-500 before:to-pink-500  before:z-[-1] text-white z-10" >
                View More
            </button>
          </Link>
          
        </div>
      </div>
      
    </div>
      <BorderBeam size={250} duration={12} delay={9} />
    </div>
    )
  );
}

// function AnimatedIcons({
//   icons
// }) {
//   const scale = [1, 1.1, 1]
//   const transform = ["translateY(0px)", "translateY(-4px)", "translateY(0px)"]
  
//   const sequence = icons.map((_, index) => [
//     `.circle-${index + 1}`,
//     { scale, transform },
//     { duration: 0.8 },
//   ])

//   useEffect(() => {
//     animate(sequence, {
//       repeat: Infinity,
//       repeatDelay: 1,
//     })
//   }, [])

//   return (
//     (<div
//       className="p-8 overflow-hidden h-full relative flex items-center justify-center">
//       <div className="flex flex-row flex-shrink-0 justify-center items-center gap-2">
//         {icons.map((icon, index) => (
//           <Container
//             key={index}
//             className={cn(sizeMap[icon.size || "lg"], `circle-${index + 1}`, icon.className)}>
//             {icon.icon}
//           </Container>
//         ))}
//       </div>
//       <AnimatedSparkles />
//     </div>)
//   );
// }

// const Container = React.forwardRef(({ className, ...props }, ref) => (
//   <div
//     ref={ref}
//     className={cn(`rounded-full flex items-center justify-center bg-[rgba(248,248,248,0.01)]
//     shadow-[0px_0px_8px_0px_rgba(248,248,248,0.25)_inset,0px_32px_24px_-16px_rgba(0,0,0,0.40)]`, className)}
//     {...props} />
// ))
// Container.displayName = "Container"

// const AnimatedSparkles = () => (
//   <div
//     className="h-40 w-px absolute top-20 m-auto z-40 bg-gradient-to-b from-transparent via-cyan-500 to-transparent animate-move">
//     <div className="w-10 h-32 top-1/2 -translate-y-1/2 absolute -left-10">
//       <Sparkles />
//     </div>
//   </div>
// )

// const Sparkles = () => {
//   const randomMove = () => Math.random() * 2 - 1
//   const randomOpacity = () => Math.random()
//   const random = () => Math.random()

//   return (
//     (<div className="absolute inset-0">
//       {[...Array(12)].map((_, i) => (
//         <motion.span
//           key={`star-${i}`}
//           animate={{
//             top: `calc(${random() * 100}% + ${randomMove()}px)`,
//             left: `calc(${random() * 100}% + ${randomMove()}px)`,
//             opacity: randomOpacity(),
//             scale: [1, 1.2, 0],
//           }}
//           transition={{
//             duration: random() * 2 + 4,
//             repeat: Infinity,
//             ease: "linear",
//           }}
//           style={{
//             position: "absolute",
//             top: `${random() * 100}%`,
//             left: `${random() * 100}%`,
//             width: `2px`,
//             height: `2px`,
//             borderRadius: "50%",
//             zIndex: 1,
//           }}
//           className="inline-block bg-black dark:bg-white" />
//       ))}
//     </div>)
//   );
// }