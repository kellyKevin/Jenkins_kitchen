"use client";

import Link from 'next/link';
import { ShoppingCart, Menu as MenuIcon, X } from 'lucide-react';
import { useState } from 'react';

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="bg-white/80 backdrop-blur-md sticky top-0 z-50 border-b border-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-20">
          <div className="flex items-center">
            <Link href="/" className="text-2xl font-bold text-orange-600 tracking-tighter">
              JENIKS<span className="text-gray-900">KITCHEN</span>
            </Link>
          </div>

          <div className="hidden md:flex items-center space-x-8">
            <Link href="/" className="text-gray-600 hover:text-orange-600 transition-colors font-medium">Home</Link>
            <Link href="/about" className="text-gray-600 hover:text-orange-600 transition-colors font-medium">About</Link>
            <Link href="/menu" className="text-gray-600 hover:text-orange-600 transition-colors font-medium">Menu</Link>
            <Link href="/news" className="text-gray-600 hover:text-orange-600 transition-colors font-medium">News</Link>
            <Link href="/contact" className="text-gray-600 hover:text-orange-600 transition-colors font-medium">Contact</Link>
            <Link href="/order" className="bg-orange-600 text-white px-6 py-2.5 rounded-full font-semibold hover:bg-orange-700 transition-all flex items-center gap-2">
              <ShoppingCart size={18} />
              Order Now
            </Link>
          </div>

          <div className="md:hidden flex items-center">
            <button onClick={() => setIsOpen(!isOpen)} className="text-gray-600">
              {isOpen ? <X size={28} /> : <MenuIcon size={28} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden bg-white border-b border-gray-100 animate-in slide-in-from-top duration-300">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            <Link href="/" className="block px-3 py-2 text-gray-600">Home</Link>
            <Link href="/about" className="block px-3 py-2 text-gray-600">About</Link>
            <Link href="/menu" className="block px-3 py-2 text-gray-600">Menu</Link>
            <Link href="/news" className="block px-3 py-2 text-gray-600">News</Link>
            <Link href="/contact" className="block px-3 py-2 text-gray-600">Contact</Link>
            <Link href="/order" className="block px-3 py-2 text-orange-600 font-bold">Order Now</Link>
          </div>
        </div>
      )}
    </nav>
  );
}
