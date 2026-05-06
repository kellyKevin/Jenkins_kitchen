"use client";

import { useEffect, useState } from 'react';
import api from '@/lib/api';
import { ShoppingPlus } from 'lucide-react';

interface MenuItem {
  id: number;
  name: string;
  description: string;
  price: string;
  category: number;
}

interface Category {
  id: number;
  name: string;
  description: string;
  items: MenuItem[];
}

export default function MenuPage() {
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api.get('categories/')
      .then(res => {
        setCategories(res.data);
        setLoading(false);
      })
      .catch(err => {
        console.error(err);
        setLoading(false);
      });
  }, []);

  if (loading) return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-orange-600"></div>
    </div>
  );

  return (
    <div className="bg-gray-50 py-20 min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h1 className="font-playfair text-5xl font-bold mb-4">Our Menu</h1>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Crafted with passion, using only the freshest ingredients. Explore our curated selection of flavors.
          </p>
        </div>

        {categories.map((category) => (
          <div key={category.id} className="mb-20">
            <div className="flex items-center gap-4 mb-8">
              <h2 className="text-3xl font-bold font-playfair">{category.name}</h2>
              <div className="h-px bg-gray-200 flex-1" />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {category.items.map((item) => (
                <div key={item.id} className="bg-white p-6 rounded-3xl border border-gray-100 hover:shadow-xl transition-shadow group">
                  <div className="flex justify-between items-start mb-4">
                    <h3 className="text-xl font-bold group-hover:text-orange-600 transition-colors">{item.name}</h3>
                    <span className="text-orange-600 font-bold text-lg">${item.price}</span>
                  </div>
                  <p className="text-gray-500 text-sm mb-6 leading-relaxed">
                    {item.description}
                  </p>
                  <button className="w-full py-3 bg-gray-50 text-gray-700 rounded-xl font-semibold hover:bg-orange-600 hover:text-white transition-all flex items-center justify-center gap-2">
                    Add to Order
                  </button>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
