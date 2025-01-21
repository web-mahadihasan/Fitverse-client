import { HoverEffect } from "@/components/ui/hover-effect"
import { BsThreeDotsVertical } from "react-icons/bs";
import { RiTeamFill } from "react-icons/ri";
import { AnimatedCard } from "@/components/ui/feature-block-animated-card"
import { cn } from "@/lib/utils"
import useAxiosPublic from "../../hooks/useAxiosPublic";
import { useQuery } from "@tanstack/react-query";

const AllTrainers = () => {
  const axiosPublic = useAxiosPublic()
      
  const {data: trainerList, isLoading} = useQuery({
    queryKey: ["trainerList"],
    queryFn: async () => {
      const {data} = await axiosPublic.get("/trainer-api/trainers")
      return data
    }
  })
  if(isLoading) return <p>loading...</p>
      return (
        <div>
          <section className="max-width mx-auto px-4 xl:px-0 my-24 grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
            {
              trainerList?.map(trainerData => <AnimatedCard key={trainerData._id} trainerData={trainerData}/>)
            }
            
          </section>
          
          <section className="max-w-7xl mx-auto px-4 xl:px-0 my-24">
          <HoverEffect items={trainerList} />
            
          </section>
          <div
      className="relative flex h-full w-full flex-col items-center justify-center overflow-hidden rounded-lg border bg-background md:shadow-xl"
      color={["#A07CFE", "#FE8FB5", "#FFBE7B"]}
    >
      
    </div>

        </div>
      )
  }

export default AllTrainers;