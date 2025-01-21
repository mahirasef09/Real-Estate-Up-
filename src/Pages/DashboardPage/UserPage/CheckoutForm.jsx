import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
import { useEffect, useState } from "react";
import Swal from "sweetalert2";
import { useNavigate, useParams } from "react-router-dom";
import useAxiosSecure from "../../../Hooks/useAxiosSecure";
import useAuth from "../../../Hooks/useAuth";
import { useQuery } from "@tanstack/react-query";
import moment from "moment";



const CheckoutForm = () => {
    const [error, setError] = useState('');
    const [clientSecret, setClientSecret] = useState('')
    const [transactionId, setTransactionId] = useState('');

    const stripe = useStripe();
    const elements = useElements();

    const params = useParams();
    const { data: payProperty = {}, refetch } = useQuery({
        queryKey: ['payProperty'],
        queryFn: async () => {
            const res = await axiosSecure.get(`/propertyOffered/pay?id=${params?.id}`);
            return res.data;
        }
    });
    const {_id, offeredAmount, propertyId, title, location, agentEmail} = payProperty; 

    const { user } = useAuth();
    const axiosSecure = useAxiosSecure();
    const navigate = useNavigate();

    useEffect(() => {
        if (offeredAmount > 0) {
            axiosSecure.post('/create-payment-intent', { price: offeredAmount })
                .then(res => {
                    console.log(res.data.clientSecret);
                    setClientSecret(res.data.clientSecret);
                })
        }

    }, [axiosSecure, offeredAmount])

    const handleSubmit = async (event) => {
        event.preventDefault();

        if (!stripe || !elements) {
            return
        }

        const card = elements.getElement(CardElement)

        if (card === null) {
            return
        }

        const { error, paymentMethod } = await stripe.createPaymentMethod({
            type: 'card',
            card
        })

        if (error) {
            // console.log('payment error', error);
            setError(error.message);
        }
        else {
            // console.log('payment method', paymentMethod);
            setError('');
        }

        // confirm payment
        const { paymentIntent, error: confirmError } = await stripe.confirmCardPayment(clientSecret, {
            payment_method: {
                card: card,
                billing_details: {
                    email: user?.email || 'anonymous',
                    name: user?.displayName || 'anonymous'
                }
            }
        })

        if (confirmError) {
            // console.log('confirm error');
        }
        else {
            // console.log('payment intent', paymentIntent);
            if (paymentIntent.status === 'succeeded') {
                // console.log('transaction id', paymentIntent.id);
                setTransactionId(paymentIntent.id);

                // now save the payment in the database
                const payment = {
                    agentEmail: agentEmail,
                    buyerEmail: user.email,
                    buyerName: user.displayName,
                    soldPrice: offeredAmount,
                    transactionId: paymentIntent.id,
                    date: moment().format('D/MM/YYYY, h:mm:ss a'),
                    offeredListId: _id,
                    propertyId: propertyId,
                    title: title,
                    location: location
                }

                const res = await axiosSecure.post('/payments', payment);
                // console.log('payment saved', res.data);
                refetch();
                if (res.data?.paymentResult?.insertedId) {
                    Swal.fire({
                        position: "center",
                        icon: "success",
                        title: "Thank you for the Payment",
                        showConfirmButton: false,
                        timer: 2500
                    });
                    // navigate('/dashboard')
                }

            }
        }

    }

    return (
        <div>
            <div className="text-center my-5">
                <h1 className="text-5xl font-extrabold">Pay <span className="text-green-500">${offeredAmount}</span> for the property</h1>
            </div>
            <form onSubmit={handleSubmit}>
                <CardElement
                    options={{
                        style: {
                            base: {
                                fontSize: '16px',
                                color: '#424770',
                                '::placeholder': {
                                    color: '#aab7c4',
                                },
                            },
                            invalid: {
                                color: '#9e2146',
                            },
                        },
                    }}
                />
                <button className="btn btn-sm bg-green-500 my-4" type="submit" disabled={!stripe || !clientSecret}>
                    Pay
                </button>
                <p className="text-red-600">{error}</p>
                {transactionId && <p className="text-green-700"> Your transaction id: {transactionId}</p>}
            </form>
        </div>
    );
};

export default CheckoutForm;