import { useQuery } from "@tanstack/react-query";
import useAuth from "./useAuth";
import useAxiosSecured from "./useAxiosSecured";

const useUsers = () => {
    const {user} = useAuth()
    const axiosSecured = useAxiosSecured()

    const {data: userById,  refetch} = useQuery({
        queryKey: [user?.email, "userById"],
        queryFn: async () => {
            const {data} = await axiosSecured.get(`/users/${user?.email}`)
            return data
        }
    })
    return[userById, refetch]
};

export default useUsers;
