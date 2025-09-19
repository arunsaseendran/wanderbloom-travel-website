import Booking from "../models/Booking.js";

// Create booking
export const createBooking = async (req, res) => {
  try {
    const newBooking = new Booking({
      ...req.body,
      userId: req.user.id,      // comes from verifyUser
      userEmail: req.user.email // comes from verifyUser
    });

    const savedBooking = await newBooking.save();
    return res.status(201).json({ success: true, data: savedBooking });
  } catch (err) {
    console.error("Create booking error:", err);
    return res.status(500).json({ 
      success: false, 
      message: "Booking failed", 
      error: err.message 
    });
  }
};

// Get bookings of logged-in user
export const getUserBookings = async (req, res) => {
  try {
    console.log(req.user,req.userId)
    if (!req.user || !req.user.id) {
      return res.status(401).json({ success: false, message: "Unauthorized" });
    }

    const bookings = await Booking.find({ userId: req.user.id }).sort({ createdAt: -1 });

    return res.status(200).json({ success: true, data: bookings });
  } catch (err) {
    console.error("Get bookings error:", err);
    return res.status(500).json({ 
      success: false, 
      message: "Failed to fetch bookings", 
      error: err.message 
    });
  }
  // return(
  //   res.send("Success")
  // )
};
