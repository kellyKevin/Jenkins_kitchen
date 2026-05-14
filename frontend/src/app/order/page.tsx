"use client";

import { useState } from 'react';
import api from '@/lib/api';
import { Send, CheckCircle2, ShoppingBag, Trash2, ArrowLeft } from 'lucide-react';
import { useCart } from '@/lib/CartContext';
import Link from 'next/link';

export default function OrderPage() {
  const { items, totalPrice, clearCart, removeFromCart } = useCart();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
  });
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (items.length === 0) {
      alert("Your cart is empty!");
      return;
    }
    setLoading(true);

    try {
      const orderData = {
        customer_name: formData.name,
        customer_email: formData.email,
        total_price: totalPrice.toFixed(2),
        items: items.map(item => ({
          menu_item: item.id,
          quantity: item.quantity,
          price: item.price
        }))
      };

      await api.post('orders/', orderData);

      // Track purchase events
      for (const item of items) {
        api.post('analytics/', {
          event_type: 'PURCHASE',
          menu_item: item.id,
          session_id: 'temp-session'
        }).catch(err => console.error(err));
      }

      clearCart();
      setSubmitted(true);
    } catch {
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
        Thank you for choosing JENIKS KITCHEN. We&apos;ll send a confirmation to your email shortly.
      </p>
      <button
        onClick={() => setSubmitted(false)}
        className="bg-orange-600 text-white px-8 py-3 rounded-full font-bold"
      >
        Place Another Order
      </button>
    </div>
  );

  if (items.length === 0) return (
    <div className="min-h-[70vh] flex flex-col items-center justify-center text-center px-4">
      <div className="bg-gray-50 p-8 rounded-full mb-6">
        <ShoppingBag size={60} className="text-gray-300" />
      </div>
      <h2 className="text-3xl font-bold font-playfair mb-4">Your Cart is Empty</h2>
      <p className="text-gray-500 mb-8 max-w-sm">
        Add some delicious meals from our menu to start your order.
      </p>
      <Link
        href="/menu"
        className="bg-orange-600 text-white px-8 py-3 rounded-full font-bold flex items-center gap-2"
      >
        <ArrowLeft size={18} />
        Back to Menu
      </Link>
    </div>
  );

  return (
    <div className="bg-gray-50 py-20 min-h-screen">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col lg:flex-row gap-12">
          {/* Order Summary */}
          <div className="flex-1">
            <h1 className="text-3xl font-bold font-playfair mb-8 flex items-center gap-3">
              <ShoppingBag className="text-orange-600" />
              Order Summary
            </h1>
            <div className="bg-white rounded-3xl shadow-sm border border-gray-100 overflow-hidden">
              <div className="divide-y divide-gray-100">
                {items.map((item) => (
                  <div key={item.id} className="p-6 flex items-center gap-4 group">
                    <div className="flex-1">
                      <h3 className="font-bold text-gray-900">{item.name}</h3>
                      <p className="text-gray-500 text-sm">Quantity: {item.quantity}</p>
                    </div>
                    <div className="text-right">
                      <p className="font-bold text-gray-900">${(parseFloat(item.price) * item.quantity).toFixed(2)}</p>
                      <button
                        onClick={() => removeFromCart(item.id)}
                        className="text-red-500 text-xs font-semibold hover:underline mt-1 flex items-center gap-1 ml-auto"
                      >
                        <Trash2 size={12} /> Remove
                      </button>
                    </div>
                  </div>
                ))}
              </div>
              <div className="p-6 bg-gray-50 border-t border-gray-100">
                <div className="flex justify-between items-center">
                  <span className="text-gray-600 font-bold">Total Amount</span>
                  <span className="text-3xl font-black text-orange-600">${totalPrice.toFixed(2)}</span>
                </div>
              </div>
            </div>
          </div>

          {/* Checkout Form */}
          <div className="w-full lg:w-[400px]">
            <div className="bg-white rounded-3xl shadow-xl border border-gray-100 p-8 sticky top-24">
              <h2 className="text-2xl font-bold font-playfair mb-6">Delivery Details</h2>
              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <label className="block text-xs font-bold text-gray-400 mb-2 uppercase tracking-widest">Full Name</label>
                  <input
                    required
                    className="w-full bg-gray-50 border-0 rounded-2xl px-6 py-4 focus:ring-2 focus:ring-orange-600 outline-none transition-all"
                    placeholder="Enter your name"
                    value={formData.name}
                    onChange={e => setFormData({...formData, name: e.target.value})}
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-gray-400 mb-2 uppercase tracking-widest">Email Address</label>
                  <input
                    required
                    type="email"
                    className="w-full bg-gray-50 border-0 rounded-2xl px-6 py-4 focus:ring-2 focus:ring-orange-600 outline-none transition-all"
                    placeholder="your@email.com"
                    value={formData.email}
                    onChange={e => setFormData({...formData, email: e.target.value})}
                  />
                </div>

                <div className="pt-4">
                  <button
                    type="submit"
                    disabled={loading}
                    className="w-full bg-orange-600 text-white py-5 rounded-2xl font-bold text-lg hover:bg-orange-700 transition-all shadow-lg shadow-orange-200 flex items-center justify-center gap-3 disabled:opacity-50"
                  >
                    {loading ? "Processing..." : (
                      <>
                        Place Order
                        <Send size={20} />
                      </>
                    )}
                  </button>
                  <p className="text-center text-gray-400 text-xs mt-4">
                    By placing this order you agree to our Terms of Service.
                  </p>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
