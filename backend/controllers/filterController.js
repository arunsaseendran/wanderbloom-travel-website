import Tour from "../models/Tour.js";
import Review from "../models/Review.js";

export const filterTours = async (req, res) => {
  try {
    const { priceMin, priceMax, durationMin, durationMax, category, sort, ratingMin } = req.query;
    const match = {};
    if (priceMin || priceMax) match.price = {};
    if (priceMin) match.price.$gte = Number(priceMin);
    if (priceMax) match.price.$lte = Number(priceMax);
    if (durationMin || durationMax) match.distance = {};
    if (durationMin) match.distance.$gte = Number(durationMin);
    if (durationMax) match.distance.$lte = Number(durationMax);
    if (category) match.category = category;

    const pipeline = [
      { $match: match },
      { $lookup: { from: "reviews", localField: "_id", foreignField: "tour", as: "reviews" } },
      { $addFields: { 
          averageRating: { $cond: [
            { $gt: [ { $size: "$reviews" }, 0 ] },
            { $avg: "$reviews.rating" },
            0
          ] } 
        }
      },
    ];

    if (ratingMin) {
      pipeline.push({ $match: { averageRating: { $gte: Number(ratingMin) } } });
    }

    const sortStage = {};
    if (sort === "price_asc") sortStage.price = 1;
    else if (sort === "price_desc") sortStage.price = -1;
    else if (sort === "rating_desc") sortStage.averageRating = -1;
    else if (sort === "popular") sortStage.bookingsCount = -1;
    if (Object.keys(sortStage).length) {
      pipeline.push({ $sort: sortStage });
    }

    res.json(await Tour.aggregate(pipeline));
  } catch (e) {
    res.status(500).json({ message: e.message });
  }
};
