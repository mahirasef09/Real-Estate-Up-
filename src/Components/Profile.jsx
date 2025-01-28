import React from 'react';
import { useQuery } from '@tanstack/react-query';
import useAxiosSecure from '../Hooks/useAxiosSecure';
import useAuth from '../Hooks/useAuth';
import { Helmet } from 'react-helmet-async';

const Profile = () => {
    const { user } = useAuth();
    const axiosSecure = useAxiosSecure();
    const { data: dashboardUser = [] } = useQuery({
        queryKey: ['dashboardUser'],
        queryFn: async () => {
            const res = await axiosSecure.get(`/users?email=${user?.email}`);
            return res.data;
        }
    });

    return (
        <div>
            <Helmet>
                <title>Real Estate Up | My Profile</title>
            </Helmet>
            <div className="text-center py-5">
                <h1 className="text-5xl font-extrabold">My Profile</h1>
            </div>
            <div className="overflow-x-auto">
                <table className="table  w-full">
                    {/* head */}
                    <thead>
                        <tr>
                            <th>Image</th>
                            <th>Name</th>
                            <th>Email</th>
                            <th>Role</th>
                        </tr>
                    </thead>
                    <tbody>

                        {/* row 1 */}
                        <tr>
                            <td>
                                <div className="flex items-center gap-3">
                                    <div className="avatar">
                                        <div className="mask mask-squircle h-12 w-12">
                                            <img
                                                src={user?.photoURL
                                                }
                                                alt="User" />
                                        </div>
                                    </div>
                                </div>
                            </td>
                            <td>
                                {dashboardUser?.name
                                }
                            </td>
                            <td>
                                {
                                    dashboardUser?.email
                                }
                            </td>
                            <td>
                                {
                                    dashboardUser?.status
                                }
                            </td>
                        </tr>

                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default Profile;