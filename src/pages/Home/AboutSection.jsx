import { MoveRight, PhoneCall } from "lucide-react";
import { Button } from "@/components/ui/button";
// import { Badge } from "@/components/ui/badge";
import { motion, useInView  } from "framer-motion";
import { useRef } from "react";
import ShortInfo from "../../components/common/ShortInfo";
import { Link } from "react-router";

const AboutSection = () => {
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true });
    
  return (
    <div className="w-full py-10 min-h-[450px]">
      <div className="w-full mx-auto">
        <div className="grid grid-cols-1 gap-8 items-center md:grid-cols-2 justify-between">
          <div className="flex gap-4 flex-col">
            <div>
              <motion.div  ref={ref}
                initial={{ opacity: 0, y: 20 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.8, ease: "easeInOut" }}
              >We&apos;re live!</motion.div>
            </div>
            <div className="flex gap-4 flex-col font-kanit">
              <motion.h1 ref={ref} className="text-[36px] font-kanit max-w-xl tracking-tighter text-left font-bold"
                initial={{ opacity: 0, y: 20 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{delay: 0.1, duration: 0.8, ease: "easeInOut" }}
              >
                Who We Are
              </motion.h1>
              <motion.p ref={ref} className="text-xl leading-relaxed tracking-tight text-muted-foreground max-w-xl text-left"
                initial={{ opacity: 0, y: 20 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{delay: 0.1, duration: 0.8, ease: "easeInOut" }}
              >
                At <span className="font-gagalin text-base tracking-wider font-normal px-2 text-main">FitVarse</span>, we are more than just a fitness center—we are a community committed to helping you unlock your full potential. With a passion for health and well-being, our mission is to inspire, guide, and support you on your journey to a healthier and happier life. From personalized training programs to expert nutritional advice, we provide all the tools you need to achieve your fitness goals.
              </motion.p>
            </div>
            <div className="flex items-center gap-4 justify-between max-w-xl flex-wrap">
                <ShortInfo title={"ENVIRONMENT"} info={"Clean and Airy"}/>
                <ShortInfo title={"CLASSES"} info={"Every Level"}/>
                <ShortInfo title={"PRICES"} info={"Affordable"}/>
            </div>
            <div className="flex flex-row gap-4">
              <Link to={"+8801794943980"} target="blank">
                <Button size="lg" className="gap-4" variant="outline">
                  Jump on a call <PhoneCall className="w-4 h-4" />
                </Button>
              </Link>
              <Link to={"/all-classes"}>
                <Button size="lg" className="gap-4">
                  Explorer Class <MoveRight className="w-4 h-4" />
                </Button>
              </Link>
            </div>
            
          </div>
          {/* aspect-square */}
          <div className="grid grid-cols-2 gap-8">
            <motion.div ref={ref} className="bg-muted rounded-md "
                initial={{ opacity: 0, y: -30 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.8, ease: "easeInOut" }}
            >
                <img className="h-full rounded" src="https://techfit-react.envytheme.com/_next/static/media/thumb-img.d4738168.jpg" alt="" />
            </motion.div>
            <motion.div ref={ref} className="bg-muted rounded-md row-span-2"
                initial={{ opacity: 0, x: 50 }}
                animate={isInView ? { opacity: 1, x: 0 } : {}}
                transition={{delay: 0.2, duration: 1, ease: "easeInOut" }}
            >
                <img className="h-full rounded" src="https://res.cloudinary.com/dev-empty/image/upload/v1715065743/ysuca3p72syocncnh85p.jpg" alt="" />
            </motion.div>
            <motion.div ref={ref} className="bg-muted rounded-md  h-full"
                initial={{ opacity: 0, y: 30 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{delay: 0.3, duration: 1, ease: "easeInOut" }}
            >
                <img className="h-full rounded" src="https://techfit-react.envytheme.com/_next/static/media/event-img1.d8ad8b31.jpg" alt="" />
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AboutSection;
