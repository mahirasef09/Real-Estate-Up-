import React from 'react';

const LatestReviewCard = ({ review }) => {
    const { _id, title, reviewerImage, reviewerName, reviewDescription, reviewerEmail } = review;

    return (
        <div>
            <div className="card bg-gray-100 w-64 h-[400px] shadow-xl">
                <div className="card-body">
                    <figure>
                        <img
                        className='rounded-lg h-[150px]'
                            src={reviewerImage}
                            alt="Shoes" />
                    </figure>
                    <p className="">
                        <span className='font-bold'>Reviewer Name:</span> {reviewerName}
                    </p>
                    <p className="">
                        <span className='font-bold'>Review:</span> {reviewDescription}
                    </p>
                    <p className="">
                        <span className='font-bold'>Property Title:</span> {title}
                    </p>
                </div>
            </div>
        </div>
    );
};

export default LatestReviewCard;