import React from 'react';
import PropertyCard from '../../../Components/PropertyCard';
import useProperties from '../../../Hooks/useProperties';

const MyAddedProperties = () => {
    const [properties, refetch] = useProperties();

    const handleDeleteItem = (item) => {
        Swal.fire({
            title: "Are you sure?",
            text: "You won't be able to revert this!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, delete it!"
        })
        .then(async (result) => {
            if (result.isConfirmed) {
                const res = await axiosSecure.delete(`/menu/${item._id}`);
                if (res.data.deletedCount > 0) {
                    refetch();
                    Swal.fire({
                        position: "top-end",
                        icon: "success",
                        title: `${item.name} has been deleted`,
                        showConfirmButton: false,
                        timer: 2500
                    });
                }


            }
        });
    }

    return (
        <div>
            <div className='flex justify-center'>
                <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-3 my-5'>
                    {
                        properties.map(property => <PropertyCard property={property}></PropertyCard>)
                    }
                </div>
            </div>
        </div>
    );
};

export default MyAddedProperties;