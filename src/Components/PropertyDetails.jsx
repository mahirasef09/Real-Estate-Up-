import { useLoaderData, useNavigate } from "react-router-dom";
import useAxiosSecure from "../Hooks/useAxiosSecure";
import Swal from "sweetalert2";
import useAuth from "../Hooks/useAuth";
import useAdmin from "../Hooks/useAdmin";
import useAgent from "../Hooks/useAgent";
import { useForm } from "react-hook-form";
import moment from "moment";
import { useEffect, useState } from "react";

const PropertyDetails = () => {
    const { register, handleSubmit, reset } = useForm();
    
    const [isAdmin] = useAdmin();
    const [isAgent] = useAgent();

    const { user } = useAuth();
    const axiosSecure = useAxiosSecure();
    const navigate = useNavigate();

    const property = useLoaderData();
    const { _id, propertyImage, title, location, description, priceRange, adderName, adderEmail, status } = property;

    const [allReviews, setAllReviews] = useState([]);
    useEffect(() => {
        axiosSecure.get(`/reviews/${_id}`)
            .then(res => setAllReviews(res.data))
    }, []);

    const onSubmit = async (data) => {
        const newReview = {
            propertyId: _id,
            title: title,
            location: location,
            reviewDescription: data.review,
            reviewerImage: user?.photoURL,
            reviewerEmail: user?.email,
            reviewerName: user?.displayName,
            agentName: adderName,
            reviewTime: moment().format('D/MM/YYYY, h:mm:ss a')
        }

        const reviewRes = await axiosSecure.post('/reviews', newReview);
        if (reviewRes.data.insertedId) {
            reset();
            Swal.fire({
                position: "center",
                icon: "success",
                title: `Your Review is added`,
                showConfirmButton: false,
                timer: 2500
            });
            navigate('/dashboard/myReviews');
        }
    }
    const handleWishlist = async (property) => {
        if (isAdmin == true || isAgent == true) {
            Swal.fire({
                position: "center",
                icon: "error",
                title: `${user?.displayName} is an admin or user`,
                showConfirmButton: false,
                timer: 2500
            });
        }
        else {
            const wishProperty = {
                propertyId: property._id,
                propertyImage: property.propertyImage,
                title: property.title,
                location: property.location,
                description: property.description,
                priceRange: property.priceRange,
                status: property.status,
                agentImage: property.agentImage,
                agentName: property.adderName,
                agentEmail: property.adderEmail,
                myEmail: user.email
            }
            const wishlistRes = await axiosSecure.post('/wishlist', wishProperty);
            if (wishlistRes.data.insertedId) {
                Swal.fire({
                    position: "center",
                    icon: "success",
                    title: `${property.title} is added to your wishlist`,
                    showConfirmButton: false,
                    timer: 2500
                });
                navigate('/dashboard/wishlist');
            }
            else {
                Swal.fire({
                    position: "center",
                    icon: "error",
                    title: `${property.title} is already in your wishlist`,
                    showConfirmButton: false,
                    timer: 2500
                });
            }
        }

    }

    return (
        <div>
            <div className="card card-side bg-base-100 shadow-xl my-5">
                <figure>
                    <img
                        src={propertyImage}
                        alt="Property Picture"
                        className='md:w-96 h-full' />
                </figure>
                <div className="card-body">
                    <p><span className="font-bold">Title:</span> {title}</p>
                    <p><span className="font-bold">Description:</span> {description}</p>
                    <p><span className="font-bold">Location:</span> {location}</p>
                    <p><span className="font-bold">Price Range:</span> ${priceRange}</p>
                    <p><span className="font-bold">Agent' Name:</span> {adderName}</p>
                    <p><span className="font-bold">Agent's Email:</span> {adderEmail}</p>
                    <p className="uppercase"><span className="font-bold">Status:</span> {status}</p>
                    <form onSubmit={handleSubmit(onSubmit)}>
                        <fieldset className="form-control w-80">
                            <div className="join">
                                <input
                                    type="text"
                                    {...register('review', { required: true })}
                                    placeholder="Your Review"
                                    className="input input-bordered join-item" />
                                <button className="btn bg-green-500 join-item">Add</button>
                            </div>
                        </fieldset>
                    </form>
                    <div className="card-actions justify-end">

                        <button onClick={() => handleWishlist(property)} className="btn btn-outline btn-warning">Add to Wishlist</button>

                    </div>
                </div>
            </div>

            <div className="text-center my-10">
                <h1 className="text-5xl font-extrabold">All Reviews</h1>
            </div>
            <div className='grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3'>
                {
                    allReviews.map(review =>
                        <div key={review._id} className="stat bg-gray-100 rounded-lg">
                            <div className="text-green-500">{review.reviewDescription}</div>
                            <div className="stat-title">-by {review.reviewerName}</div>
                        </div>)
                }
            </div>
        </div>
    );
};

export default PropertyDetails;