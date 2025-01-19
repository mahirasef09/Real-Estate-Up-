import React from 'react';
import useWishlists from '../../../Hooks/useWishlist';
import WishlistCard from '../../../Components/wishlistCard';

const Wishlist = () => {
    const [allWishlists,] = useWishlists();

    return (
        <div>
            <div className="text-center py-5">
                <h1 className="text-5xl font-extrabold">My Wishlist</h1>
            </div>
            <div className='flex justify-center'>
                <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3 my-5'>
                    {
                        allWishlists.map(wishlist => <WishlistCard key={wishlist._id} wishlist={wishlist}></WishlistCard>)
                    }
                </div>
            </div>
        </div>
    );
};

export default Wishlist;