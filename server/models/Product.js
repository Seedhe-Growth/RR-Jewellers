const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, 'A product must have a title'],
    trim: true,
    unique: true
  },
  slug: String,
  description: {
    type: String,
    required: [true, 'A product must have a description']
  },
  price: {
    type: Number,
    required: [true, 'A product must have a price']
  },
  discountPrice: Number,
  materials: [{
    type: String,
  }],
  careInstructions: {
    type: String,
    default: 'Handle with care. Avoid contact with water and perfume.'
  },
  metalWeight: Number, // In grams
  purity: String, // e.g., 18k, 22k
  category: {
    type: mongoose.Schema.ObjectId,
    ref: 'Category',
    required: [true, 'A product must belong to a category']
  },
  collectionId: {
    type: mongoose.Schema.ObjectId,
    ref: 'Collection'
  },
  images: [{
    url: String,
    publicId: String // Cloudinary ID
  }],
  stock: {
    type: Number,
    default: 10
  },
  isFeatured: {
    type: Boolean,
    default: false
  },
  isNewArrival: {
    type: Boolean,
    default: true
  },
  sku: {
    type: String,
    unique: true
  },
  ratingsAverage: {
    type: Number,
    default: 4.5,
    min: [1, 'Rating must be above 1.0'],
    max: [5, 'Rating must be below 5.0'],
    set: val => Math.round(val * 10) / 10
  },
  ratingsQuantity: {
    type: Number,
    default: 0
  },
  createdAt: {
    type: Date,
    default: Date.now,
    select: false
  }
}, {
  toJSON: { virtuals: true },
  toObject: { virtuals: true }
});

// Slugify title before saving
productSchema.pre('save', function(next) {
  this.slug = this.title.toLowerCase().split(' ').join('-');
  next();
});

const Product = mongoose.model('Product', productSchema);
module.exports = Product;
