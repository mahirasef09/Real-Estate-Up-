import React from 'react';
import useWishlists from '../../../Hooks/useWishlist';
import WishlistCard from '../../../Components/wishlistCard';
import { Helmet } from 'react-helmet-async';

const Wishlist = () => {
    const [myWishlists,] = useWishlists();
    return (
        <div>
            <Helmet>
                <title>Real Estate Up | My Wishlist</title>
            </Helmet>
            <div className="text-center py-5">
                <h1 className="text-5xl font-extrabold">My Wishlist</h1>
            </div>
            <div className='flex justify-center'>
                <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3 my-5'>
                    {
                        myWishlists.map(wishlist => <WishlistCard key={wishlist._id} wishlist={wishlist}></WishlistCard>)
                    }
                </div>
            </div>
        </div>
    );
};

export default Wishlist;