const Inquiry = require('../models/Inquiry');

exports.createInquiry = async (req, res) => {
  try {
    const newInquiry = await Inquiry.create(req.body);
    res.status(201).json({
      status: 'success',
      data: { inquiry: newInquiry }
    });
  } catch (err) {
    res.status(400).json({ status: 'fail', message: err.message });
  }
};

exports.getAllInquiries = async (req, res) => {
  try {
    const inquiries = await Inquiry.find().sort('-createdAt');
    res.status(200).json({
      status: 'success',
      results: inquiries.length,
      data: { inquiries }
    });
  } catch (err) {
    res.status(400).json({ status: 'fail', message: err.message });
  }
};
