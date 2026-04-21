import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

const categories = [
  {
    name: 'Bangles & Bracelets',
    slug: 'bangles',
    image: 'https://images.unsplash.com/photo-1611591437281-460bfbe1220a?auto=format&fit=crop&q=80&w=800',
    gridArea: 'lg:col-span-2 lg:row-span-2'
  },
  {
    name: 'Earrings',
    slug: 'earrings',
    image: 'https://images.unsplash.com/photo-1535633302703-94209144bd48?auto=format&fit=crop&q=80&w=800',
    gridArea: ''
  },
  {
    name: 'Necklaces',
    slug: 'necklaces',
    image: 'https://images.unsplash.com/photo-1599643477877-530eb83abc8e?auto=format&fit=crop&q=80&w=800',
    gridArea: ''
  },
  {
    name: 'Daily Wear',
    slug: 'minimal',
    image: 'https://images.unsplash.com/photo-1601121141461-9d6647bca1ed?auto=format&fit=crop&q=80&w=800',
    gridArea: 'lg:col-span-2'
  }
];

const CategoryGrid = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 h-auto">
      {categories.map((cat, idx) => (
        <motion.div
          key={cat.slug}
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: idx * 0.1 }}
          className={`relative overflow-hidden group cursor-pointer h-80 ${cat.gridArea}`}
        >
          <Link to={`/shop?cat=${cat.slug}`}>
            <img 
              src={cat.image} 
              alt={cat.name} 
              className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-60 group-hover:opacity-80 transition-opacity" />
            <div className="absolute inset-0 flex flex-col justify-end p-8">
              <h3 className="text-xl font-serif text-white tracking-widest uppercase mb-1 drop-shadow-lg">
                {cat.name}
              </h3>
              <span className="text-primary text-xs uppercase tracking-[0.3em] font-semibold opacity-0 group-hover:opacity-100 transition-all transform translate-y-4 group-hover:translate-y-0">
                Explore Collection
              </span>
            </div>
            <div className="absolute top-4 right-4 w-12 h-12 border border-white/20 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-500 scale-50 group-hover:scale-100">
               <div className="w-2 h-2 bg-primary rounded-full animate-ping" />
            </div>
          </Link>
        </motion.div>
      ))}
    </div>
  );
};

export default CategoryGrid;
