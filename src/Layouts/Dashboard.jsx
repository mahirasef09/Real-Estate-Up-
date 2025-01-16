import React from 'react';
import { AiFillProfile, AiFillPropertySafety } from 'react-icons/ai';
import { FaClipboardList, FaUserFriends } from 'react-icons/fa';
import { GoHomeFill } from 'react-icons/go';
import { IoIosAddCircle } from 'react-icons/io';
import { MdAddPhotoAlternate, MdHomeWork, MdRateReview } from 'react-icons/md';
import { SiSellfy } from 'react-icons/si';
import { NavLink, Outlet } from 'react-router-dom';

const Dashboard = () => {
    const normalUser = false;
    const isAgent = false;
    const isAdmin = true;

    return (
        <div className='flex flex-col lg:flex-row'>
            {/* dashboard side bar */}
            <div className="w-80 min-h-screen bg-green-500">
                <ul className='menu p-1'>
                    {
                        normalUser && <>
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
                                <NavLink to="/dashboard/myReview"><MdRateReview />My Reviews</NavLink>
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
                                <NavLink to="/dashboard/manageReview"><MdRateReview />Manage Reviews</NavLink>
                            </li>
                            <li className='text-xl font-bold'>
                                <NavLink to="/"><MdHomeWork />Back to Home</NavLink>
                            </li>
                        </>
                    }
                </ul>
            </div>

            {/* dashboard content */}
            <div className="flex-1 p-8">
                <Outlet></Outlet>
            </div>
        </div>
    );
};

export default Dashboard;