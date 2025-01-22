import React from 'react';
import { useQuery } from '@tanstack/react-query';
import useAxiosSecure from '../../../Hooks/useAxiosSecure';
import Swal from 'sweetalert2';
import { getAuth, deleteUser } from 'firebase/auth';
import useAuth from '../../../Hooks/useAuth';
import { Helmet } from 'react-helmet-async';

const ManageUsers = () => {
    const { user } = useAuth();
    const axiosSecure = useAxiosSecure();
    const { data: allUsers = [], refetch } = useQuery({
        queryKey: ['allUsers'],
        queryFn: async () => {
            const res = await axiosSecure.get(`/allUsers`);
            return res.data;
        }
    });

    const handleMakeAdmin = (user) => {
        Swal.fire({
            title: "Are you sure?",
            text: "You won't be able to revert this!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, Make Admin!"
        })
            .then(async (result) => {
                if (result.isConfirmed) {
                    const res = await axiosSecure.patch(`/allUsers/admin?id=${user._id}`);
                    if (res.data.modifiedCount > 0) {
                        refetch();
                        Swal.fire({
                            position: "center",
                            icon: "success",
                            title: `${user.name} is Admin Now`,
                            showConfirmButton: false,
                            timer: 2500
                        });
                    }
                }
            });
    };

    const handleMakeAgent = (user) => {
        Swal.fire({
            title: "Are you sure?",
            text: "You won't be able to revert this!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, Make Agent!"
        })
            .then(async (result) => {
                if (result.isConfirmed) {
                    const res = await axiosSecure.patch(`/allUsers/agent?id=${user._id}`);
                    if (res.data.modifiedCount > 0) {
                        refetch();
                        Swal.fire({
                            position: "center",
                            icon: "success",
                            title: `${user.name} is Agent Now`,
                            showConfirmButton: false,
                            timer: 2500
                        });
                    }
                }
            });
    };

    const handleMakeFraud = (user) => {
        Swal.fire({
            title: "Are you sure?",
            text: "You won't be able to revert this!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, Make As Fraud!"
        })
            .then(async (result) => {
                if (result.isConfirmed) {
                    const res = await axiosSecure.patch(`/allUsers/fraud?id=${user._id}`);
                    if (res.data.modifiedCount > 0) {
                        refetch();
                        Swal.fire({
                            position: "center",
                            icon: "success",
                            title: `${user.name} is a fraud`,
                            showConfirmButton: false,
                            timer: 2500
                        });
                    }

                    const response = await axiosSecure.delete(`/property?email=${user.email}`);
                    if (response.data.deletedCount > 0) {
                        refetch();
                        Swal.fire({
                            position: "top-end",
                            icon: "success",
                            title: `${user.name} is a fraud. All Properties added by him/her are deleted`,
                            showConfirmButton: false,
                            timer: 2500
                        });
                    }

                }
            });
    };

    const handleDeleteUser = async (DBuser) => {
        const { _id, email } = DBuser;
        Swal.fire({
            title: "Are you sure?",
            text: "You won't be able to revert this!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, delete it!"
        })
            .then(async (result) => {
                if (result.isConfirmed) {

                    try {
                        const response = await axiosSecure.post('/delete-user', { email });
                        Swal.fire({
                            position: "center",
                            icon: "success",
                            title: `${email} has been deleted from firebase`,
                            showConfirmButton: false,
                            timer: 2500
                        });
                    }
                    catch (err) {
                        console.log('Error deleting user:', err);
                    }



                    const res = await axiosSecure.delete(`/allUsers?id=${_id}`);
                    if (res.data.deletedCount > 0) {
                        refetch();
                        // Swal.fire({
                        //     position: "top-end",
                        //     icon: "success",
                        //     title: `${email} has been deleted`,
                        //     showConfirmButton: false,
                        //     timer: 2500
                        // });
                    }
                }
            });
    }

    return (
        <div>
            <Helmet>
                <title>Real Estate Up | Manage Users</title>
            </Helmet>
            <div className="text-center py-5">
                <h1 className="text-5xl font-extrabold">Manage Users</h1>
            </div>
            <div className="overflow-x-auto">
                <table className="table  w-full">
                    {/* head */}
                    <thead>
                        <tr>
                            <th>S/N</th>
                            <th>Name</th>
                            <th>Email</th>
                            <th>Admin Btn</th>
                            <th>Agent Btn</th>
                            <th>Fraud Btn</th>
                            <th>Delete Btn</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            allUsers.map((user, index) => <tr key={index}>
                                <td>
                                    {
                                        index + 1
                                    }
                                </td>
                                <td>
                                    {user.name}
                                </td>
                                <td>
                                    {user.email}
                                </td>
                                <td>
                                    {
                                        user?.status === undefined ? <button onClick={() => handleMakeAdmin(user)} className={`${!user?.status === undefined ? 'hidden' : 'btn btn-outline btn-warning'}`}>Make Admin</button> : user?.status === 'admin' && <button className='btn bg-green-500'>Admin</button>
                                    }
                                </td>
                                <td>
                                    {
                                        user?.status === undefined ? <button onClick={() => handleMakeAgent(user)} className={`${!user?.status === undefined ? 'hidden' : 'btn btn-outline btn-warning'}`}>Make Agent</button> : user?.status === 'agent' && <button className='btn bg-green-500'>Agent</button>
                                    }
                                </td>
                                <td>
                                    {
                                        user?.status === undefined ? <button onClick={() => handleMakeFraud(user)} className={`${!user?.status === undefined ? 'hidden' : 'btn btn-outline btn-warning'}`}>Make As Fraud</button> : user?.status === 'fraud' && <button className='btn bg-green-500'>Fraud</button>
                                    }
                                </td>
                                <td>
                                    <button onClick={() => handleDeleteUser(user)} className='btn btn-outline btn-warning'>Delete</button>
                                </td>
                            </tr>)
                        }
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default ManageUsers;