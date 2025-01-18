import { useQuery } from "@tanstack/react-query";
import useAxiosPublic from "./useAxiosPublic";

const useGetClass = () => {
    const axiosPublic = useAxiosPublic()

    const {data: allClass,  refetch} = useQuery({
        queryKey: ["allClass"],
        queryFn: async () => {
            const {data} = await axiosPublic.get(`/class-api/class`)
            return data
        }
    })
    return[allClass, refetch]
};

export default useGetClass;
