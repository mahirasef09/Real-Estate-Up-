import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "./useAxiosSecure";
import useAuth from "./useAuth";

const useReviews = () => {
    const { user} = useAuth();
    const axiosSecure = useAxiosSecure();
    const { data: reviews = [], refetch } = useQuery({
        queryKey: ['reviews'],
        queryFn: async() => {
            const res = await axiosSecure.get(`/reviews?email=${user?.email}`);
            return res.data;
        }
    })

    return [reviews, refetch]
};

export default useReviews;