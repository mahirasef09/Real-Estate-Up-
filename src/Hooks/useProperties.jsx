import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "./useAxiosSecure";
import useAuth from "./useAuth";

const useProperties = () => {
    const { user} = useAuth();
    const axiosSecure = useAxiosSecure();
    const { data: properties = [], refetch } = useQuery({
        queryKey: ['properties'],
        queryFn: async() => {
            const res = await axiosSecure.get(`/property?email=${user?.email}`);
            return res.data;
        }
    })

    return [properties, refetch]
};

export default useProperties;