const Product = require('../models/Product');
const Category = require('../models/Category');

exports.getAllProducts = async (req, res) => {
  try {
    const { category, sort, priceRange } = req.query;
    let query = {};

    if (category && category !== 'all') {
      const categoryDoc = await Category.findOne({ slug: category });
      if (categoryDoc) query.category = categoryDoc._id;
    }

    let queryPromise = Product.find(query).populate('category');

    // Sorting
    if (sort) {
      const sortBy = sort === 'newest' ? '-createdAt' : 
                     sort === 'low-high' ? 'price' : 
                     sort === 'high-low' ? '-price' : '-ratingsAverage';
      queryPromise = queryPromise.sort(sortBy);
    }

    const products = await queryPromise;

    res.status(200).json({
      status: 'success',
      results: products.length,
      data: { products }
    });
  } catch (err) {
    res.status(400).json({ status: 'fail', message: err.message });
  }
};

exports.getProduct = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id).populate('category');
    if (!product) {
      return res.status(404).json({ status: 'fail', message: 'Product not found' });
    }
    res.status(200).json({ status: 'success', data: { product } });
  } catch (err) {
    res.status(400).json({ status: 'fail', message: err.message });
  }
};

exports.createProduct = async (req, res) => {
  try {
    const newProduct = await Product.create(req.body);
    res.status(201).json({ status: 'success', data: { product: newProduct } });
  } catch (err) {
    res.status(400).json({ status: 'fail', message: err.message });
  }
};

exports.updateProduct = async (req, res) => {
  try {
    const product = await Product.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true
    });
    res.status(200).json({ status: 'success', data: { product } });
  } catch (err) {
    res.status(400).json({ status: 'fail', message: err.message });
  }
};

exports.deleteProduct = async (req, res) => {
  try {
    await Product.findByIdAndDelete(req.params.id);
    res.status(204).json({ status: 'success', data: null });
  } catch (err) {
    res.status(400).json({ status: 'fail', message: err.message });
  }
};
