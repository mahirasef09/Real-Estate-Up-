import React from 'react';
import { FaDollarSign } from 'react-icons/fa';
import { IoLocation } from 'react-icons/io5';
import Swal from 'sweetalert2';
import useAxiosSecure from '../Hooks/useAxiosSecure';
import useWishlists from '../Hooks/useWishlist';
import { Link } from 'react-router-dom';

const WishlistCard = ({ wishlist }) => {
    const axiosSecure = useAxiosSecure();
    const [, refetch] = useWishlists();
    const { _id, propertyImage, agentImage, title, location, priceRange, agentName, status } = wishlist;

    const handleDeleteWishlist = async (id) => {
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
                    const res = await axiosSecure.delete(`/wishlist?id=${id}`);
                    if (res.data.deletedCount > 0) {
                        refetch();
                        Swal.fire({
                            position: "center",
                            icon: "success",
                            title: `${title} has been deleted from your wishlist`,
                            showConfirmButton: false,
                            timer: 2500
                        });
                    }
                }
            });
    }
    return (
        <div>
            <div className="card bg-base-100 w-72 shadow-xl">
                <figure>
                    <img
                        src={propertyImage}
                        alt="Shoes" />
                </figure>
                <div className='flex gap-3 mt-3 ml-9'>
                    <div className="avatar">
                        <div className="w-8 rounded">
                            <img
                                src={agentImage}
                                alt="Tailwind-CSS-Avatar-component" />

                        </div>
                    </div>
                    <p className='flex items-center text-gray-400'>Agent: {agentName}</p>
                </div>
                <div className="card-body">
                    <h2 className="card-title font-bold">
                        {title}
                    </h2>
                    <p className='flex items-center gap-1'><IoLocation /><span className='text-gray-400'>{location}</span></p>
                    <p className='flex items-center'><FaDollarSign /><span className='text-gray-400'>{priceRange}</span></p>
                    <p className='flex items-center text-gray-400 uppercase'>Status: {status}</p>
                    <div className="card-actions justify-end">
                        <Link to={`/dashboard/makeAnOffer/${_id}`}>
                            <button className="btn btn-outline btn-warning">Make an offer</button>
                        </Link>

                        <button onClick={() => handleDeleteWishlist(_id)} className="btn btn-outline btn-warning">Remove</button>

                    </div>
                </div>
            </div>
        </div>
    );
};

export default WishlistCard;