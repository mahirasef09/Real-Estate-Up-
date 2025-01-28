import React from 'react';
import { useQuery } from '@tanstack/react-query';
import moment from 'moment';
import LatestReviewCard from '../../Components/LatestReviewCard';
import useAxiosPublic from '../../Hooks/useAxiosPublic';

const LatestReviews = () => {
    const axiosPublic = useAxiosPublic();
    const { data: allReviews = [], refetch } = useQuery({
        queryKey: ['allReviews'],
        queryFn: async () => {
            const res = await axiosPublic.get(`/allReviews`);
            return res.data;
        }
    });
    const format = 'D/MM/YYYY, h:mm:ss a';
    const sortedReviews = allReviews.sort((a, b) => moment(b.reviewTime, format).diff(moment(a.reviewTime, format)));
    return (
        <div>
            <div className="text-center py-5">
                <h1 className="text-5xl font-extrabold">Latest Reviews</h1>
            </div>
            <div className='flex justify-around'>
                <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-3 my-5'>
                    {
                        sortedReviews.map(review => <LatestReviewCard key={review._id} review={review}>
                        </LatestReviewCard>)
                    }
                </div>
            </div>
        </div>
    );
};

export default LatestReviews;