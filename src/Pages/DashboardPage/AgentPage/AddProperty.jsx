import { useForm } from "react-hook-form";
import Swal from "sweetalert2";
import useAuth from "../../../Hooks/useAuth";
import useAxiosPublic from "../../../Hooks/useAxiosPublic";
import useAxiosSecure from "../../../Hooks/useAxiosSecure";
import { useNavigate } from "react-router-dom";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { Helmet } from "react-helmet-async";

const image_hosting_key = import.meta.env.VITE_IMAGE_HOSTING_KEY;
const image_hosting_api = `https://api.imgbb.com/1/upload?key=${image_hosting_key}`;

const AddProperty = () => {
    const { register, handleSubmit, reset } = useForm();
    const { user } = useAuth();
    const axiosPublic = useAxiosPublic();
    const axiosSecure = useAxiosSecure();
    const navigate = useNavigate();

    const { data: dashboardUser = [] } = useQuery({
        queryKey: ['dashboardUser'],
        queryFn: async () => {
            const res = await axiosSecure.get(`/users?email=${user?.email}`);
            return res.data;
        }
    });

    const onSubmit = async (data) => {
        const propertyImageFile = { image: data.propertyImage[0] }
        const agentImageFile = { image: data.agentImage[0] }
        const res1 = await axiosPublic.post(image_hosting_api, propertyImageFile, {
            headers: {
                'content-type': 'multipart/form-data'
            }
        });
        const res2 = await axiosPublic.post(image_hosting_api, agentImageFile, {
            headers: {
                'content-type': 'multipart/form-data'
            }
        });
        if (res1.data.success && res2.data.success) {
            const newProperty = {
                title: data.title,
                location: data.location,
                propertyImage: res1.data.data.display_url,
                description: data.description,
                priceRange: data.priceRange,
                agentImage: res2.data.data.display_url,
                adderEmail: data.adderEmail,
                adderName: data.adderName,
                status: "pending"
            }

            const propertyRes = await axiosSecure.post('/property', newProperty);
            if (propertyRes.data.insertedId) {
                reset();
                Swal.fire({
                    position: "center",
                    icon: "success",
                    title: `${data.title} is added`,
                    showConfirmButton: false,
                    timer: 2500
                });
                navigate('/dashboard/myAddedProperties');
            }

        }
    }

    return (
        <div>
            <Helmet>
                <title>Real Estate Up | Add Property</title>
            </Helmet>
            <div className="min-h-screen">
                <div className='lg:w-3/4 mx-auto bg-base-100'>
                    <div className="text-center pt-5">
                        <h1 className="text-5xl font-extrabold">Add Property!</h1>
                        {
                            dashboardUser?.status === 'fraud' && <p className="text-3xl text-red-500 font-bold my-5">You can not add property because you have allegation of being fraud.</p>
                        }
                    </div>
                    <div className="card w-full shrink-0">
                        <form onSubmit={handleSubmit(onSubmit)} className="card-body">
                            {/* form first row */}
                            <div className='flex flex-col lg:flex-row gap-5'>
                                <div className="form-control flex-1">
                                    <label className="label">
                                        <span className="label-text font-bold">Title</span>
                                    </label>
                                    <input type="text" {...register('title', { required: true })} placeholder="Title" className="input input-bordered" required />
                                </div>
                                <div className="form-control flex-1">
                                    <label className="label">
                                        <span className="label-text font-bold">Location</span>
                                    </label>
                                    <input type="text" {...register('location', { required: true })} placeholder="Location" className="input input-bordered" required />
                                </div>
                            </div>
                            {/* form second row */}
                            <div className='flex flex-col lg:flex-row gap-5'>
                                <div className="form-control flex-1">
                                    <label className="label">
                                        <span className="label-text font-bold">Adder Email</span>
                                    </label>
                                    <input type="email" {...register('adderEmail', { required: true })} defaultValue={user?.email} readOnly className="input input-bordered" required />
                                </div>
                                <div className="form-control flex-1">
                                    <label className="label">
                                        <span className="label-text font-bold">Adder Name</span>
                                    </label>
                                    <input type="text" {...register('adderName', { required: true })} defaultValue={user?.displayName
                                    } readOnly className="input input-bordered" required />
                                </div>
                            </div>

                            <div className="form-control flex-1">
                                <label className="label">
                                    <span className="label-text font-bold">Price Range</span>
                                </label>
                                <input type="text" {...register('priceRange', { required: true })} placeholder="Price Range input must be this way Exp: 10000-20000" className="input input-bordered" required />
                            </div>

                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text font-bold">Description</span>
                                </label>
                                <input type="text" {...register('description', { required: true })} placeholder="Description" className="input input-bordered" required />
                            </div>

                            <div className="form-control flex-1">
                                <label className="label">
                                    <span className="label-text font-bold">Property's Image</span>
                                </label>
                                <input type="file" {...register('propertyImage', { required: true })} placeholder="Property's Image" className="file-input w-full max-w-xs" required />
                            </div>

                            <div className="form-control flex-1">
                                <label className="label">
                                    <span className="label-text font-bold">Agent's Image</span>
                                </label>
                                <input type="file" {...register('agentImage', { required: true })} placeholder="Agent's Image" className="file-input w-full max-w-xs" required />
                            </div>

                            <div className="form-control mt-6">
                                {
                                    dashboardUser?.status === 'fraud' ? <button disabled className="btn">Add</button> : <button className="btn bg-green-500">Add</button>
                                }
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AddProperty;
