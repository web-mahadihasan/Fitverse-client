import { useRef } from "react";
import { delay, motion, useInView  } from "framer-motion";


const SectionHeading = ({title, subtitle}) => {
    const sectionHeadingRef = useRef(null);
    const isInView = useInView(sectionHeadingRef, { once: true });

    return (
        <div>
            <motion.h2 ref={sectionHeadingRef} className="text-4xl text-center font-bold  font-kanit capitalize text-secondary-black  mb-7 tracking-wide dark:text-main-dark"
                 initial={{ opacity: 0, y: -30 }}
                 animate={isInView ? { opacity: 1, y: 0 } : {}}
                 transition={{delay: 0.1, duration: 0.8, ease: "easeInOut" }}
            >{title}</motion.h2>
            <motion.p ref={sectionHeadingRef} className="max-w-xl text-center text-gray-600 font-poppins mb-3 mx-auto"
                 initial={{ opacity: 0, y: 30 }}
                 animate={isInView ? { opacity: 1, y: 0 } : {}}
                 transition={{delay: 0.2, duration: 0.8, ease: "easeInOut" }}
            >
                {subtitle}
            </motion.p>
        </div>
    );
};

export default SectionHeading;