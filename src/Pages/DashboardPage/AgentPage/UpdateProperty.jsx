import { useLoaderData, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import Swal from "sweetalert2";
import useAxiosPublic from "../../../Hooks/useAxiosPublic";
import useAxiosSecure from "../../../Hooks/useAxiosSecure";
import { Helmet } from "react-helmet-async";

const image_hosting_key = import.meta.env.VITE_IMAGE_HOSTING_KEY;
const image_hosting_api = `https://api.imgbb.com/1/upload?key=${image_hosting_key}`;

const UpdateProperty = () => {
    const { _id, title, location, priceRange, adderEmail, adderName } = useLoaderData();
    const axiosPublic = useAxiosPublic();
    const axiosSecure = useAxiosSecure();
    const navigate = useNavigate();

    const { register, handleSubmit, reset } = useForm();

    const onSubmit = async (data) => {
        const imageFile = { image: data.image[0] }
        const res = await axiosPublic.post(image_hosting_api, imageFile, {
            headers: {
                'content-type': 'multipart/form-data'
            }
        });
        if (res.data.success) {
            const updatedProperty = {
                title: data.title,
                location: data.location,
                image: res.data.data.display_url,
                priceRange: data.priceRange,
                adderEmail: data.adderEmail,
                adderName: data.adderName
            }

            const propertyRes = await axiosSecure.patch(`/property/${_id}`, updatedProperty);
            if (propertyRes.data.modifiedCount > 0) {
                reset();
                Swal.fire({
                    position: "center",
                    icon: "success",
                    title: `${data.title} is Updated`,
                    showConfirmButton: false,
                    timer: 2500
                });
                navigate('/dashboard/myAddedProperties');
            }
        }
    };


    return (

        <div>
            <Helmet>
                <title>Real Estate Up | Update Property</title>
            </Helmet>
            <div className="text-center py-5">
                <h1 className="text-5xl font-extrabold">Update Property!</h1>
            </div>
            <form onSubmit={handleSubmit(onSubmit)}>
                {/* form first row */}
                <div className='flex flex-col lg:flex-row gap-5'>
                    <div className="form-control flex-1">
                        <label className="label">
                            <span className="label-text font-bold">Title</span>
                        </label>
                        <input type="text" {...register('title', { required: true })}
                            defaultValue={title}
                            placeholder="Title" className="input input-bordered" required />
                    </div>
                    <div className="form-control flex-1">
                        <label className="label">
                            <span className="label-text font-bold">Location</span>
                        </label>
                        <input type="text" {...register('location', { required: true })}
                            defaultValue={location}
                            placeholder="Location" className="input input-bordered" required />
                    </div>
                </div>
                {/* form second row */}
                <div className='flex flex-col lg:flex-row gap-5'>
                    <div className="form-control flex-1">
                        <label className="label">
                            <span className="label-text font-bold">Adder Email</span>
                        </label>
                        <input type="email" {...register('adderEmail', { required: true })} defaultValue={adderEmail} readOnly className="input input-bordered" required />
                    </div>
                    <div className="form-control flex-1">
                        <label className="label">
                            <span className="label-text font-bold">Adder Name</span>
                        </label>
                        <input type="text" {...register('adderName', { required: true })} defaultValue={adderName} readOnly className="input input-bordered" required />
                    </div>
                </div>

                <div className="form-control flex-1">
                    <label className="label">
                        <span className="label-text font-bold">Price Range</span>
                    </label>
                    <input type="text" {...register('priceRange', { required: true })}
                        defaultValue={priceRange} placeholder="Price Range" className="input input-bordered" required />
                </div>

                <div className="form-control flex-1">
                    <label className="label">
                        <span className="label-text font-bold">Image</span>
                    </label>
                    <input type="file" {...register('image', { required: true })} placeholder="Image" className="file-input w-full max-w-xs" required />
                </div>

                <div className="form-control mt-6">
                    <button className="btn bg-green-500">Update</button>
                </div>
            </form>
        </div>

    );
};

export default UpdateProperty;