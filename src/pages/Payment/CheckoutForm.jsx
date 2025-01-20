import { CardElement, PaymentElement } from "@stripe/react-stripe-js";
import { useState } from "react";
import { useStripe, useElements } from "@stripe/react-stripe-js";
// import { type } from "os";
import "./common.css"

const CheckoutForm = () => {
    const stripe = useStripe();
    const elements = useElements()

    const handleSubmit = async (e) => {
        e.preventDefault()
        if(!stripe || !elements){
            return
        }
        const card = elements.getElement(CardElement);

        if(card === null){
            return
        }

        const {error, paymentMethod} = await stripe.createPaymentMethod({
            type: "card",
            card
        })
        if(error) {
            console.log(error)
        }else{
            console.log("payment data", paymentMethod)
        }
    }
    
  
    return (
        <div>
            <form onSubmit={handleSubmit} id="payment-form">
            {/* disabled={isProcessing || !stripe || !elements} */}
            {/* {isProcessing ? "Processing ... " : "Pay now"} */}

                <PaymentElement id="payment-element" />
                
                {/* <CardElement
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
                        /> */}
                <button  id="submit">
                    <span id="button-text">
                    Payment
                    </span>
                </button>

            </form>
        </div>
    );
};

export default CheckoutForm;


{/* <EmbeddedCheckoutProvider
stripe={stripePromise}
options={options}
>
<EmbeddedCheckout />
</EmbeddedCheckoutProvider> */}