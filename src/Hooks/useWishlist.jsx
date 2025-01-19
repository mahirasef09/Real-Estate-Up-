
import { useQuery } from '@tanstack/react-query';
import useAxiosSecure from './useAxiosSecure';

const useWishlist = () => {
    const axiosSecure = useAxiosSecure();
    const { data: allWishlists = [], refetch } = useQuery({
        queryKey: ['allWishlists'],
        queryFn: async () => {
            const res = await axiosSecure.get(`/property/wishlist`);
            return res.data;
        }
    });
    return [allWishlists, refetch]
};

export default useWishlist;