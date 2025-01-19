import { useLoaderData } from "react-router-dom";

const PropertyDetails = () => {
    const property = useLoaderData();
    const { _id, propertyImage, title, location, description, priceRange, adderName, adderEmail, status } = property;

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

                        <button className="btn btn-outline btn-warning">Add to Wishlist</button>

                    </div>
                </div>
            </div>
        </div>
    );
};

export default PropertyDetails;