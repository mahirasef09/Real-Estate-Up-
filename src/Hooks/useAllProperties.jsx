
import { useQuery } from '@tanstack/react-query';
import useAxiosSecure from './useAxiosSecure';

const useAllProperties = () => {
    const axiosSecure = useAxiosSecure();
    const { data: allProperties = [], refetch } = useQuery({
        queryKey: ['allProperties'],
        queryFn: async () => {
            const res = await axiosSecure.get(`/allProperties`);
            return res.data;
        }
    });
    return [allProperties, refetch]
};

export default useAllProperties;