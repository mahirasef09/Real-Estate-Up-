import { useLoaderData, useNavigate } from "react-router-dom";
import useAxiosSecure from "../Hooks/useAxiosSecure";
import Swal from "sweetalert2";

const PropertyDetails = () => {
    const axiosSecure = useAxiosSecure();
    const navigate = useNavigate();
    const property = useLoaderData();
    const { propertyImage, title, location, description, priceRange, adderName, adderEmail, status } = property;

    const handleWishlist = async (property) => {
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
        }
        const wishlistRes = await axiosSecure.post('/property/wishlist', wishProperty);
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
        else{
            Swal.fire({
                position: "center",
                icon: "error",
                title: `${property.title} is already in your wishlist`,
                showConfirmButton: false,
                timer: 2500
            });
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
                    <form>
                        <fieldset className="form-control w-80">
                            <div className="join">
                                <input
                                    type="text"
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
        </div>
    );
};

export default PropertyDetails;