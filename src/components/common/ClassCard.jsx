
const ClassCard = ({classInfo}) => {
    const {title, description, image, total_booked} = classInfo || {}
    return (
        <div className="h-full font-poppins"> 
            <div className="h-full grid grid-cols-3 items-center bg-white border border-gray-200 rounded-lg shadow md:flex-row hover:bg-gray-100 dark:border-gray-700 dark:bg-gray-800 dark:hover:bg-gray-700">
                <div className="col-span-1 h-full">
                    <img className="object-cover w-full rounded-t-lg h-full md:w-48 md:rounded-none md:rounded-s-lg" src={image} alt=""/>
                </div>
                <div className="flex flex-col justify-between p-4 leading-normal col-span-2">
                    <h5 className="mb-2 text-2xl font-semibold font-poppins tracking-tight text-gray-800 dark:text-white ">{title}</h5>
                    <p>Total Booked: {total_booked}</p>
                    <p className="mb-3 font-normal text-gray-700 dark:text-gray-400 line-clamp-2">{description}</p>                
                </div>
            </div>

        </div>
    );
};

export default ClassCard;
