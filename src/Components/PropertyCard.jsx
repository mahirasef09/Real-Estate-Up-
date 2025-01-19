import React from 'react';
import { IoLocation } from 'react-icons/io5';
import { Link } from 'react-router-dom';
import useAxiosSecure from '../Hooks/useAxiosSecure';
import Swal from 'sweetalert2';
import useProperties from '../Hooks/useProperties';
import { FaDollarSign } from 'react-icons/fa';

const PropertyCard = ({ property }) => {
    const { _id, propertyImage, title, location, description, priceRange } = property;
    const axiosSecure = useAxiosSecure();
    const [, refetch] = useProperties();

    const handleDeleteItem = (id) => {
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
                const res = await axiosSecure.delete(`/property?id=${id}`);
                if (res.data.deletedCount > 0) {
                    refetch();
                    Swal.fire({
                        position: "center",
                        icon: "success",
                        title: `${title} has been deleted`,
                        showConfirmButton: false,
                        timer: 2500
                    });
                }


            }
        });
    }

    return (
        <div>
            <div className="card bg-base-100 w-64 shadow-xl">
                <figure>
                    <img
                        src={propertyImage}
                        alt="Shoes" />
                </figure>
                <div className="card-body">
                    <h2 className="card-title">
                        {title}
                    </h2>
                    <p className="">
                        <span className='font-bold'>Description:</span> {description}
                    </p>
                    <p className='flex items-center gap-1'><IoLocation /><span className='text-gray-400'>{location}</span></p>
                    <p className='flex items-center'><FaDollarSign /><span className='text-gray-400'>{priceRange}</span></p>
                    <div className="card-actions justify-end">
                        <Link to={`/dashboard/updateAddedProperty/${_id}`}>
                            <button className="btn btn-outline btn-warning">Update</button>
                        </Link>

                        <button onClick={()=>handleDeleteItem(_id)} className="btn btn-outline btn-warning">Delete</button>

                    </div>
                </div>
            </div>
        </div>
    );
};

export default PropertyCard;