import React from 'react';
import { AiFillProfile, AiFillPropertySafety } from 'react-icons/ai';
import { FaClipboardList, FaUserFriends } from 'react-icons/fa';
import { GoHomeFill } from 'react-icons/go';
import { IoIosAddCircle } from 'react-icons/io';
import { MdAddPhotoAlternate, MdHomeWork, MdRateReview } from 'react-icons/md';
import { SiSellfy } from 'react-icons/si';
import { NavLink, Outlet } from 'react-router-dom';
import useAdmin from '../Hooks/useAdmin';
import useAgent from '../Hooks/useAgent';
import { Helmet } from 'react-helmet-async';

const Dashboard = () => {
    const [isAdmin] = useAdmin();
    const [isAgent] = useAgent();

    return (
        <div>
            <Helmet>
                <title>Real Estate Up | Dashboard</title>
            </Helmet>
            <div className='flex flex-col lg:flex-row'>
                {/* dashboard side bar */}
                <div className="w-80 min-h-screen bg-green-500">
                    <ul className='menu p-1'>
                        {
                            isAdmin && <>
                                <li className='text-xl font-bold'>
                                    <NavLink to="/dashboard/adminProfile"><AiFillProfile />Admin Profile</NavLink>
                                </li>
                                <li className='text-xl font-bold'>
                                    <NavLink to="/dashboard/manageProperties"><AiFillPropertySafety />Manage Properties</NavLink>
                                </li>
                                <li className='text-xl font-bold'>
                                    <NavLink to="/dashboard/manageUsers"><FaUserFriends />Manage Users</NavLink>
                                </li>
                                <li className='text-xl font-bold'>
                                    <NavLink to="/dashboard/manageReviews"><MdRateReview />Manage Reviews</NavLink>
                                </li>
                                <li className='text-xl font-bold'>
                                    <NavLink to="/dashboard/advertiseProperty"><MdRateReview />Advertise Property</NavLink>
                                </li>
                                <li className='text-xl font-bold'>
                                    <NavLink to="/"><MdHomeWork />Back to Home</NavLink>
                                </li>
                            </>
                        }
                        {
                            isAgent && <>
                                <li className='text-xl font-bold'>
                                    <NavLink to="/dashboard/agentProfile"><AiFillProfile />Agent Profile</NavLink>
                                </li>
                                <li className='text-xl font-bold'>
                                    <NavLink to="/dashboard/addProperty"><IoIosAddCircle />Add Property</NavLink>
                                </li>
                                <li className='text-xl font-bold'>
                                    <NavLink to="/dashboard/myAddedProperties"><MdAddPhotoAlternate />My Added Properties</NavLink>
                                </li>
                                <li className='text-xl font-bold'>
                                    <NavLink to="/dashboard/mySoldProperties"><SiSellfy />My Sold Properties</NavLink>
                                </li>
                                <li className='text-xl font-bold'>
                                    <NavLink to="/dashboard/myRequestedProperties"><GoHomeFill />My Requested Properties</NavLink>
                                </li>
                                <li className='text-xl font-bold'>
                                    <NavLink to="/"><MdHomeWork />Back to Home</NavLink>
                                </li>
                            </>
                        }
                        <div className={`${isAdmin == true || isAgent == true ? "hidden" : "flex"}`}>
                            <div>
                                <li className='text-xl font-bold'>
                                    <NavLink to="/dashboard/myProfile"><AiFillProfile />My Profile</NavLink>
                                </li>
                                <li className='text-xl font-bold'>
                                    <NavLink to="/dashboard/wishlist"><FaClipboardList />Wishlist</NavLink>
                                </li>
                                <li className='text-xl font-bold'>
                                    <NavLink to="/dashboard/propertyBought"><AiFillPropertySafety />Property Bought</NavLink>
                                </li>
                                <li className='text-xl font-bold'>
                                    <NavLink to="/dashboard/myReviews"><MdRateReview />My Reviews</NavLink>
                                </li>
                                <li className='text-xl font-bold'>
                                    <NavLink to="/"><MdHomeWork />Back to Home</NavLink>
                                </li>
                            </div>
                        </div>
                    </ul>
                </div>

                {/* dashboard content */}
                <div className="flex-1 p-8">
                    <Outlet></Outlet>
                </div>
            </div>
        </div>
    );
};

export default Dashboard;
