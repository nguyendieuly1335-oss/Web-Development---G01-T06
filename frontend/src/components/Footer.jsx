import { Mail, MapPin, Phone } from "lucide-react";

const Footer = () => (
  <footer className="bg-white border-t border-gray-200 pt-12 pb-8 mt-auto">
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
        <div className="col-span-1 md:col-span-1">
          <span className="text-xl font-black tracking-tighter text-gray-900 mb-4 block">
            TECH<span className="text-indigo-600">MODERN</span>
          </span>
          <p className="text-sm text-gray-500 leading-relaxed">
            Delivering the ultimate technology experience with the best prices and professional service.
          </p>
        </div>
        <div>
          <h4 className="font-bold text-gray-900 mb-4">Products</h4>
          <ul className="space-y-2 text-sm text-gray-500">
            <li><a href="#" className="hover:text-indigo-600">Phones</a></li>
            <li><a href="#" className="hover:text-indigo-600">Laptops</a></li>
            <li><a href="#" className="hover:text-indigo-600">Accessories</a></li>
          </ul>
        </div>
        <div>
          <h4 className="font-bold text-gray-900 mb-4">Support</h4>
          <ul className="space-y-2 text-sm text-gray-500">
            <li><a href="#" className="hover:text-indigo-600">Warranty Lookup</a></li>
            <li><a href="#" className="hover:text-indigo-600">Buying Guide</a></li>
            <li><a href="#" className="hover:text-indigo-600">Customer Care</a></li>
          </ul>
        </div>
        <div>
          <h4 className="font-bold text-gray-900 mb-4">Contact</h4>
          <ul className="space-y-2 text-sm text-gray-500">
            <li className="flex items-center"><MapPin size={16} className="mr-2"/>Hanoi City, VN</li>
            <li className="flex items-center"><Phone size={16} className="mr-2"/> 1900 1234</li>
            <li className="flex items-center"><Mail size={16} className="mr-2"/> support@techmodern.vn</li>
          </ul>
        </div>
      </div>
      <div className="border-t border-gray-100 pt-8 text-center text-sm text-gray-400">
        <p>© 2025 TechModern Store. Designed for Experience.</p>
      </div>
    </div>
  </footer>
);

export default Footer;