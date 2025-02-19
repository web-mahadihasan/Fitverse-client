import "react-responsive-carousel/lib/styles/carousel.min.css"; 
import { Carousel } from "react-responsive-carousel";
import {motion} from "framer-motion"

const img2 = "https://i.ibb.co.com/mqBHtDj/image-10.png";
const arr = [1, 2, 3, 4, 5]
const images = [
  "https://i.ibb.co.com/mqBHtDj/image-10.png",
  "https://i.ibb.co.com/0h83rdY/background-03.jpg",
  "https://i.ibb.co.com/2Yfx8F3/the-best-gym-cardio-workouts-blogheader-notitle.jpg",
  "https://i.ibb.co.com/GpGVT7j/gym-workout-66d087d56ef90.jpg",
  "https://i.ibb.co.com/qRx0kxf/banner-image.png"
]

const BannerCarousel = () => {
  return (
    <motion.div className="max-h-[400px] lg:min-h-[700px] z-30"
      initial={{ opacity: 0, x: 50 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.8, ease: "linear"  }}
    >
      <Carousel
        className="carousel-container"
        autoPlay={true}
        infiniteLoop={true}
        showThumbs={false}
        showIndicators={false}
        showStatus={false}
        interval={4000}
        stopOnHover={true}
        swipeable={true}
        showArrows={false}
      >
        {
          images.map((item, idx) => <div key={idx} className="h-full">
          <img src={item} alt="Slide 1" className="max-h-[400px] lg:min-h-[700px] trainer-shadow object-cover object-center" />
        </div>)
        }
        
      </Carousel>
    </motion.div>
  );
};

export default BannerCarousel;
