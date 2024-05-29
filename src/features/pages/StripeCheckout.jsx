import React, { useState, useEffect, useMemo } from "react";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import CheckoutForm from "./CheckoutForm";
import "../../../src/Stripe.css";
import { selectCurrentOrder } from "../../features/order/orderSlice";
import { useSelector } from "react-redux";

// Make sure to call loadStripe outside of a component’s render to avoid
// recreating the Stripe object on every render.
// This is your test publishable API key.
const stripePromise = loadStripe(
  "pk_test_51PKzPtSAoLjQrsQnvGjP24OPJCRWQdiuatYk3xEIHjgON0A4rv0e6Pu4FAvEy9soi0v3mtDSKFhQPz1D72oMj39C00mRDyyFp9"
);

export default function StripeCheckout() {
  const [clientSecret, setClientSecret] = useState("");
  const currentOrder = useSelector(selectCurrentOrder);

  useEffect(() => {
    // Create PaymentIntent as soon as the page loads
    fetch("http://localhost:8080/create-payment-intent", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        totalAmount: currentOrder.totalAmount,
        order_id: currentOrder.id,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log("executed");
        setClientSecret(data.clientSecret);
      });
  }, [currentOrder.totalAmount, currentOrder.id]);

  // Memoize the appearance object to avoid unnecessary re-renders

  const appearance = useMemo(
    () => ({
      theme: "stripe",
    }),
    []
  );

  // Memoize the options object to avoid unnecessary re-renders
  const options = useMemo(
    () => ({
      clientSecret,
      appearance,
    }),
    [clientSecret, appearance]
  );

  if (!clientSecret) {
    return <div>Loading...</div>;
  }

  return (
    <div className="Stripe">
      <Elements options={options} stripe={stripePromise}>
        <CheckoutForm />
      </Elements>
    </div>
  );
}
