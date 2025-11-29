import { ShoppingCart, Search } from "lucide-react";
import { useNavigate } from "react-router-dom";
const Header = ({ searchQuery, setSearchQuery }) => {
  const navigate = useNavigate();
  return (
    <header className="sticky top-0 z-40 bg-white/80 backdrop-blur-xl border-b border-gray-200 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
        <div
          className="flex items-center space-x-2 cursor-pointer group"
          onClick={() => {
            navigate("/");
          }}
        >
          <div className="w-10 h-10 bg-indigo-600 rounded-xl flex items-center justify-center text-white transform group-hover:rotate-12 transition-transform duration-300">
            <ShoppingCart size={20} />
          </div>
          <span className="text-2xl font-black tracking-tighter text-gray-900">
            TECH<span className="text-indigo-600">MODERN</span>
          </span>
        </div>

        <div className="hidden md:flex items-center flex-1 max-w-md relative">
          <div className="relative w-full">
            <div className="absolute inset-0 bg-indigo-500/5 blur-lg rounded-full transform scale-95"></div>

            <input
              type="text"
              placeholder="Search for products...?"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="relative w-full bg-white/50 border border-gray-200/80 backdrop-blur-md rounded-full py-2.5 pl-11 pr-4 text-sm text-gray-700 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all duration-300"
            />
            <Search
              className="absolute left-4 top-1/2 -translate-y-1/2 text-indigo-500"
              size={18}
            />
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;