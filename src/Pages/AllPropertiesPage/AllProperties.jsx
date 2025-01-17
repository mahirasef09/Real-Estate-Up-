import React from 'react';
import VerifiedPropertyCard from '../../Components/verifiedPropertyCard';
import { useQuery } from '@tanstack/react-query';

const AllProperties = () => {
    // const laptops = allData.filter(laptop => laptop.category === "Laptop");
    return (
        <div>
            <div className="text-center py-5">
                <h1 className="text-5xl font-extrabold">All Properties</h1>
            </div>
            <div className='flex justify-center'>
                <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-3 my-5'>
                    {
                        verifiedProperties.map(property => <VerifiedPropertyCard property={property}></VerifiedPropertyCard>)
                    }
                </div>
            </div>
        </div>
    );
};

export default AllProperties;