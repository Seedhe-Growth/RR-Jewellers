const mongoose = require('mongoose');
const dotenv = require('dotenv');
const Product = require('./models/Product');
const Category = require('./models/Category');

dotenv.config();

const checkDB = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('Connected to DB');

    const productCount = await Product.countDocuments();
    const categoryCount = await Category.countDocuments();

    console.log(`Products: ${productCount}`);
    console.log(`Categories: ${categoryCount}`);

    if (categoryCount > 0) {
      const categories = await Category.find();
      console.log('Categories:', categories.map(c => c.name));
    }

    if (productCount > 0) {
      const products = await Product.find().limit(5);
      console.log('First 5 Products:', products.map(p => p.title));
    }

    process.exit(0);
  } catch (error) {
    console.error('Error:', error);
    process.exit(1);
  }
};

checkDB();
