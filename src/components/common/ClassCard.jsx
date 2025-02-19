import { useQuery } from "@tanstack/react-query";
import useAxiosPublic from "../../hooks/useAxiosPublic";
import { ImageWithToolTip } from "./ImageWithToolTip";
import { Link, useLocation } from "react-router";

const ClassCard = ({classInfo}) => {
    const {title, description, image, total_booked} = classInfo || {}
    const axiosPublic = useAxiosPublic()
    const {pathname} = useLocation()

    const {data: trainerImage} = useQuery({
        queryKey: ["slotsImage"],
        queryFn: async()=> {
            const {data} = await axiosPublic.get("/slot-api/slots")
            return data
        }
    })
    // console.log(trainerImage)
    return (
        <div className="h-full font-poppins"> 
            <div className="h-full grid grid-cols-3 items-center bg-white border border-gray-200 rounded-lg shadow md:flex-row hover:bg-gray-100 dark:border-gray-700 dark:bg-gray-800 dark:hover:bg-gray-700">
                <div className="col-span-1 h-full">
                    <img className="object-cover w-full rounded-t-lg h-full md:w-48 md:rounded-none md:rounded-s-lg" src={image} alt=""/>
                </div>
                <div className="flex flex-col justify-between p-4 leading-normal col-span-2 relative">
                    <h5 className="mb-2 text-2xl font-semibold font-kanit tracking-tight text-secondary-black dark:text-white ">{title}</h5>
                    <p className="my-1 text-lg font-poppins">Total Booked: {total_booked}</p>
                    <p className="mb-3 font-normal text-gray-700 dark:text-gray-400 line-clamp-2">{description}</p>
                    {
                        pathname === "/" && <p className="bg-main/75 text-white px-2 rounded-l rounded-r-sm w-fit drop-shadow-lg py absolute top-1 right-1">Featured</p>
                    }
                    <div>
                        {/* {
                            trainerImage?.map(images => images.classtitle.includes(title) && (
                                <img key={images._id} src={images.image} className="w-10 h-10 rounded-full"/>
                            ))
                        } */}
                        {
                            trainerImage && <ImageWithToolTip items={trainerImage} title={title}/>
                        }
                    </div>             
                </div>
            </div>

        </div>
    );
};

export default ClassCard;
