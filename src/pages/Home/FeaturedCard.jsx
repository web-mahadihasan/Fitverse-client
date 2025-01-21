import React from "react"
import { Dumbbell, Heart, Calendar, Apple, Users, Trophy } from "lucide-react"

const FeatureCard = ({ icon: Icon, title, description, className }) => (
  <div
    className={` relative p-6 py-7  group cursor-pointer backdrop-blur-xl  dark:bg-[rgba(40,40,40,0.70)] bg-gray-50 shadow-[2px_4px_16px_0px_rgba(248,248,248,0.06)_inset] transition-all duration-300 featured-shadow ${className}`}
  >
    <div className="absolute inset-0 opacity-0 transition-opacity duration-300 group-hover:opacity-5 bg-gradient-to-br from-[#FE8FB5] to-[#FFBE7B]"></div>
    <div className="flex flex-col items-center text-center">
      <div className="mb-4 p-3 bg-primary/10 rounded-full group-hover:scale-110 duration-300">
        <Icon className="w-8 h-8 text-main" />
      </div>
      <h3 className="text-[22px] font-bold mb-2 text-secondary-black dark:text-main-dark font-kanit ">{title}</h3>
      <p className="text-gray-600 dark:text-gray-300 px-2 font-poppins">{description}</p>
    </div>
  </div>
)

const FeaturedSection = () => {
  const features =[
    {
      "icon": Dumbbell,
      "title": "Personalized Workouts",
      "description": "Get custom fitness plans tailored to your goals and progress, ensuring lasting results and maximum effectiveness."
    },
    {
      "icon": Heart,
      "title": "Health Tracking",
      "description": "Track vitals, steps, sleep, and calories for a comprehensive view of your health journey and overall well-being."
    },
    {
      "icon": Calendar,
      "title": "Smart Scheduling",
      "description": "Plan workouts, sync with calendars, set reminders, and stay consistent effortlessly using smart scheduling tools."
    },
    {
      "icon": Apple,
      "title": "Nutrition Guidance",
      "description": "Enjoy meal plans, recipes, and expert advice customized to your dietary needs for optimal performance and health."
    },
    {
      "icon": Users,
      "title": "Community Support",
      "description": "Connect with a vibrant and supportive fitness community to share progress, find motivation, and stay inspired."
    },
    {
      "icon": Trophy,
      "title": "Goal Achievement",
      "description": "Set fitness goals, track milestones, earn exciting rewards, and celebrate your successes with detailed progress tracking."
    }
  ]
  
  
  

  return (
    <section className="[rgba(255,255,255,0.10)] dark:from-gray-900 dark:to-gray-800 ">
      <div className="max-width mx-auto">
        <h2 className="text-4xl font-medium  font-gagalin text-main text-center mb-7 tracking-wide dark:text-main-dark">Explore Our Fitness Features</h2>
        <p className="max-w-xl mx-auto text-center text-gray-600 font-poppins mb-12">
            From flexible workout options to premium amenities, explore the unique offerings that make our fitness center stand out. Join us and experience fitness at its finest.
        </p>
        {/* <div className="h-1.5 rounded-full w-24 mx-auto mb-10 bg-gradient-to-r from-[#5A29E4] to-[#9F72F9]"></div> */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3  border-b dark:divide-gray-600">
          {features.map((feature, index) => (
            <FeatureCard
              key={index}
              {...feature}
              className={`
                ${index < 3 ? "border-b" : ""}
                ${index % 3 !== 2 ? "border-r" : ""}
                border-gray-300 dark:border-gray-600
              `}
            />
          ))}
        </div>
        
      </div>
    </section>
  )
}

export default FeaturedSection

