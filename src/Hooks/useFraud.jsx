import { useQuery } from "@tanstack/react-query";
import useAuth from "./useAuth";
import useAxiosSecure from "./useAxiosSecure";


const useFraud = () => {
    const { user } = useAuth();
    const axiosSecure = useAxiosSecure();
    const { data: isFraud, isPending: isFraudLoading } = useQuery({
        queryKey: [user?.email, 'isFraud'],
        queryFn: async () => {
            const res = await axiosSecure.get(`/user/fraud?email=${user.email}`);
            // console.log(res.data);
            return res.data?.fraud;
        }
    })
    return [isFraud, isFraudLoading]
};

export default useFraud;