import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "./useAxiosSecure";
import useAuth from "./useAuth";

const useReviews = () => {
    const { user } = useAuth();
    const axiosSecure = useAxiosSecure();
    const { data: myReviews = [], refetch } = useQuery({
        queryKey: ['myReviews'],
        queryFn: async() => {
            const res = await axiosSecure.get(`/myReviews?email=${user.email}`);
            return res.data;
        }
    });

    return [myReviews, refetch]
};

export default useReviews;