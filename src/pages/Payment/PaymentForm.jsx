import React, { useState, useEffect } from "react"
import { PaymentElement, useStripe, useElements } from "@stripe/react-stripe-js"
import useAuth from "../../hooks/useAuth"
import { format } from "date-fns"
import useAxiosSecured from "../../hooks/useAxiosSecured"
import Swal from "sweetalert2"
import { useNavigate } from "react-router"

const PaymentForm = ({paymentInfo}) => {
    const stripe = useStripe()
    const elements = useElements()
    const [message, setMessage] = useState(null)
    const [isProcessing, setIsProcessing] = useState(false)
    const {user} = useAuth()
    const axiosSecured = useAxiosSecured()
    const navigate = useNavigate()
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
      // console.log(paymentIntent.id)

        // Save payment info in data base 
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
            paymentDate: new Date(),
            paymentId: paymentIntent?.id
        }
        const {data} = await axiosSecured.post("/payment-api/new-payment", savePaymentData)
        if(data.insertedId){
            Swal.fire({
              title: "Successfull",
              text: "Thank you for purchase plan. Best wishes.",
              icon: "success",
            });
            navigate("/dashboard/user/payment-history")
        }
    } else {
      setMessage("Unexpected state")
    }
    

    setIsProcessing(false)
  }

  return (
    <form onSubmit={handleSubmit} className="max-w-md mx-auto">
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
       <button disabled={isProcessing || !stripe || !elements} type="submit" className=" font-poppins w-full bg-gradient-to-r from-[#5A29E4] to-[#9F72F9] hover:bg-transparent px-6 py-2 rounded-md border border-main-light relative overflow-hidden before:absolute before:inset-0 before:translate-x-full hover:before:translate-x-0 before:transition-transform before:duration-300 before:bg-gradient-to-r before:from-indigo-500 before:via-purple-500 before:to-pink-500  before:z-[-1] text-white z-10" >
         {isProcessing ? "Processing..." : `Pay now $ ${packagePrice}`}
        </button>
      {message && <div>{message}</div>}
    </form>
  )
}

export default PaymentForm

