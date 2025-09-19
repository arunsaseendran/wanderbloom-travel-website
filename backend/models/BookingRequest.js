import mongoose from "mongoose";

const bookingRequestSchema = new mongoose.Schema(
  {
    booking: { type: mongoose.Schema.Types.ObjectId, ref: "Booking", required: true },
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    type: { type: String, enum: ["cancel", "reschedule"], required: true },
    requestedDate: { type: Date },
    status: { type: String, enum: ["pending", "approved", "rejected"], default: "pending" },
    adminNote: { type: String },
  },
  { timestamps: true }
);

export default mongoose.model("BookingRequest", bookingRequestSchema);
