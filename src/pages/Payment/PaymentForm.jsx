import React, { useState, useEffect } from "react"
import { PaymentElement, useStripe, useElements } from "@stripe/react-stripe-js"
import useAuth from "../../hooks/useAuth"
import { format } from "date-fns"
import useAxiosSecured from "../../hooks/useAxiosSecured"
import Swal from "sweetalert2"

const PaymentForm = ({paymentInfo}) => {
    const stripe = useStripe()
    const elements = useElements()
    const [message, setMessage] = useState(null)
    const [isProcessing, setIsProcessing] = useState(false)
    const {user} = useAuth()
    const axiosSecured = useAxiosSecured()
    const {
        name: trainerName, 
        email : trainerEmail,
        selectedClass,
        trainerId,
        slotName,
        packageName,
        packagePrice
    } = paymentInfo || {}

  const handleSubmit = async (event) => {
    event.preventDefault()

    if (!stripe || !elements) {
      return
    }

    setIsProcessing(true)

    const { error, paymentIntent } = await stripe.confirmPayment({
      elements,
      confirmParams: {
            payment_method_data: {
            billing_details: {
                name: user?.displayName,
                email: user?.email,
            },
        }
        // return_url: `http://localhost:5173/dashboard`, 
      },
      redirect: "if_required",
    })

    if (error) {
      setMessage(error.message)
    } else if (paymentIntent && paymentIntent.status === "succeeded") {
      setMessage("Payment status: " + paymentIntent.status)
      console.log(paymentIntent)

        // Save payment info in data base 
        const paymentDate = format(new Date(), "PP");
        const savePaymentData = {
            trainerEmail, 
            trainerName, 
            selectedClass,
            trainerId,
            slotName,
            packageName,
            packagePrice,
            userName: user?.displayName,
            userEmail: user?.email,
            paymentDate
        }
        const {data} = await axiosSecured.post("/payment-api/new-payment", savePaymentData)
        console.log(data)
        if(data.insertedId){
            Swal.fire({
              title: "Successfull",
              text: "Thank you for purchase plan. Best wishes.",
              icon: "success",
            });
        }
    } else {
      setMessage("Unexpected state")
    }
    

    setIsProcessing(false)
  }

  return (
    <form onSubmit={handleSubmit}>
      <PaymentElement id="payment-element"
      options={{
        layout: {
          type: "accordion",
          defaultCollapsed: false,
          radios: false,
          spacedAccordionItems: true,
        },
      }}
      />
      <button disabled={isProcessing || !stripe || !elements} type="submit">
        {isProcessing ? "Processing..." : "Pay now"}
      </button>
      {message && <div>{message}</div>}
    </form>
  )
}

export default PaymentForm

