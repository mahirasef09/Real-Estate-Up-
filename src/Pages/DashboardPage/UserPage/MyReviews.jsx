import React from 'react';
import useReviews from '../../../Hooks/useReviews';
import ReviewCard from '../../../Components/ReviewCard';

const MyReviews = () => {
    const [reviews, ] = useReviews();
    return (
        <div>
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