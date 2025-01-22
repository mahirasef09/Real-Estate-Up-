import React from 'react';
import useReviews from '../../../Hooks/useReviews';
import ReviewCard from '../../../Components/ReviewCard';
import { Helmet } from 'react-helmet-async';

const MyReviews = () => {
    const [reviews,] = useReviews();
    return (
        <div>
            <Helmet>
                <title>Real Estate Up | My Reviews</title>
            </Helmet>
            <div className="text-center py-5">
                <h1 className="text-5xl font-extrabold">My Reviews</h1>
            </div>
            <div className='flex justify-center'>
                <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-3 my-5'>
                    {
                        reviews.map(review => <ReviewCard key={review._id} review={review}></ReviewCard>)
                    }
                </div>
            </div>
        </div>
    );
};

export default MyReviews;