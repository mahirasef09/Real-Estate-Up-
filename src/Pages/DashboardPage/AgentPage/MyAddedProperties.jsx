import React from 'react';
import PropertyCard from '../../../Components/PropertyCard';
import useProperties from '../../../Hooks/useProperties';

const MyAddedProperties = () => {
    const [properties,] = useProperties();



    return (
        <div>
            <div className="text-center py-5">
                <h1 className="text-5xl font-extrabold">My Properties</h1>
            </div>
            <div className='flex justify-center'>
                <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-3 my-5'>
                    {
                        properties.map(property => <PropertyCard property={property}></PropertyCard>)
                    }
                </div>
            </div>
        </div>
    );
};

export default MyAddedProperties;