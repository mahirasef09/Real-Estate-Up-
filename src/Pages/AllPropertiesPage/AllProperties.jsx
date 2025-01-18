import React from 'react';
import VerifiedPropertyCard from '../../Components/verifiedPropertyCard';
import useAllProperties from '../../Hooks/useAllProperties';

const AllProperties = () => {
    const [allProperties] = useAllProperties();
    const verifiedProperties = allProperties.filter(property => property.status === "verified");

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