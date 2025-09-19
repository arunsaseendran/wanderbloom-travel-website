import React, { useEffect, useState } from "react";
import CommonSection from "../shared/CommonSection";
import { BASE_URL } from "../utils/config";

export default function AdminRequests() {
  const [list, setList] = useState([]);
  const token = localStorage.getItem("token");

  const load = () => {
    fetch(`${BASE_URL}/booking-requests`, { headers: { Authorization: `Bearer ${token}` } })
      .then(r=>r.json()).then(setList);
  };

  useEffect(load, []);

  const decide = async (id, decision) => {
    await fetch(`${BASE_URL}/booking-requests/${id}/decision`, {
      method: "POST",
      headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}` },
      body: JSON.stringify({ decision })
    });
    load();
  };

  return (
    <section>
      <CommonSection title={"Cancellation / Reschedule Requests"} />
      <div className="container">
        {list.length === 0 && <p>No requests.</p>}
        {list.map(r => (
          <div key={r._id} className="p-3 border rounded-3 mb-2">
            <div className="d-flex justify-content-between align-items-center">
              <div>
                <div><strong>{r.type.toUpperCase()}</strong> — Booking {r.booking?._id}</div>
                <div>Status: {r.status}</div>
                {r.requestedDate && <div>New Date: {r.requestedDate.slice(0,10)}</div>}
              </div>
              <div className="d-flex gap-2">
                <button className="btn primary__btn" onClick={()=>decide(r._id,"approved")}>Approve</button>
                <button className="btn secondary__btn" onClick={()=>decide(r._id,"rejected")}>Reject</button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
