import Wishlist from "../models/Wishlist.js";

// export const getWishlist = async (req, res) => {
//   try {
//     const wl = await Wishlist.findOne({ user: req.userId }).populate("tours");
//     res.json(wl || { user: req.userId, tours: [] });
//   } catch (e) {
//     res.status(500).json({ message: e.message });
//   }
// };

// export const toggleWishlist = async (req, res) => {
//   try {
//     const { tourId } = req.body;
//     let wl = await Wishlist.findOne({ user: req.userId });
//     if (!wl) wl = await Wishlist.create({ user: req.userId, tours: [] });
//     const idx = wl.tours.findIndex(t => t.toString() === tourId);
//     if (idx >= 0) wl.tours.splice(idx, 1);
//     else wl.tours.push(tourId);
//     await wl.save();
//     res.json(wl);
//   } catch (e) {
//     res.status(500).json({ message: e.message });
//   }
// };

// getWishlist.js
// export const getWishlist = async (req, res) => {
//   try {
//     const wl = await Wishlist.findOne({ user: req.userId }).populate("tours");
//     res.json(wl || { user: req.userId, tours: [] });
//   } catch (e) {
//     res.status(500).json({ message: e.message });
//   }
// };

// export const toggleWishlist = async (req, res) => {
//   try {
//     const { tourId } = req.body;
//     let wl = await Wishlist.findOne({ user: req.userId });
//     if (!wl) wl = await Wishlist.create({ user: req.userId, tours: [] });

//     const idx = wl.tours.findIndex(t => t.toString() === tourId);
//     if (idx >= 0) wl.tours.splice(idx, 1);
//     else wl.tours.push(tourId);

//     await wl.save();

//     // repopulate before sending response
//     wl = await wl.populate("tours");

//     res.json(wl);
//   } catch (e) {
//     res.status(500).json({ message: e.message });
//   }
// };


// import Wishlist from "../models/Wishlist.js";

export const getWishlist = async (req, res) => {
  try {
    const wl = await Wishlist.findOne({ user: req.userId }).populate("tours");
    res.json(wl || { user: req.userId, tours: [] });
  } catch (e) {
    res.status(500).json({ message: e.message });
  }
};

export const toggleWishlist = async (req, res) => {
  try {
    const { tourId } = req.body;
    let wl = await Wishlist.findOne({ user: req.userId });

    if (!wl) wl = await Wishlist.create({ user: req.userId, tours: [] });

    const idx = wl.tours.findIndex(t => t.toString() === tourId);
    if (idx >= 0) wl.tours.splice(idx, 1);
    else wl.tours.push(tourId);

    await wl.save();
    await wl.populate("tours");

    res.json(wl);
  } catch (e) {
    res.status(500).json({ message: e.message });
  }
};

