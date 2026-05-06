import Link from 'next/link';

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-white pt-16 pb-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
          <div className="col-span-1 md:col-span-2">
            <Link href="/" className="text-2xl font-bold text-orange-500 tracking-tighter mb-4 block">
              JENIKS<span className="text-white">KITCHEN</span>
            </Link>
            <p className="text-gray-400 max-w-sm mb-6">
              Bringing gourmet experiences to your doorstep with locally sourced ingredients and a dash of creativity.
            </p>
          </div>
          <div>
            <h4 className="text-lg font-semibold mb-4">Quick Links</h4>
            <ul className="space-y-2">
              <li><Link href="/menu" className="text-gray-400 hover:text-orange-500 transition-colors">Our Menu</Link></li>
              <li><Link href="/order" className="text-gray-400 hover:text-orange-500 transition-colors">Order Online</Link></li>
              <li><Link href="/news" className="text-gray-400 hover:text-orange-500 transition-colors">Latest News</Link></li>
              <li><Link href="/promotions" className="text-gray-400 hover:text-orange-500 transition-colors">Promotions</Link></li>
            </ul>
          </div>
          <div>
            <h4 className="text-lg font-semibold mb-4">Contact Us</h4>
            <p className="text-gray-400 mb-2">123 Kitchen Lane, Food City</p>
            <p className="text-gray-400 mb-2">info@jenikskitchen.com</p>
            <p className="text-gray-400">+1 (555) 123-4567</p>
          </div>
        </div>
        <div className="border-t border-gray-800 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-gray-500 text-sm">
            &copy; {new Date().getFullYear()} JENIKS KITCHEN. All rights reserved.
          </p>
          <div className="flex gap-6">
            <Link href="/privacy" className="text-gray-500 hover:text-white text-sm">Privacy Policy</Link>
            <Link href="/terms" className="text-gray-500 hover:text-white text-sm">Terms of Service</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
