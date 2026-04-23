const Review = require('../models/Review');
const Product = require('../models/Product');

exports.getAllReviews = async (req, res) => {
  try {
    let filter = {};
    if (req.params.productId) filter = { product: req.params.productId };

    const reviews = await Review.find(filter).populate('user', 'name');

    res.status(200).json({
      status: 'success',
      results: reviews.length,
      data: { reviews }
    });
  } catch (err) {
    res.status(400).json({ status: 'fail', message: err.message });
  }
};

exports.createReview = async (req, res) => {
  try {
    // Allow nested routes
    if (!req.body.product) req.body.product = req.params.productId;
    if (!req.body.user) req.body.user = req.user._id;

    const newReview = await Review.create(req.body);

    // Update product ratings
    const stats = await Review.aggregate([
      { $match: { product: newReview.product } },
      {
        $group: {
          _id: '$product',
          nRating: { $sum: 1 },
          avgRating: { $avg: '$rating' }
        }
      }
    ]);

    if (stats.length > 0) {
      await Product.findByIdAndUpdate(req.body.product, {
        ratingsQuantity: stats[0].nRating,
        ratingsAverage: stats[0].avgRating
      });
    }

    res.status(201).json({
      status: 'success',
      data: { review: newReview }
    });
  } catch (err) {
    res.status(400).json({ status: 'fail', message: err.message });
  }
};
