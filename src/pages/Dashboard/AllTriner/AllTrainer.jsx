import { useQuery } from "@tanstack/react-query";
import useAxiosSecured from "../../../hooks/useAxiosSecured";
import useAxiosPublic from "../../../hooks/useAxiosPublic";


const AllTrainer = () => {
    const axiosSecured = useAxiosSecured()
 
    const {data: usersData} = useQuery({
        queryKey: ["users"],
        queryFn: async () => {
            const {data} = await axiosSecured.get("/users")
            return data
        }
    })

   

    return (
        <div>
            <div className="grid grid-cols-4 my-10">
            <div className=" shadow-lg border rounded font-poppins">
                <div className="w-full relative bg-center">
                    <img
                    src="https://images.pexels.com/photos/3772623/pexels-photo-3772623.jpeg"
                    alt=""
                    className="w-[80px] h-[80px] rounded-full border-secondary border-4 absolute -bottom-12 left-1/2 transform -translate-x-1/2 object-cover"
                    />
                </div>
                
                <div className="w-full px-4 mt-16">
                    <h2 className="font-[600] text-[1.4rem]">User Name</h2>
                    <p className="text-text text-[0.9rem]">London</p>
                </div>
                
                <div className="w-full p-4 mt-8 border-t border-border flex items-center justify-between">
                    <div className="flex items-center justify-center flex-col">
                    <button className="bg-gradient-to-r from-[#5A29E4] to-[#9F72F9] hover:bg-transparent px-3 py-2 rounded-md border border-main-light relative overflow-hidden before:absolute before:inset-0 before:translate-x-full hover:before:translate-x-0 before:transition-transform before:duration-300 before:bg-gradient-to-r before:from-indigo-500 before:via-purple-500 before:to-pink-500  before:z-[-1] text-white z-10" >
                        Send Message
                    </button>
                    </div>
                    <div className="flex items-center justify-center flex-col">
                        <button className="bg-gradient-to-r from-red-700 to-red-400 hover:bg-transparent px-3 py-2 rounded-md border border-red-400 relative overflow-hidden before:absolute before:inset-0 before:translate-x-full hover:before:translate-x-0 before:transition-transform before:duration-300 before:bg-gradient-to-r before:from-red-500 before:via-red-600 before:to-red-700  before:z-[-1] text-white z-10" >
                            Removed Trainer
                        </button>
                    </div>
                </div>
                </div>
            </div>
         </div>
    );
};

export default AllTrainer;