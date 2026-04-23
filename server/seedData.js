const mongoose = require('mongoose');
const dotenv = require('dotenv');
const Category = require('./models/Category');
const Collection = require('./models/Collection');
const Product = require('./models/Product');

dotenv.config();

const categories = [
  { name: 'Necklaces', description: 'Timeless elegance for your neck' },
  { name: 'Earrings', description: 'Radiant sparkles for your ears' },
  { name: 'Rings', description: 'Symbols of eternal beauty' },
  { name: 'Bangles', description: 'Graceful adornments for your wrists' }
];

const collections = [
  { name: 'Bridal Grandeur', description: 'Magnificent pieces for your special day', isFeatured: true, coverImage: 'https://images.unsplash.com/photo-1611085583191-a3b1a3089d9a?auto=format&fit=crop&q=80&w=1200' },
  { name: 'Minimalist Chic', description: 'Understated elegance for daily wear', isFeatured: false, coverImage: 'https://images.unsplash.com/photo-1602173574767-37ac01994b2a?auto=format&fit=crop&q=80&w=1200' },
  { name: 'The Golden Hour', description: 'Warm, radiant designs that capture the light', isFeatured: true, coverImage: 'https://images.unsplash.com/photo-1603561591411-07134e71a2a9?auto=format&fit=crop&q=80&w=1200' }
];

const products = [
  // Necklaces
  {
    title: 'Emerald Radiance Necklace',
    description: 'A stunning emerald-encrusted necklace set in 22k gold, perfect for bridal wear.',
    price: 45000,
    categoryName: 'Necklaces',
    collectionName: 'Bridal Grandeur',
    images: [{ url: 'https://images.unsplash.com/photo-1617038220319-276d3cfab638?auto=format&fit=crop&q=80&w=800' }],
    metalWeight: 25,
    purity: '22k',
    sku: 'NK-EM-001'
  },
  {
    title: 'Solitaire Pearl Pendant',
    description: 'A classic freshwater pearl pendant on a delicate 18k gold chain.',
    price: 12500,
    categoryName: 'Necklaces',
    collectionName: 'Minimalist Chic',
    images: [{ url: 'https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?auto=format&fit=crop&q=80&w=800' }],
    metalWeight: 5,
    purity: '18k',
    sku: 'NK-PL-002'
  },
  // Earrings
  {
    title: 'Diamond Halo Studs',
    description: 'Breathtaking diamond studs surrounded by a shimmering halo of smaller gems.',
    price: 28000,
    categoryName: 'Earrings',
    collectionName: 'Minimalist Chic',
    images: [{ url: 'https://images.unsplash.com/photo-1584302179602-e4c3d3fd629d?auto=format&fit=crop&q=80&w=800' }],
    metalWeight: 3.5,
    purity: '18k',
    sku: 'ER-DM-001'
  },
  {
    title: 'Filigree Jhumkas',
    description: 'Traditionally crafted gold jhumkas with intricate filigree work and ruby drops.',
    price: 32000,
    categoryName: 'Earrings',
    collectionName: 'The Golden Hour',
    images: [{ url: 'https://images.unsplash.com/photo-1626784215021-2e39ccf971cd?auto=format&fit=crop&q=80&w=800' }],
    metalWeight: 15,
    purity: '22k',
    sku: 'ER-GH-002'
  },
  // Rings
  {
    title: 'Sapphire Infinity Ring',
    description: 'A beautiful infinity-style ring featuring deep blue sapphires and pavé diamonds.',
    price: 18500,
    categoryName: 'Rings',
    collectionName: 'Minimalist Chic',
    images: [{ url: 'https://images.unsplash.com/photo-1599643477877-530eb83abc8e?auto=format&fit=crop&q=80&w=800' }],
    metalWeight: 4,
    purity: '18k',
    sku: 'RG-SP-001'
  },
  {
    title: 'Royal Meenakari Ring',
    description: 'An oversized statement ring with vibrant enamel (Meenakari) and kundan stones.',
    price: 15000,
    categoryName: 'Rings',
    collectionName: 'The Golden Hour',
    images: [{ url: 'https://images.unsplash.com/photo-1601121141461-9d6647bca1ed?auto=format&fit=crop&q=80&w=800' }],
    metalWeight: 12,
    purity: '22k',
    sku: 'RG-MK-002'
  },
  // Bangles
  {
    title: 'Solid Gold Kada',
    description: 'A bold, sleek gold kada designed for the modern woman who loves classics.',
    price: 55000,
    categoryName: 'Bangles',
    collectionName: 'The Golden Hour',
    images: [{ url: 'https://images.unsplash.com/photo-1611591437281-460bfbe1220a?auto=format&fit=crop&q=80&w=800' }],
    metalWeight: 30,
    purity: '22k',
    sku: 'BN-GK-001'
  },
  {
    title: 'Floral Enamel Bangles',
    description: 'A set of two bangles with delicate floral enamel work in shades of blue and white.',
    price: 38000,
    categoryName: 'Bangles',
    collectionName: 'Bridal Grandeur',
    images: [{ url: 'https://images.unsplash.com/photo-1576053139778-7e32f2ae3cfd?auto=format&fit=crop&q=80&w=800' }],
    metalWeight: 20,
    purity: '22k',
    sku: 'BN-FL-002'
  }
];

const seedDB = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('Connected to DB for seeding...');

    // Clear existing
    await Category.deleteMany({});
    await Collection.deleteMany({});
    await Product.deleteMany({});
    console.log('Cleared existing data.');

    // Create Categories
    const createdCategories = await Category.insertMany(categories.map(c => ({
      ...c,
      slug: c.name.toLowerCase()
    })));
    console.log('Categories seeded.');

    // Create Collections
    const createdCollections = await Collection.insertMany(collections.map(c => ({
      ...c,
      slug: c.name.toLowerCase().split(' ').join('-'),
      coverImage: { url: c.coverImage }
    })));
    console.log('Collections seeded.');

    // Create Products
    const finalProducts = products.map(p => {
      const category = createdCategories.find(c => c.name === p.categoryName);
      const collection = createdCollections.find(c => c.name === p.collectionName);
      
      const { categoryName, collectionName, ...rest } = p;
      return {
        ...rest,
        category: category._id,
        collectionId: collection._id,
        slug: p.title.toLowerCase().split(' ').join('-')
      };
    });

    await Product.insertMany(finalProducts);
    console.log('Products seeded.');

    console.log('Database seeding completed successfully!');
    process.exit(0);
  } catch (error) {
    console.error('Seeding error:', error);
    process.exit(1);
  }
};

seedDB();
