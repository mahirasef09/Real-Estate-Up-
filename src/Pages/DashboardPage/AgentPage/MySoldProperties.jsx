import { useQuery } from '@tanstack/react-query';
import React from 'react';
import useAuth from '../../../Hooks/useAuth';
import useAxiosSecure from '../../../Hooks/useAxiosSecure';
import Swal from 'sweetalert2';

const MySoldProperties = () => {
    const { user } = useAuth();
    const axiosSecure = useAxiosSecure();
    const { data: soldProperties = [], refetch } = useQuery({
        queryKey: ['soldProperties'],
        queryFn: async () => {
            const res = await axiosSecure.get(`/payments/${user?.email}`);
            return res.data;
        }
    })


    return (
        <div>
            <div className="text-center py-5">
                <h1 className="text-5xl font-extrabold">My Sold Properties</h1>
            </div>
            <div className="overflow-x-auto">
                <table className="table  w-full">
                    {/* head */}
                    <thead>
                        <tr>
                            <th>S/N</th>
                            <th>Title</th>
                            <th>Location</th>
                            <th>Buyer Name</th>
                            <th>Buyer Email</th>
                            <th>Sold Price</th>
                        </tr>
                    </thead>
                    <tbody>

                        {/* row 1 */}
                        {
                            soldProperties.map((property, index) => <tr key={index}>
                                <td>
                                    {index + 1}
                                </td>
                                <td>
                                    {
                                        property.title
                                    }
                                </td>
                                <td>
                                    {
                                        property.location
                                    }
                                </td>
                                <td>
                                    {
                                        property.buyerName
                                    }
                                </td>
                                <td>
                                    {
                                        property.buyerEmail
                                    }
                                </td>
                                <td>
                                    {
                                        property.soldPrice
                                    }
                                </td>
                            </tr>)
                        }

                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default MySoldProperties;