import Booking from "../models/Booking.js";
import BookingRequest from "../models/BookingRequest.js";

export const createRequest = async (req, res) => {
  try {
    const { bookingId, type, requestedDate } = req.body;
    const booking = await Booking.findById(bookingId);
    if (!booking || booking.user.toString() !== req.userId) {
      return res.status(404).json({ message: "Booking not found" });
    }
    const br = await BookingRequest.create({ booking: bookingId, user: req.userId, type, requestedDate });
    res.status(201).json(br);
  } catch (e) {
    res.status(500).json({ message: e.message });
  }
};

export const listRequests = async (req, res) => {
  try {
    const role = req.userRole || "user";
    const filter = role === "admin" ? {} : { user: req.userId };
    const list = await BookingRequest.find(filter).populate("booking");
    res.json(list);
  } catch (e) {
    res.status(500).json({ message: e.message });
  }
};

export const decideRequest = async (req, res) => {
  try {
    const { id } = req.params;
    const { decision, adminNote } = req.body;
    const br = await BookingRequest.findById(id).populate("booking");
    if (!br) return res.status(404).json({ message: "Request not found" });
    br.status = decision;
    br.adminNote = adminNote;
    await br.save();
    if (decision === "approved") {
      if (br.type === "cancel") {
        br.booking.status = "cancelled";
      } else if (br.type === "reschedule" && br.requestedDate) {
        br.booking.date = br.requestedDate;
        br.booking.status = "rescheduled";
      }
      await br.booking.save();
    }
    res.json(br);
  } catch (e) {
    res.status(500).json({ message: e.message });
  }
};
