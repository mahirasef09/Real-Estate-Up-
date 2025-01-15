import React from 'react';
import PropertyCard from '../../../Components/PropertyCard';
import useProperties from '../../../Hooks/useProperties';

const MyAddedProperties = () => {
    const [properties, refetch] = useProperties();
    return (
        <div>
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