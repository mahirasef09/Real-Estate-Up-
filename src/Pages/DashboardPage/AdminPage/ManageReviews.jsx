import React from 'react';
import useAxiosSecure from '../../../Hooks/useAxiosSecure';
import { useQuery } from '@tanstack/react-query';
import ManageReviewCard from '../../../Components/ManageReviewCard';

const ManageReviews = () => {
    const axiosSecure = useAxiosSecure();
    const { data: allReviews = [], refetch } = useQuery({
        queryKey: ['allReviews'],
        queryFn: async() => {
            const res = await axiosSecure.get(`/reviews`);
            return res.data;
        }
    });
    return (
        <div>
            <div className="text-center py-5">
                <h1 className="text-5xl font-extrabold">Manage Reviews</h1>
            </div>
            <div className='flex justify-center'>
                <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3 my-5'>
                    {
                        allReviews.map(review => <ManageReviewCard key={review._id} review={review}>
                        </ManageReviewCard>)
                    }
                </div>
            </div>
        </div>
    );
};

export default ManageReviews;