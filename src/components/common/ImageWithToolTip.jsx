import React, { useState } from "react";
import {
  motion,
  useTransform,
  AnimatePresence,
  useMotionValue,
  useSpring,
} from "framer-motion";
import { cn } from "@/lib/utils";
import { Link } from "react-router";

export const ImageWithToolTip = ({ items, title, className }) => {
  const [hoveredIndex, setHoveredIndex] = useState(null);
  const springConfig = { stiffness: 100, damping: 5 };
  const x = useMotionValue(0);
  const rotate = useSpring(
    useTransform(x, [-100, 100], [-45, 45]),
    springConfig
  );
  const translateX = useSpring(
    useTransform(x, [-100, 100], [-50, 50]),
    springConfig
  );
  const handleMouseMove = (event) => {
    const halfWidth = event.target.offsetWidth / 2;
    x.set(event.nativeEvent.offsetX - halfWidth);
  };

  return (
    <div className={cn("flex items-center gap-2", className)}>
      {items &&
        Array.from(
          new Map(
            items
              .filter((item) => item.classtitle.includes(title)) 
              .map((item) => [item.trainerId, item])
          ).values()
        ).slice(0, 5).map((item) => (
            <div
          className="-mr-4 relative group"
          key={item._id}
          onMouseEnter={() => setHoveredIndex(item.id)}
          onMouseLeave={() => setHoveredIndex(null)}
        >
          <AnimatePresence mode="popLayout">
            {hoveredIndex === item.id && (
              <motion.div
                initial={{ opacity: 0, y: 20, scale: 0.6 }}
                animate={{
                  opacity: 1,
                  y: 0,
                  scale: 1,
                  transition: {
                    type: "spring",
                    stiffness: 260,
                    damping: 10,
                  },
                }}
                exit={{ opacity: 0, y: 20, scale: 0.6 }}
                style={{
                  translateX: translateX,
                  rotate: rotate,
                  whiteSpace: "nowrap",
                }}
                className="absolute -top-16 -left-1/2 translate-x-1/2 flex text-xs flex-col items-center justify-center rounded-md bg-foreground z-50 shadow-xl px-2 py-2"
              >
                <div className="absolute inset-x-10 z-30 w-[20%] -bottom-px bg-gradient-to-r from-transparent via-emerald-500 to-transparent h-px" />
                <div className="absolute left-10 w-[40%] z-30 -bottom-px bg-gradient-to-r from-transparent via-sky-500 to-transparent h-px" />
                <div className="font-bold text-background relative z-30 text-base">
                  {item.name}
                </div>
                <div className=" text-gray-300 text-xs">
                  {item.role}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
          <Link to={`/trainer-details/${item.trainerId}`}>
            <img
                onMouseMove={handleMouseMove}
                height={100}
                width={100}
                src={item.image}
                alt={item.name}
                className="object-cover !m-0 !p-0 object-top rounded-full h-12 w-12 border-2  group-hover:scale-105 group-hover:z-30 border-main-light relative transition duration-500"
            />
          </Link>
        </div>
        
      ))}
    </div>
  );
};
