import { useQuery } from "@tanstack/react-query";
import useAuth from "./useAuth";
import useAxiosSecured from "./useAxiosSecured";

const useAdmin = () => {
    const {user} = useAuth()
    const axiosSecured = useAxiosSecured()

    const {data: isAdmin, isPending: isAdminLoading, refetch} = useQuery({
        queryKey: [user?.email, "useAdmin"],
        queryFn: async () => {
            const {data} = await axiosSecured.get(`/users/admin/${user.email}`)
            return data.admin
        }
    })
    return[isAdmin,isAdminLoading, refetch]
};

export default useAdmin;
