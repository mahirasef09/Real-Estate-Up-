import React from 'react';
import { useQuery } from '@tanstack/react-query';
import useAxiosSecure from '../../../Hooks/useAxiosSecure';

const ManageProperties = () => {
    const axiosSecure = useAxiosSecure();
    const { data: allProperties = [], refetch } = useQuery({
        queryKey: ['allProperties'],
        queryFn: async () => {
            const res = await axiosSecure.get(`/allProperties`);
            return res.data;
        }
    });

    const handleMakeVerify = (property) => {
        axiosSecure.patch(`/allProperties?id=${property._id}`)
            .then(res => {
                console.log(res.data)
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
            })
    }

    return (
        <div>
            <div className="text-center py-5">
                <h1 className="text-5xl font-extrabold">Manage Properties</h1>
            </div>
            <div className="overflow-x-auto">
                <table className="table  w-full">
                    {/* head */}
                    <thead>
                        <tr>
                            <th>S/N</th>
                            <th>Title</th>
                            <th>Location</th>
                            <th>Agent Name</th>
                            <th>Agent Email</th>
                            <th>Price Range</th>
                            <th>Verify Btn</th>
                            <th>Reject Btn</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            allProperties.map((property, index) => <tr key={index}>
                                <td>
                                    {
                                        index + 1
                                    }
                                </td>
                                <td>
                                    {property.title}
                                </td>
                                <td>
                                    {property.location}
                                </td>
                                <td>
                                    {property.adderName}
                                </td>
                                <td>
                                    {property.adderEmail}
                                </td>
                                <td>
                                    ${property.priceRange}
                                </td>
                                <td>
                                    {
                                        property.status === 'verified' ? <button className="btn bg-green-500">Verified</button> :
                                            <button onClick={() => handleMakeVerify(property)} className='btn btn-outline btn-warning'>Verify</button>
                                    }
                                </td>
                                <td>
                                    <button className={`${property?.status === 'verified' ? "hidden" : "btn btn-outline btn-warning"}`}>Reject</button>
                                </td>
                            </tr>)
                        }
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default ManageProperties;