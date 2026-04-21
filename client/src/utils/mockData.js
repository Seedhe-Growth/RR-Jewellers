export const MOCK_PRODUCTS = [
  {
    _id: '1',
    title: 'Eternal Gold Bangle',
    price: 45000,
    discountPrice: 42000,
    category: { name: 'Bangles', slug: 'bangles' },
    images: [{ url: 'https://images.unsplash.com/photo-1611591437281-460bfbe1220a?auto=format&fit=crop&q=80&w=800' }],
    material: 'Gold',
    sku: 'RRJ-B001'
  },
  {
    _id: '2',
    title: 'Starlight Diamond Studs',
    price: 25000,
    category: { name: 'Earrings', slug: 'earrings' },
    images: [{ url: 'https://images.unsplash.com/photo-1535633302703-94209144bd48?auto=format&fit=crop&q=80&w=800' }],
    material: 'Diamond',
    sku: 'RRJ-E001'
  },
  {
    _id: '3',
    title: 'Royal Emerald Pendant',
    price: 85000,
    discountPrice: 79000,
    category: { name: 'Necklaces', slug: 'necklaces' },
    images: [{ url: 'https://images.unsplash.com/photo-1599643477877-530eb83abc8e?auto=format&fit=crop&q=80&w=800' }],
    material: 'Platinum',
    sku: 'RRJ-N001'
  },
  {
    _id: '4',
    title: 'Minimalist Rose Bracelet',
    price: 12000,
    category: { name: 'Bangles', slug: 'bangles' },
    images: [{ url: 'https://images.unsplash.com/photo-1601121141461-9d6647bca1ed?auto=format&fit=crop&q=80&w=800' }],
    material: 'Rose Gold',
    sku: 'RRJ-B002'
  }
];

export const CATEGORIES = [
  { name: 'All', slug: 'all' },
  { name: 'Bangles', slug: 'bangles' },
  { name: 'Earrings', slug: 'earrings' },
  { name: 'Necklaces', slug: 'necklaces' },
  { name: 'Pendants', slug: 'pendants' }
];
