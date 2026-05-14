"use client";

import { Tag, Sparkles, Gift } from 'lucide-react';
import Link from 'next/link';
import { motion } from 'framer-motion';

export default function PromotionsPage() {
  const offers = [
    {
      title: "Welcome Offer",
      description: "Enjoy 20% off on your first online order! Use code at checkout.",
      code: "WELCOME20",
      icon: <Tag className="w-8 h-8" />,
      color: "bg-orange-100 text-orange-600"
    },
    {
      title: "Mid-Week Special",
      description: "Buy one, get one free on selected appetizers every Wednesday!",
      code: "BOGO-WED",
      icon: <Sparkles className="w-8 h-8" />,
      color: "bg-blue-100 text-blue-600"
    },
    {
      title: "Weekend Feast",
      description: "Free dessert with any main course ordered on Saturdays and Sundays.",
      code: "WEEKEND",
      icon: <Gift className="w-8 h-8" />,
      color: "bg-purple-100 text-purple-600"
    }
  ];

  return (
    <div className="bg-white py-20 min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-20">
          <h1 className="font-playfair text-5xl font-bold mb-4">Exclusive Offers</h1>
          <p className="text-gray-600 max-w-2xl mx-auto text-lg">
            Delicious deals tailored just for you. Grab them while they&apos;re hot!
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {offers.map((offer, index) => (
            <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="relative group"
            >
              <div className="bg-gray-50 p-10 rounded-[3rem] border border-gray-100 h-full flex flex-col items-center text-center transition-all group-hover:-translate-y-2 group-hover:shadow-2xl group-hover:bg-white">
                <div className={`w-20 h-20 ${offer.color} rounded-2xl flex items-center justify-center mb-8`}>
                  {offer.icon}
                </div>
                <h3 className="text-2xl font-bold mb-4 font-playfair">{offer.title}</h3>
                <p className="text-gray-600 mb-8 flex-1 leading-relaxed">
                  {offer.description}
                </p>
                <div className="bg-white border-2 border-dashed border-gray-300 px-6 py-3 rounded-xl font-mono font-bold text-xl mb-8 group-hover:border-orange-500 transition-colors">
                  {offer.code}
                </div>
                <Link href="/order" className="bg-gray-900 text-white px-8 py-3 rounded-full font-bold hover:bg-orange-600 transition-colors w-full">
                  Claim Now
                </Link>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Newsletter Promo */}
        <div className="mt-32 bg-orange-600 rounded-[3rem] p-12 lg:p-20 text-white relative overflow-hidden">
            <div className="absolute top-0 right-0 opacity-10 -mr-20 -mt-20">
                <Sparkles size={400} />
            </div>
            <div className="relative z-10 max-w-2xl">
                <h2 className="text-4xl font-bold font-playfair mb-6">Never miss a tasty deal again</h2>
                <p className="text-orange-100 text-lg mb-10">
                    Subscribe to our newsletter and be the first to know about seasonal menus, secret events, and exclusive discounts.
                </p>
                <form className="flex flex-col sm:flex-row gap-4">
                    <input
                        type="email"
                        placeholder="your@email.com"
                        className="bg-white/10 border border-white/20 rounded-2xl px-6 py-4 flex-1 text-white placeholder-orange-200 outline-none focus:ring-2 focus:ring-white"
                    />
                    <button className="bg-white text-orange-600 px-10 py-4 rounded-2xl font-bold hover:scale-105 transition-transform">
                        Subscribe
                    </button>
                </form>
            </div>
        </div>
      </div>
    </div>
  );
}
