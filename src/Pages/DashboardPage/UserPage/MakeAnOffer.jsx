import { useForm } from "react-hook-form";
import Swal from "sweetalert2";
import useAuth from "../../../Hooks/useAuth";
import useAxiosSecure from "../../../Hooks/useAxiosSecure";
import { useLoaderData, useNavigate } from "react-router-dom";
import moment from "moment";
import useAdmin from "../../../Hooks/useAdmin";
import useAgent from "../../../Hooks/useAgent";
import { Helmet } from "react-helmet-async";



const MakeAnOffer = () => {
    const [isAdmin] = useAdmin();
    const [isAgent] = useAgent();
    const { user } = useAuth();
    const axiosSecure = useAxiosSecure();
    const { propertyId, title, location, agentName, agentEmail, priceRange, propertyImage } = useLoaderData();
    const navigate = useNavigate();

    const { register, handleSubmit, reset } = useForm();

    const onSubmit = async (data) => {

        if (data.offeredAmount < priceRange.split('-')[0] || data.offeredAmount > priceRange.split('-')[1]) {
            Swal.fire({
                position: "center",
                icon: "error",
                title: `${data.offeredAmount} is not between property's price range`,
                showConfirmButton: false,
                timer: 2500
            });
        }
        if (isAdmin == true || isAgent == true) {
            Swal.fire({
                position: "center",
                icon: "error",
                title: `${data.buyerName} is not an User`,
                showConfirmButton: false,
                timer: 2500
            });
        }
        else {
            const propertyOffered = {
                propertyId: propertyId,
                propertyImage: propertyImage,
                title: data.title,
                location: data.location,
                offeredAmount: data.offeredAmount,
                agentName: data.agentName,
                agentEmail: data.agentEmail,
                buyerName: data.buyerName,
                buyerEmail: data.buyerEmail,
                status: "pending"
            }

            const propertyRes = await axiosSecure.post('/propertyOffered', propertyOffered);
            if (propertyRes.data.insertedId) {
                Swal.fire({
                    position: "center",
                    icon: "success",
                    title: `${data.title} is added to Offered List`,
                    showConfirmButton: false,
                    timer: 2500
                });
                navigate('/dashboard/propertyBought')
            }
            else {
                Swal.fire({
                    position: "center",
                    icon: "error",
                    title: `${data.title} is already in your Offered List`,
                    showConfirmButton: false,
                    timer: 2500
                });
            }
        }

    }



    return (
        <div className="min-h-screen">
            <Helmet>
                <title>Real Estate Up | Make an offer</title>
            </Helmet>
            <div className='lg:w-3/4 mx-auto bg-base-100'>
                <div className="text-center pt-5">
                    <h1 className="text-5xl font-extrabold">Make an offer!</h1>
                </div>
                <div className="card w-full shrink-0">
                    <form onSubmit={handleSubmit(onSubmit)} className="card-body">
                        {/* form first row */}
                        <div className='flex flex-col lg:flex-row gap-5'>
                            <div className="form-control flex-1">
                                <label className="label">
                                    <span className="label-text font-bold">Title</span>
                                </label>
                                <input type="text" {...register('title', { required: true })} defaultValue={title} readOnly className="input input-bordered" required />
                            </div>
                            <div className="form-control flex-1">
                                <label className="label">
                                    <span className="label-text font-bold">Location</span>
                                </label>
                                <input type="text" {...register('location', { required: true })} defaultValue={location} readOnly className="input input-bordered" required />
                            </div>
                        </div>
                        {/* form second row */}
                        <div className='flex flex-col lg:flex-row gap-5'>
                            <div className="form-control flex-1">
                                <label className="label">
                                    <span className="label-text font-bold">Buyer Email</span>
                                </label>
                                <input type="email" {...register('buyerEmail', { required: true })} defaultValue={user?.email} readOnly className="input input-bordered" required />
                            </div>
                            <div className="form-control flex-1">
                                <label className="label">
                                    <span className="label-text font-bold">Buyer Name</span>
                                </label>
                                <input type="text" {...register('buyerName', { required: true })} defaultValue={user?.displayName
                                } readOnly className="input input-bordered" required />
                            </div>
                        </div>

                        <div className='flex flex-col lg:flex-row gap-5'>
                            <div className="form-control flex-1">
                                <label className="label">
                                    <span className="label-text font-bold">Agent Email</span>
                                </label>
                                <input type="email" {...register('agentEmail', { required: true })} defaultValue={agentEmail} readOnly className="input input-bordered" required />
                            </div>
                            <div className="form-control flex-1">
                                <label className="label">
                                    <span className="label-text font-bold">Agent Name</span>
                                </label>
                                <input type="text" {...register('agentName', { required: true })} defaultValue={agentName
                                } readOnly className="input input-bordered" required />
                            </div>
                        </div>

                        <div className='flex flex-col lg:flex-row gap-5'>
                            <div className="form-control flex-1">
                                <label className="label">
                                    <span className="label-text font-bold">Buying Date</span>
                                </label>
                                <input type="email" {...register('buyingDate', { required: true })} defaultValue={moment().format('D/MM/YYYY, h:mm:ss a')} readOnly className="input input-bordered" required />
                            </div>
                            <div className="form-control flex-1">
                                <label className="label">
                                    <span className="label-text font-bold">Offer Amount</span>
                                </label>
                                <input type="text" {...register('offeredAmount', { required: true })} placeholder="Offer Amount" className="input input-bordered" required />
                            </div>
                        </div>

                        {/* <div className="form-control flex-1">
                            <label className="label">
                                <span className="label-text font-bold">Price Range</span>
                            </label>
                            <input type="text" {...register('priceRange', { required: true })} defaultValue={priceRange} readOnly className="input input-bordered" required />
                        </div> */}

                        <div className="form-control mt-6">

                            <button className="btn bg-green-500">Offer</button>

                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default MakeAnOffer;