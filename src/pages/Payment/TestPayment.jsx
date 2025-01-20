import React, { useState, useEffect } from "react"
import { loadStripe } from "@stripe/stripe-js"
import { Elements } from "@stripe/react-stripe-js"
import PaymentForm from "./PaymentForm"
import { useLocation } from "react-router"
// import PaymentForm from "./PaymentForm"

const stripePromise = loadStripe(import.meta.env.VITE_PUBLISHABLE_KEY)

const TestPayment = () => {
  const [clientSecret, setClientSecret] = useState("")
  const [error, setError] = useState(null)
  const location = useLocation()
  const paymentInfo = location?.state?.paymentInfo

  useEffect(() => {
    fetch("http://localhost:3000/create-payment-intent", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
    })
      .then((res) => {
        if (!res.ok) {
          throw new Error("Network response was not ok")
        }
        return res.json()
      })
      .then((data) => setClientSecret(data.clientSecret))
      .catch((error) => {
        console.error("Error:", error)
        setError(error.message)
      })
  }, [])

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
    <div className="my-24">
      <h1>Stripe Payment Demo</h1>
      {clientSecret && (
        <Elements options={options} stripe={stripePromise}>
          <PaymentForm paymentInfo={paymentInfo}/>
        </Elements>
      )}
    </div>
  )
}

export default TestPayment

