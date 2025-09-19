import React from "react";
import CommonSection from "../shared/CommonSection";
import { useSearchParams, Link } from "react-router-dom";

export default function PaymentResult() {
  const [params] = useSearchParams();
  const status = params.get("status");
  const ref = params.get("ref");
  return (
    <section>
      <CommonSection title={"Payment Result"} />
      <div className="container text-center">
        <h3 className={status === "success" ? "text-success" : "text-danger"}>
          {status === "success" ? "Payment Successful" : "Payment Failed"}
        </h3>
        <p>Reference: {ref}</p>
        <Link className="btn primary__btn mt-3" to="/home">Go Home</Link>
      </div>
    </section>
  );
}
