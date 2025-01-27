import React from 'react';
import useAxiosSecure from '../../Hooks/useAxiosSecure';
import { useQuery } from '@tanstack/react-query';
import ReviewCard from '../../Components/ReviewCard';
import moment from 'moment';
import LatestReviewCard from '../../Components/LatestReviewCard';

const LatestReviews = () => {
    const axiosSecure = useAxiosSecure();
    const { data: allReviews = [], refetch } = useQuery({
        queryKey: ['allReviews'],
        queryFn: async () => {
            const res = await axiosSecure.get(`/allReviews`);
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
            <div className='flex justify-between'>
                <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3 my-5'>
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