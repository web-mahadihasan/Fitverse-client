import useAuth from "../../hooks/useAuth";
import useGetUser from "../../hooks/useGetUser";

const Step3Content = ({slotInfo, packagePrice, selectedClass}) => {
    const {name, email, age, experience, slotName, classHour, classtitle, availableDays} = slotInfo || {}
    const {user} = useAuth()
    return (
        <div className="max-w-3xl mx-auto my-10 border p-4 lg:p-6">
            <div>
                <h3 className="text-center text-2xl font-poppins font-semibold py-2 border-b-2 max-w-md mx-auto border-gray-300 text-main">-- Checkout Details --</h3>
            </div>
            <div className=" my-0">
            <div className="space-y-2 flex-1 my-2 py-4 border-b">
                <h3 className="text-center my-4 text-xl font-poppins text-gray-800 font-medium dark:text-gray-300">Your Details</h3>
                    <h3 className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3">
                        <span className="text-lg font-medium text-primary-black dark:text-main-dark">Name: </span>
                        <span className='text-gray-600 dark:text-gray-400 font-poppins text-base'>{user?.displayName}</span>
                    </h3>
                    <h3 className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3">
                        <span className="text-lg font-medium text-primary-black dark:text-main-dark">Email: </span>
                        <span className='text-gray-600 dark:text-gray-400 font-poppins text-base '>{user?.email}</span>
                    </h3>
            </div>
            {/* Trainer details  */}
            <div className="space-y-2 flex-1 my-2 py-4 border-b border-gray-200">
                <h3 className="text-center my-4 text-xl font-poppins text-gray-800 font-medium dark:text-gray-300">Trainer Details</h3>
                     <h3 className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3">
                        <span className="text-lg font-medium text-primary-black dark:text-main-dark">Trainer Name: </span>
                        <span className='text-gray-600 dark:text-gray-400 font-poppins text-base'>{name}</span>
                    </h3>
                    <h3 className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3">
                        <span className="text-lg font-medium text-primary-black dark:text-main-dark">Trainer Email: </span>
                        <span className='text-gray-600 dark:text-gray-400 font-poppins text-base'>{email}</span>
                    </h3>
                    <h3 className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3">
                        <span className="text-lg font-medium text-primary-black dark:text-main-dark">Trainer Age: </span>
                        <span className='text-gray-600 dark:text-gray-400 font-poppins text-base'>{age} Years</span>
                    </h3>
                    <h3 className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3">
                        <span className="text-lg font-medium text-primary-black dark:text-main-dark">Slot Name: </span>
                        <span className='text-gray-600 dark:text-gray-400 font-poppins text-base'>{slotName}</span>
                    </h3>
                    <h3 className="grid grid-cols-1 md:grid-cols-2 lg:gap-2 xl:grid-cols-3 items-center">
                        <span className="text-lg font-medium text-primary-black dark:text-main-dark">Class Duration: </span>
                        <span className='text-gray-600 dark:text-gray-400 font-poppins text-base'>{classHour} Hours</span>
                    </h3>
                    <h3 className="grid grid-cols-1 md:grid-cols-2 lg:gap-2 xl:grid-cols-3 items-center">
                        <span className="text-lg font-medium text-primary-black dark:text-main-dark">Selected Class: </span>
                        <span className='text-gray-600 dark:text-gray-400 font-poppins text-base'>{selectedClass}</span>
                    </h3>
            </div>

            {/* Package Details  */}
            <div className="flex-1 text-center">
                <h3 className="text-center my-4 text-xl font-poppins text-gray-800 font-medium dark:text-gray-300">Package Details</h3>
                <div className="my-3">
                    <p className="text-lg font-medium text-gray-600 dark:text-main-dark">Package Name</p>
                    <p className="text-2xl my-1 font-medium text-primary-black dark:text-main-dark">{packagePrice.name}</p>
                </div>
                <div className="my-3">
                    <p className="text-lg font-medium text-gray-600 dark:text-main-dark">Package Name</p>
                    <p className="text-3xl my-1 font-bold text-main dark:text-main-dark">$ {packagePrice.price}</p>
                </div>
            </div>
            </div>
        </div>
    );
};

export default Step3Content;