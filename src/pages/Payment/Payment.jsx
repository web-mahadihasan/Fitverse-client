import { PaymentElement,  Elements, useElements, useStripe, EmbeddedCheckoutProvider, EmbeddedCheckout, CardElement } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import CheckoutForm from "./CheckoutForm";
import { useCallback, useEffect, useState } from "react";
import axios from "axios";
import useAxiosSecured from "../../hooks/useAxiosSecured";
import { useQuery } from "@tanstack/react-query";


// const stripePromise = loadStripe(import.meta.env.VITE_PUBLISHABLE_KEY);

const Payment = () => {
    const [clientSecret, setClientSecret] = useState("");
    const axiosSecured = useAxiosSecured()

    const { data } = useQuery({
        queryKey: ["stripeKey"],
        queryFn: async () => {
          const response = await axios.post("http://localhost:3000/create-checkout-session");
          return response.data;
        },
      });
      console.log(data)
      const stripePromise = loadStripe(data?.publishableKey);



    return (
        <div className="max-w-sm mx-auto h-full justify-center my-24 text-center">
            <div>
                <h3>Here is all payment system</h3>

                <div>
                {/* disabled={!stripe || loading} */}
                {/* {loading ? 'Processing...' : 'Pay'} */}
                {/* {status && <p>{status}</p>} */}

                    {/* strip website  */}
                {/* <EmbeddedCheckoutProvider
                    stripe={stripePromise}
                    options={{ clientSecret }}
                >
                    <EmbeddedCheckout />
                </EmbeddedCheckoutProvider> */}

                        {/* PH  */}

                    {/* <Elements stripe={stripePromise}>
                        <CheckoutForm/>
                    </Elements> */}

                        {/* element it work  */}

                    <Elements stripe={stripePromise} options={{ clientSecret: data?.clientSecret }}>
                        <CheckoutForm />
                    </Elements>

                    {/* Vo  */}
        
        
                </div>
            </div>
        </div>
    );
};

export default Payment;