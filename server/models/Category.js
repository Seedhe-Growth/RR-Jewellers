const mongoose = require('mongoose');

const categorySchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'A category must have a name'],
    unique: true,
    trim: true
  },
  slug: String,
  image: {
    url: String,
    publicId: String
  },
  description: String
});

categorySchema.pre('save', function(next) {
  this.slug = this.name.toLowerCase().split(' ').join('-');
  next();
});

const Category = mongoose.model('Category', categorySchema);
module.exports = Category;
