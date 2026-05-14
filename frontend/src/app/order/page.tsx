"use client";

import { useState, useEffect } from 'react';
import api from '@/lib/api';
import { Send, CheckCircle2 } from 'lucide-react';
import { motion } from 'framer-motion';

interface MenuItem {
  id: number;
  name: string;
  price: string;
}

export default function OrderPage() {
  const [menuItems, setMenuItems] = useState<MenuItem[]>([]);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    mealId: '',
    quantity: 1
  });
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    api.get('menu-items/')
      .then(res => setMenuItems(res.data))
      .catch(err => console.error(err));
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const selectedItem = menuItems.find(i => i.id === parseInt(formData.mealId));
      if (!selectedItem) return;

      const totalPrice = (parseFloat(selectedItem.price) * formData.quantity).toFixed(2);

      await api.post('orders/', {
        customer_name: formData.name,
        customer_email: formData.email,
        total_price: totalPrice,
        items: [{
          menu_item: selectedItem.id,
          quantity: formData.quantity,
          price: selectedItem.price
        }]
      });

      setSubmitted(true);
    } catch (err) {
      alert("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  if (submitted) return (
    <div className="min-h-[70vh] flex flex-col items-center justify-center text-center px-4">
      <CheckCircle2 size={80} className="text-green-500 mb-6" />
      <h2 className="text-4xl font-bold font-playfair mb-4">Order Received!</h2>
      <p className="text-gray-600 text-lg mb-8 max-w-md">
        Thank you for choosing JENIKS KITCHEN. We'll send a confirmation to your email shortly.
      </p>
      <button
        onClick={() => setSubmitted(false)}
        className="bg-orange-600 text-white px-8 py-3 rounded-full font-bold"
      >
        Place Another Order
      </button>
    </div>
  );

  return (
    <div className="bg-gray-50 py-20 min-h-screen">
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8"
      >
        <div className="bg-white rounded-[2rem] shadow-xl overflow-hidden">
          <div className="bg-orange-600 p-12 text-white text-center">
            <h1 className="text-4xl font-bold font-playfair mb-2">Order Online</h1>
            <p className="text-orange-100">Delicious food delivered to your doorstep</p>
          </div>

          <form onSubmit={handleSubmit} className="p-12 space-y-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div>
                <label className="block text-sm font-bold text-gray-700 mb-2 uppercase tracking-wider">Your Name</label>
                <input
                  required
                  className="w-full bg-gray-50 border-0 rounded-2xl px-6 py-4 focus:ring-2 focus:ring-orange-600 outline-none transition-all"
                  placeholder="John Doe"
                  value={formData.name}
                  onChange={e => setFormData({...formData, name: e.target.value})}
                />
              </div>
              <div>
                <label className="block text-sm font-bold text-gray-700 mb-2 uppercase tracking-wider">Email Address</label>
                <input
                  required
                  type="email"
                  className="w-full bg-gray-50 border-0 rounded-2xl px-6 py-4 focus:ring-2 focus:ring-orange-600 outline-none transition-all"
                  placeholder="john@example.com"
                  value={formData.email}
                  onChange={e => setFormData({...formData, email: e.target.value})}
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="md:col-span-2">
                <label className="block text-sm font-bold text-gray-700 mb-2 uppercase tracking-wider">Select Dish</label>
                <select
                  required
                  className="w-full bg-gray-50 border-0 rounded-2xl px-6 py-4 focus:ring-2 focus:ring-orange-600 outline-none transition-all appearance-none cursor-pointer"
                  value={formData.mealId}
                  onChange={e => setFormData({...formData, mealId: e.target.value})}
                >
                  <option value="">-- Choose a meal --</option>
                  {menuItems.map(item => (
                    <option key={item.id} value={item.id}>{item.name} (${item.price})</option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-sm font-bold text-gray-700 mb-2 uppercase tracking-wider">Quantity</label>
                <input
                  type="number"
                  min="1"
                  required
                  className="w-full bg-gray-50 border-0 rounded-2xl px-6 py-4 focus:ring-2 focus:ring-orange-600 outline-none transition-all"
                  value={formData.quantity}
                  onChange={e => setFormData({...formData, quantity: parseInt(e.target.value)})}
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-gray-900 text-white py-5 rounded-2xl font-bold text-lg hover:bg-black transition-colors flex items-center justify-center gap-3 disabled:opacity-50"
            >
              {loading ? "Processing..." : (
                <>
                  Confirm Order
                  <Send size={20} />
                </>
              )}
            </button>
          </form>
        </div>
      </motion.div>
    </div>
  );
}
