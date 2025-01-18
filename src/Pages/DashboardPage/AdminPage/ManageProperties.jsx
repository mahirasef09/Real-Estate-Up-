import React from 'react';
import useAxiosSecure from '../../../Hooks/useAxiosSecure';
import Swal from 'sweetalert2';
import useAllProperties from '../../../Hooks/useAllProperties';

const ManageProperties = () => {
    const axiosSecure = useAxiosSecure()
    const [allProperties] = useAllProperties();

    const handleMakeVerify = (property) => {
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
                    const res = await axiosSecure.patch(`/allProperties/verify?id=${property._id}`);
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

    const handleMakeReject = (property) => {
        Swal.fire({
            title: "Are you sure?",
            text: "You won't be able to revert this!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, Reject it!"
        })
            .then(async (result) => {
                if (result.isConfirmed) {
                    const res = await axiosSecure.patch(`/allProperties/reject?id=${property._id}`);
                    if (res.data.modifiedCount > 0) {
                        refetch();
                        Swal.fire({
                            position: "center",
                            icon: "success",
                            title: `${property.title} is Rejected Now`,
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
                                            <button onClick={() => handleMakeVerify(property)} className={`${property?.status === 'rejected' ? "hidden" : "btn btn-outline btn-warning"}`}>Verify</button>
                                    }
                                </td>
                                <td>
                                    {
                                        property.status === 'rejected' ? <button className="btn bg-green-500">Rejected</button> :
                                            <button onClick={() => handleMakeReject(property)} className={`${property?.status === 'verified' ? "hidden" : "btn btn-outline btn-warning"}`}>Reject</button>
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

export default ManageProperties;