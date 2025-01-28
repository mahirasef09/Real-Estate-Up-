import React from 'react';
import PropertyCard from '../../../Components/PropertyCard';
import useProperties from '../../../Hooks/useProperties';
import { Helmet } from 'react-helmet-async';

const MyAddedProperties = () => {
    const [properties,] = useProperties();



    return (
        <div>
            <Helmet>
                <title>Real Estate Up | My Added Properties</title>
            </Helmet>
            <div className="text-center py-5">
                <h1 className="text-5xl font-extrabold">My Added Properties</h1>
            </div>
            <div className='flex justify-center'>
                <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3 my-5'>
                    {
                        properties.map(property => <PropertyCard key={property._id} property={property}></PropertyCard>)
                    }
                </div>
            </div>
        </div>
    );
};

export default MyAddedProperties;