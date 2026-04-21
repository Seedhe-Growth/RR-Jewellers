const mongoose = require('mongoose');

const collectionSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'A collection must have a name'],
    unique: true,
    trim: true
  },
  slug: String,
  coverImage: {
    url: String,
    publicId: String
  },
  description: String,
  isFeatured: {
    type: Boolean,
    default: false
  }
});

collectionSchema.pre('save', function(next) {
  this.slug = this.name.toLowerCase().split(' ').join('-');
  next();
});

const Collection = mongoose.model('Collection', collectionSchema);
module.exports = Collection;
