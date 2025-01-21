import React from 'react';
import useAxiosSecure from '../Hooks/useAxiosSecure';
import Swal from 'sweetalert2';
import { useQuery } from '@tanstack/react-query';

const ManageReviewCard = ({ review }) => {
    const { data: allReviews = [], refetch } = useQuery({
        queryKey: ['allReviews'],
        queryFn: async() => {
            const res = await axiosSecure.get(`/reviews`);
            return res.data;
        }
    });
    const axiosSecure = useAxiosSecure();
    const { _id, title, reviewerImage, reviewerName, reviewDescription, reviewerEmail } = review;

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
                            title: `User Review has been deleted`,
                            showConfirmButton: false,
                            timer: 2500
                        });
                    }


                }
            });
    }
    return (
        <div>
            <div className="card bg-base-100 w-72 h-[500px] shadow-xl">
                <div className="card-body">
                    <figure>
                        <img
                        className='rounded-lg'
                            src={reviewerImage}
                            alt="Shoes" />
                    </figure>
                    <p className="">
                        <span className='font-bold'>Reviewer Name:</span> {reviewerName}
                    </p>
                    <p className="">
                        <span className='font-bold'>Reviewer Email:</span> {reviewerEmail}
                    </p>
                    <p className="">
                        <span className='font-bold'>Review:</span> {reviewDescription}
                    </p>
                    <p className="">
                        <span className='font-bold'>Title:</span> {title}
                    </p>
                    <div className="card-actions justify-end">

                        <button onClick={() => handleDeleteReview(_id)} className="btn btn-outline btn-warning">Delete</button>

                    </div>
                </div>
            </div>
        </div>
    );
};

export default ManageReviewCard;