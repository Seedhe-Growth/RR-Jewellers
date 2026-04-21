const mongoose = require('mongoose');

const inquirySchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Please provide your name']
  },
  email: {
    type: String,
    required: [true, 'Please provide your email']
  },
  phone: String,
  subject: {
    type: String,
    required: [true, 'Please specify the subject']
  },
  message: {
    type: String,
    required: [true, 'Please provide a message']
  },
  product: {
    type: mongoose.Schema.ObjectId,
    ref: 'Product'
  },
  isResolved: {
    type: Boolean,
    default: false
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

const Inquiry = mongoose.model('Inquiry', inquirySchema);
module.exports = Inquiry;
