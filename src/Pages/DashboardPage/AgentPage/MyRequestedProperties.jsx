import { useQuery } from '@tanstack/react-query';
import React from 'react';
import useAuth from '../../../Hooks/useAuth';
import useAxiosSecure from '../../../Hooks/useAxiosSecure';

const MyRequestedProperties = () => {
    const { user } = useAuth();
    const axiosSecure = useAxiosSecure();
    const { data: requestedProperties = [], refetch } = useQuery({
        queryKey: ['requestedProperties'],
        queryFn: async () => {
            const res = await axiosSecure.get(`/propertyOffered/agent?email=${user?.email}`);
            return res.data;
        }
    })

const handleAccept = (property) => {
        Swal.fire({
            title: "Are you sure?",
            text: "You won't be able to revert this!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, Verify it!"
        })
            .then(async (result) => {
                if (result.isConfirmed) {
                    const res = await axiosSecure.patch(`/propertyOffered/accept?id=${property._id}`);
                    if (res.data.modifiedCount > 0) {
                        refetch();
                        Swal.fire({
                            position: "center",
                            icon: "success",
                            title: `${property.title} is Verified Now`,
                            showConfirmButton: false,
                            timer: 2500
                        });
                    }
                }
            });
    };
    return (
        <div>
            <div className="text-center py-5">
                <h1 className="text-5xl font-extrabold">My Requested Properties</h1>
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
                            <th>Offered Price</th>
                            <th>Accept</th>
                            <th>Reject</th>
                        </tr>
                    </thead>
                    <tbody>

                        {/* row 1 */}
                        {
                            requestedProperties.map((property, index) => <tr key={index}>
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
                                        property.offeredAmount
                                    }
                                </td>
                                <td>
                                    <button className='btn btn-outline btn-warning'>Accept</button>
                                </td>
                                <td>
                                    <button className='btn btn-outline btn-warning'>Reject</button>
                                </td>
                            </tr>)
                        }

                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default MyRequestedProperties;