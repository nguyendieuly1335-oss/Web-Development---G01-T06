import React from "react";
import { Star, Eye } from "lucide-react";
import { formatCurrency } from "../helper";

const ProductCard = ({ product, onClick }) => {
  const rating = (Math.random() * (5 - 4) + 4).toFixed(1);
  
  const priceValue = Number(product.price);

  return (
    <div
      onClick={() => onClick(product)}
      className="group relative w-full max-w-sm bg-white rounded-3xl transition-all duration-500 ease-out hover:-translate-y-3 hover:shadow-[0_30px_60px_-15px_rgba(0,0,0,0.3)] border border-gray-100 overflow-hidden cursor-pointer isolate"
    >
      <div className="absolute top-4 left-4 z-20">
        <span className="px-3 py-1 text-xs font-bold text-white bg-indigo-600 rounded-full shadow-lg shadow-indigo-500/40 backdrop-blur-md">
          NEW
        </span>
      </div>

      <div className="relative w-full pt-[100%] bg-white overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-tr from-gray-50 to-white opacity-50" />
        
        <img
          src={product.image_url}
          alt={product.title}
          className="absolute inset-0 w-full h-full object-contain p-6 transition-transform duration-700 cubic-bezier(0.23, 1, 0.32, 1) group-hover:scale-110 group-hover:rotate-2"
        />

        <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex items-center gap-2 translate-y-[150%] opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-500 ease-out z-20">
            <button 
                className="p-3 bg-white/90 backdrop-blur-md rounded-full shadow-lg text-gray-700 hover:text-indigo-600 hover:scale-110 transition-all duration-300 hover:shadow-indigo-500/20"
                title="Xem chi tiết"
            >
                <Eye size={20} />
            </button>
        </div>

        <div className="absolute inset-0 bg-black/0 group-hover:bg-black/[0.02] transition-colors duration-300 pointer-events-none" />
      </div>
      <div className="p-5 space-y-3 relative bg-white">
        <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-gray-200 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
        <div className="h-14">
             <h3 className="font-bold text-gray-800 text-base leading-snug line-clamp-2 group-hover:text-indigo-600 transition-colors duration-300">
            {product.title}
            </h3>
        </div>
        <div className="flex items-center gap-2">
          <div className="flex items-center bg-yellow-50 px-2 py-1 rounded-lg">
            <Star size={14} className="text-yellow-500 fill-yellow-500 mr-1" />
            <span className="text-xs font-bold text-yellow-700">{rating}</span>
          </div>
        </div>

        <div className="flex items-end justify-between pt-2">
          <div className="flex flex-col">
            <span className="text-xs text-gray-400 line-through font-medium">
                {formatCurrency(priceValue * 1.2, "USD")}
            </span>
            <span className="text-xl font-black text-gray-900 tracking-tight">
              {formatCurrency(priceValue, "USD")}
            </span>
          </div>
          
          <div className="w-8 h-8 rounded-full bg-gray-50 flex items-center justify-center text-indigo-600 opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300">
             <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M5 12h14M12 5l7 7-7 7"/>
             </svg>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;