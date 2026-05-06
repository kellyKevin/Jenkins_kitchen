import Link from 'next/link';
import { ArrowRight, Utensils, Clock, MapPin } from 'lucide-react';

export default function Home() {
  return (
    <div className="overflow-hidden">
      {/* Hero Section */}
      <section className="relative h-[90vh] flex items-center">
        <div className="absolute inset-0 bg-gradient-to-r from-black/70 to-black/30 z-10" />
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: "url('https://images.unsplash.com/photo-1514362545857-3bc16c4c7d1b?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&q=80')" }}
        />

        <div className="relative z-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-white">
          <h1 className="font-playfair text-5xl md:text-7xl font-bold mb-6 max-w-2xl leading-tight">
            Delicious Meals, <span className="text-orange-500">Made with Love</span>
          </h1>
          <p className="text-lg md:text-xl text-gray-200 mb-8 max-w-xl leading-relaxed">
            Discover our amazing dishes and enjoy an unforgettable dining experience.
            From our kitchen to your heart.
          </p>
          <div className="flex flex-col sm:flex-row gap-4">
            <Link href="/menu" className="bg-orange-600 hover:bg-orange-700 text-white px-8 py-4 rounded-full font-bold text-lg transition-all flex items-center justify-center gap-2">
              View Menu
              <Utensils size={20} />
            </Link>
            <Link href="/about" className="bg-white/10 hover:bg-white/20 backdrop-blur-md text-white border border-white/30 px-8 py-4 rounded-full font-bold text-lg transition-all flex items-center justify-center gap-2">
              Our Story
              <ArrowRight size={20} />
            </Link>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-24 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            <div className="text-center group">
              <div className="w-16 h-16 bg-orange-100 text-orange-600 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform">
                <Utensils size={32} />
              </div>
              <h3 className="text-xl font-bold mb-4">Fresh Ingredients</h3>
              <p className="text-gray-600">We use only the finest, locally sourced organic produce for every dish.</p>
            </div>
            <div className="text-center group">
              <div className="w-16 h-16 bg-blue-100 text-blue-600 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform">
                <Clock size={32} />
              </div>
              <h3 className="text-xl font-bold mb-4">Fast Delivery</h3>
              <p className="text-gray-600">Hungry? We ensure your food arrives hot and fresh in under 30 minutes.</p>
            </div>
            <div className="text-center group">
              <div className="w-16 h-16 bg-green-100 text-green-600 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform">
                <MapPin size={32} />
              </div>
              <h3 className="text-xl font-bold mb-4">Easy Pickup</h3>
              <p className="text-gray-600">Choose from 3 convenient locations across the city for quick pickup.</p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center bg-orange-600 rounded-[3rem] py-16 text-white shadow-2xl shadow-orange-200">
          <h2 className="font-playfair text-4xl font-bold mb-6">Ready to taste perfection?</h2>
          <p className="text-orange-100 mb-10 text-lg max-w-2xl mx-auto">
            Order now and get 20% off your first meal with us. Use code WELCOME20 at checkout.
          </p>
          <Link href="/order" className="bg-white text-orange-600 px-10 py-4 rounded-full font-black text-lg hover:scale-105 transition-transform inline-block">
            Order Online Now
          </Link>
        </div>
      </section>
    </div>
  );
}
