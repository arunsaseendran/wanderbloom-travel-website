import React from "react";
import CommonSection from "../shared/CommonSection";
import { useNavigate, useSearchParams } from "react-router-dom";
import { BASE_URL } from "../utils/config";

export default function Payment() {
  const [params] = useSearchParams();
  const navigate = useNavigate();
  const bookingId = params.get("bookingId");
  const amount = params.get("amount");

  const pay = async () => {
    const token = localStorage.getItem("token");
    const res = await fetch(`${BASE_URL}/payment/create`, {
      method: "POST",
      headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}` },
      body: JSON.stringify({ amount, bookingId })
    }).then(r=>r.json());
    window.location.href = res.checkoutUrl;
  };

  return (
    <section>
      <CommonSection title={"Payment"} />
      <div className="container">
        <div className="row justify-content-center">
          <div className="col-12 col-md-6 col-lg-6">
            <div className="p-4 border rounded-3">
              <h5>Amount: ₹{amount}</h5>
              <p>Booking: {bookingId}</p>
              <button className="btn primary__btn w-100" onClick={pay}>Pay Now</button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
