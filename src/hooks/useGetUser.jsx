import { useQuery } from "@tanstack/react-query";
import useAuth from "./useAuth";
import useAxiosSecured from "./useAxiosSecured";

const useGetUser = () => {
    const { user } = useAuth();
    const axiosSecured = useAxiosSecured();

    const { data: getUser, refetch } = useQuery({
        queryKey: [user?.email, "userById"], // Query key for caching
        queryFn: async () => {
            const { data } = await axiosSecured.get(`/users/${user?.email}`);
            return data;
        },
        enabled: !!user?.email,
    });

    return [getUser, refetch];
};

export default useGetUser;
