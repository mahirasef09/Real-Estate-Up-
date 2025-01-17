import React from 'react';

const verifiedPropertyCard = () => {
    return (
        <div>
            <div className="card bg-base-100 w-64 shadow-xl">
                <figure>
                    <img
                        src={image}
                        alt="Shoes" />
                </figure>
                <div className="card-body">
                    <h2 className="card-title">
                        {title}
                    </h2>
                    <p className='flex items-center gap-1'><IoLocation /><span className='text-gray-400'>{location}</span></p>
                    <p className='flex items-center'><FaDollarSign /><span className='text-gray-400'>{priceRange}</span></p>
                    <div className="card-actions justify-end">
                        <Link to={`/dashboard/updateAddedProperty/${_id}`}>
                            <button className="btn btn-outline btn-warning">Update</button>
                        </Link>

                        <button className="btn btn-outline btn-warning">Delete</button>

                    </div>
                </div>
            </div>
        </div>
    );
};

export default verifiedPropertyCard;