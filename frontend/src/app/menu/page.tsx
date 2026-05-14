"use client";

import { useEffect, useState, useMemo } from 'react';
import api from '@/lib/api';
import { ShoppingCart, Check, Search, Filter, ArrowUpDown } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useCart } from '@/lib/CartContext';

interface MenuItem {
  id: number;
  name: string;
  description: string;
  price: string;
  category: number;
  image_url?: string;
}

interface Category {
  id: number;
  name: string;
  description: string;
  items: MenuItem[];
}

type SortOption = 'none' | 'price-asc' | 'price-desc' | 'name-asc' | 'name-desc';

export default function MenuPage() {
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);
  const { addToCart } = useCart();
  const [addedItems, setAddedItems] = useState<Record<number, boolean>>({});

  // Filtering and Sorting State
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<number | 'all'>('all');
  const [sortBy, setSortBy] = useState<SortOption>('none');

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

  const filteredAndSortedItems = useMemo(() => {
    // Flatten all items from all categories if we're filtering across categories
    // or keep them grouped if we just want to filter within them.
    // The request asks for "list items available every food possible use sorting, filtering"
    // which suggests a more global list might be better, or at least highly filterable.

    const allItems: (MenuItem & { categoryName: string })[] = [];
    categories.forEach(cat => {
      cat.items.forEach(item => {
        allItems.push({ ...item, categoryName: cat.name });
      });
    });

    // 1. Filter
    const result = allItems.filter(item => {
      const matchesSearch = item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                           item.description.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesCategory = selectedCategory === 'all' || item.category === selectedCategory;
      return matchesSearch && matchesCategory;
    });

    // 2. Sort
    if (sortBy !== 'none') {
      result.sort((a, b) => {
        switch (sortBy) {
          case 'price-asc':
            return parseFloat(a.price) - parseFloat(b.price);
          case 'price-desc':
            return parseFloat(b.price) - parseFloat(a.price);
          case 'name-asc':
            return a.name.localeCompare(b.name);
          case 'name-desc':
            return b.name.localeCompare(a.name);
          default:
            return 0;
        }
      });
    }

    return result;
  }, [categories, searchQuery, selectedCategory, sortBy]);

  if (loading) return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-orange-600"></div>
    </div>
  );

  return (
    <div className="bg-gray-50 py-20 min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h1 className="font-playfair text-5xl font-bold mb-4">Our Menu</h1>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Crafted with passion, using only the freshest ingredients. Explore our curated selection of flavors.
          </p>
        </div>

        {/* Search and Filters */}
        <div className="bg-white p-6 rounded-3xl shadow-sm border border-gray-100 mb-12 flex flex-col md:flex-row gap-4 items-center justify-between">
          <div className="relative w-full md:w-96">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
            <input
              type="text"
              placeholder="Search dishes or drinks..."
              className="w-full pl-10 pr-4 py-2 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>

          <div className="flex flex-wrap gap-4 w-full md:w-auto">
            <div className="flex items-center gap-2">
              <Filter size={18} className="text-gray-500" />
              <select
                className="bg-gray-50 border border-gray-200 rounded-xl px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-orange-500"
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value === 'all' ? 'all' : parseInt(e.target.value))}
              >
                <option value="all">All Categories</option>
                {categories.map(cat => (
                  <option key={cat.id} value={cat.id}>{cat.name}</option>
                ))}
              </select>
            </div>

            <div className="flex items-center gap-2">
              <ArrowUpDown size={18} className="text-gray-500" />
              <select
                className="bg-gray-50 border border-gray-200 rounded-xl px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-orange-500"
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value as SortOption)}
              >
                <option value="none">Sort by</option>
                <option value="price-asc">Price: Low to High</option>
                <option value="price-desc">Price: High to Low</option>
                <option value="name-asc">Name: A to Z</option>
                <option value="name-desc">Name: Z to A</option>
              </select>
            </div>
          </div>
        </div>

        {/* Results */}
        {filteredAndSortedItems.length === 0 ? (
          <div className="text-center py-20">
            <p className="text-xl text-gray-500 italic">No items found matching your criteria.</p>
            <button
              onClick={() => {setSearchQuery(''); setSelectedCategory('all'); setSortBy('none');}}
              className="mt-4 text-orange-600 font-semibold hover:underline"
            >
              Reset all filters
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <AnimatePresence mode="popLayout">
              {filteredAndSortedItems.map((item) => (
                <motion.div
                  key={item.id}
                  layout
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  whileHover={{ y: -5 }}
                  className="bg-white p-6 rounded-3xl border border-gray-100 hover:shadow-xl transition-shadow group h-full flex flex-col"
                >
                  <div className="flex justify-between items-start mb-4">
                    <div>
                      <span className="text-[10px] font-bold uppercase tracking-widest text-orange-600 mb-1 block">
                        {item.categoryName}
                      </span>
                      <h3 className="text-xl font-bold group-hover:text-orange-600 transition-colors">{item.name}</h3>
                    </div>
                    <span className="text-orange-600 font-bold text-lg">${item.price}</span>
                  </div>
                  <p className="text-gray-500 text-sm mb-6 leading-relaxed flex-grow">
                    {item.description}
                  </p>
                  <button
                    onClick={() => {
                      addToCart(item);
                      setAddedItems({ ...addedItems, [item.id]: true });
                      setTimeout(() => {
                        setAddedItems(prev => ({ ...prev, [item.id]: false }));
                      }, 2000);
                    }}
                    className={`w-full py-3 rounded-xl font-semibold transition-all flex items-center justify-center gap-2 mt-auto ${
                      addedItems[item.id]
                        ? "bg-green-100 text-green-700"
                        : "bg-gray-50 text-gray-700 hover:bg-orange-600 hover:text-white"
                    }`}
                  >
                    {addedItems[item.id] ? (
                      <>
                        <Check size={18} />
                        Added
                      </>
                    ) : (
                      <>
                        <ShoppingCart size={18} />
                        Add to Order
                      </>
                    )}
                  </button>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        )}
      </div>
    </div>
  );
}
