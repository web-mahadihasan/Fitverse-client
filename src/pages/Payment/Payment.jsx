import React, { useState, useEffect } from "react"
import { loadStripe } from "@stripe/stripe-js"
import { Elements } from "@stripe/react-stripe-js"
import PaymentForm from "./PaymentForm"
import { useLocation } from "react-router"
import useAxiosSecured from "../../hooks/useAxiosSecured"
import { Helmet } from "react-helmet"
// import PaymentForm from "./PaymentForm"

const stripePromise = loadStripe(import.meta.env.VITE_PUBLISHABLE_KEY)

const PaymentPage = () => {
  const [clientSecret, setClientSecret] = useState("")
  const [error, setError] = useState(null)
  const location = useLocation()
  const paymentInfo = location?.state?.paymentInfo
  const axiosSecured = useAxiosSecured()

  

  useEffect(() => {
    // fetch("http://localhost:3000/create-payment-intent", {
    //   method: "POST",
    //   headers: { "Content-Type": "application/json" },
    // })
    //   .then((res) => {
    //     if (!res.ok) {
    //       throw new Error("Network response was not ok")
    //     }
    //     return res.json()
    //   })
    //   .then((data) => setClientSecret(data.clientSecret))
    //   .catch((error) => {
    //     console.error("Error:", error)
    //     setError(error.message)
    //   })
    const totalAmmount = {
      ammount: paymentInfo?.packagePrice
    }
    const sendPaymentInfo = async () => {
      if(totalAmmount.ammount > 0) {
        try {
          const {data} = await axiosSecured.post("http://localhost:3000/create-payment-intent", totalAmmount)
          setClientSecret(data.clientSecret)         
        } catch (error) {
          console.error("Error:", error)
          setError(error.message)
        }
      }
    }
    sendPaymentInfo()
  }, [axiosSecured, paymentInfo?.packagePrice])

  const appearance = {
    theme: "stripe",

  }
  const options = {
    clientSecret,
    appearance,
  }

  if (error) {
    return <div>Error: {error}</div>
  }

  return (
    <div className="my-24 min-h-[600px] w-full grid place-items-center lg:grid-cols-4 px-4 xl:px-0">
      <Helmet>
          <title>Fitverse | Payments </title>
          <meta name="Mahadi hasan" content="https://fitverse-bd.web.app/" />
      </Helmet>
      <div className="hidden lg:block"></div>
     <div className="w-full md:w-[70%] lg:w-full lg:col-span-2 mx-auto ">
      <h1 className="text-3xl text-center font-bold  font-kanit capitalize text-main  mb-7 tracking-wide dark:text-main-dark">Secure Checkout, Pay with Your Card</h1>
        {clientSecret && (
          <Elements options={options} stripe={stripePromise}>
            <PaymentForm paymentInfo={paymentInfo}/>
          </Elements>
        )}
     </div>
     <div className="hidden lg:block"></div>
    </div>
  )
}

export default PaymentPage;

