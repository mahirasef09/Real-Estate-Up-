
import { Helmet } from 'react-helmet-async';
import Swal from 'sweetalert2';
import useAxiosSecure from '../../../Hooks/useAxiosSecure';
import { useQuery } from '@tanstack/react-query';

const AdvertiseProperty = () => {
    const axiosSecure = useAxiosSecure();

    const { data: verifiedProperties = [], refetch } = useQuery({
        queryKey: ['verifiedProperties'],
        queryFn: async () => {
            const res = await axiosSecure.get(`/verifiedProperties`);
            return res.data;
        }
    });

    const handleAdvertise = (property) => {
        Swal.fire({
            title: "Are you sure?",
            text: "You won't be able to revert this!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, Advertise it!"
        })
            .then(async (result) => {
                if (result.isConfirmed) {
                    const res = await axiosSecure.patch(`/allProperties/advertise?id=${property._id}`);
                    if (res.data.modifiedCount > 0) {
                        refetch();
                        Swal.fire({
                            position: "center",
                            icon: "success",
                            title: `${property.title} is Advertised Now`,
                            showConfirmButton: false,
                            timer: 2500
                        });
                    }
                }
            });
    };

    return (
        <div>
            <Helmet>
                <title>Real Estate Up | Advertise Property</title>
            </Helmet>
            <div className="text-center py-5">
                <h1 className="text-5xl font-extrabold">Advertise Property</h1>
            </div>
            <div className="overflow-x-auto">
                <table className="table  w-full">
                    {/* head */}
                    <thead>
                        <tr>
                            <th>S/N</th>
                            <th>Image</th>
                            <th>Title</th>
                            <th>Agent Name</th>
                            <th>Price Range</th>
                            <th>Advertise Btn</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            verifiedProperties.map((property, index) => <tr key={index}>
                                <td>
                                    {
                                        index + 1
                                    }
                                </td>
                                <td>
                                    <div className="avatar">
                                        <div className="mask mask-squircle h-12 w-12">
                                            <img
                                                src={property.propertyImage}
                                                alt="Avatar Tailwind CSS Component" />
                                        </div>
                                    </div>
                                </td>
                                <td>
                                    {property.title}
                                </td>

                                <td>
                                    {property.adderName}
                                </td>

                                <td>
                                    ${property.priceRange}
                                </td>
                                <td>
                                    {
                                        property.advertiseStatus === 'advertised' ? <button className="btn bg-green-500">Advertised</button> :
                                            <button onClick={() => handleAdvertise(property)} className={`btn btn-outline btn-warning`}>Advertise</button>
                                    }
                                </td>
                            </tr>)
                        }
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default AdvertiseProperty;