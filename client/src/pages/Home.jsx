import Hero from '../components/home/Hero';
import CategoryGrid from '../components/home/CategoryGrid';
// import FeaturedProducts from '../components/home/FeaturedProducts';
// import StorySection from '../components/home/StorySection';

const Home = () => {
  return (
    <div className="bg-luxury-black">
      <Hero />
      <div className="section-padding">
        <div className="flex flex-col items-center mb-16 text-center">
          <span className="text-primary tracking-[0.4em] uppercase text-[10px] mb-4">Discover beauty</span>
          <h2 className="text-3xl md:text-5xl font-serif">Browse by <span className="gold-text italic">Collections</span></h2>
        </div>
        <CategoryGrid />
      </div>
      
      {/* Featured Products will go here */}
      <div className="bg-white/3 py-24 section-padding">
         <div className="flex flex-col items-center mb-16 text-center">
          <span className="text-primary tracking-[0.4em] uppercase text-[10px] mb-4">Our Best</span>
          <h2 className="text-3xl md:text-5xl font-serif">Timeless <span className="gold-text italic">Masterpieces</span></h2>
        </div>
        <p className="text-center text-white/50 italic mb-10">Premium curated pieces for special moments.</p>
        {/* <FeaturedProducts /> */}
      </div>

      {/* Brand Story will go here */}
    </div>
  );
};

export default Home;
