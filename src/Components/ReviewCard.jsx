import React from 'react';
import useReviews from '../Hooks/useReviews';
import Swal from 'sweetalert2';
import useAxiosSecure from '../Hooks/useAxiosSecure';

const ReviewCard = ({ review }) => {
    const [, refetch] = useReviews();
    const axiosSecure = useAxiosSecure();
    const { _id, title, agentName, reviewDescription, reviewTime } = review;

    const handleDeleteReview = async (id) => {
        Swal.fire({
            title: "Are you sure?",
            text: "You won't be able to revert this!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, delete it!"
        })
            .then(async (result) => {
                if (result.isConfirmed) {
                    const res = await axiosSecure.delete(`/reviews/${id}`);
                    if (res.data.deletedCount > 0) {
                        refetch();
                        Swal.fire({
                            position: "center",
                            icon: "success",
                            title: `Your Review has been deleted`,
                            showConfirmButton: false,
                            timer: 2500
                        });
                    }


                }
            });
    }

    return (
        <div>
            <div className="card bg-gray-100 w-64 h-[350px] shadow-xl">
                <div className="card-body">
                    <p className="font-bold">
                        Title:<span> {title}</span>
                    </p>
                    <p className="">
                        <span className='font-bold'>Agent Name:</span> {agentName}
                    </p>
                    <p className="">
                        <span className='font-bold'>Review:</span> {reviewDescription}
                    </p>
                    <p className="">
                        <span className='font-bold'>Review Time:</span> {reviewTime}
                    </p>

                    <div className="card-actions justify-end">

                        <button onClick={() => handleDeleteReview(_id)} className="btn btn-outline btn-warning">Delete</button>

                    </div>
                </div>
            </div>
        </div>
    );
};

export default ReviewCard;