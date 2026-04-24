const User = require('../models/User');

exports.getWishlist = async (req, res) => {
  try {
    const user = await User.findById(req.user._id).populate('wishlist');
    res.status(200).json({
      status: 'success',
      data: { wishlist: user.wishlist }
    });
  } catch (err) {
    res.status(400).json({ status: 'fail', message: err.message });
  }
};

exports.updateWishlist = async (req, res) => {
  try {
    const user = await User.findById(req.user._id);
    user.wishlist = req.body.wishlist; // Array of product IDs
    await user.save();
    
    const updatedUser = await User.findById(req.user._id).populate('wishlist');
    
    res.status(200).json({
      status: 'success',
      data: { wishlist: updatedUser.wishlist }
    });
  } catch (err) {
    res.status(400).json({ status: 'fail', message: err.message });
  }
};
