import React from 'react';
import useAxiosSecure from '../../../Hooks/useAxiosSecure';
import BoughtCard from '../../../Components/BoughtCard';
import useAuth from '../../../Hooks/useAuth';
import { useQuery } from '@tanstack/react-query';

const PropertyBought = () => {
    const {user} = useAuth();
    const axiosSecure = useAxiosSecure();
    const { data: boughtProperties = [], refetch } = useQuery({
        queryKey: ['boughtProperties'],
        queryFn: async() => {
            const res = await axiosSecure.get(`/propertyOffered?name=${user?.displayName}`);
            return res.data;
        }
    })
    console.log(boughtProperties)

    return (
        <div>
            <div className="text-center py-5">
                <h1 className="text-5xl font-extrabold">Property Bought</h1>
            </div>
            <div className='flex justify-center'>
                <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-3 my-5'>
                    {
                        boughtProperties.map(property => <BoughtCard key={property._id} property={property}></BoughtCard>)
                    }
                </div>
            </div>
        </div>
    );
};

export default PropertyBought;