import React, { useEffect, useState } from 'react';
import VerifiedPropertyCard from '../../Components/verifiedPropertyCard';
import { Helmet } from 'react-helmet-async';
import useAxiosSecure from '../../Hooks/useAxiosSecure';
import { IoSearchOutline } from 'react-icons/io5';

const AllProperties = () => {
    const [verifiedProperties, setVerifiedProperties] = useState([]);
    const [searchPropertyLocation, setSearchPropertyLocation] = useState("");
    const [location, setLocation] = useState([]);
    const axiosSecure = useAxiosSecure();

    useEffect(() => {
        axiosSecure.get(`/verifiedProperties`)
            .then(res => setVerifiedProperties(res.data))
    }, []);

    const handleSearch = (e) => {
        e.preventDefault();
        const form = e.target;
        setSearchPropertyLocation(form.searchItem.value);
    }

    useEffect(() => {
        axiosSecure.get(`/search?location=${searchPropertyLocation}`)
            .then(res => setLocation(res.data))
    }, [searchPropertyLocation]);

    const handleSortAscending = () => {
        const sortedVerifiedProperties = [...verifiedProperties].sort((a, b) => a.priceRange.split('-')[0] - b.priceRange.split('-')[0]);
        setVerifiedProperties(sortedVerifiedProperties);
    }

    const handleSortDescending = () => {
        const sortedVerifiedProperties = [...verifiedProperties].sort((a, b) => b.priceRange.split('-')[0] - a.priceRange.split('-')[0]);
        setVerifiedProperties(sortedVerifiedProperties);
    }

    return (
        <div>
            <Helmet>
                <title>Real Estate Up | All properties</title>
            </Helmet>

            <form onSubmit={handleSearch} className="flex justify-center gap-3">
                <input type="text" name="searchItem" placeholder="Search by location" className="input input-bordered w-80" />
                <button className='btn bg-green-500'><IoSearchOutline /></button>
            </form>

            <div className='flex justify-center'>
                <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-3 my-3'>
                    {
                        location.map(property => <VerifiedPropertyCard key={property._id} property={property}></VerifiedPropertyCard>)
                    }
                </div>
            </div>

            <div className="text-center">
                <h1 className="text-5xl font-extrabold">All Properties</h1>
            </div>

            <div className="flex justify-center items-center gap-10 my-5">
                <button onClick={handleSortAscending} className="btn btn-sm bg-green-500">Sort by Ascending</button>
                <button onClick={handleSortDescending} className="btn btn-sm bg-green-500">Sort by Descending</button>
            </div>

            <div className='flex justify-between'>
                <div className='grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-3 my-5'>
                    {
                        verifiedProperties.map(property => <VerifiedPropertyCard key={property._id} property={property}></VerifiedPropertyCard>)
                    }
                </div>
            </div>
        </div>
    );
};

export default AllProperties;