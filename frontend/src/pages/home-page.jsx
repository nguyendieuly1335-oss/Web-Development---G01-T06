import { useProduct } from "../providers/ProductProvider";
import ProductCard from "../components/ProductCard";
import { useNavigate } from "react-router-dom";
import { Search } from "lucide-react";

const HomePage = () => {
  const navigate = useNavigate();
  const { products, searchQuery, setSearchQuery } = useProduct();
  
  const filteredProducts = products.filter((p) => {
    const matchesSearch =
      p.title.toLowerCase().includes((searchQuery || "").toLowerCase())
    return matchesSearch;
  });

  const handleProductClick = (id) => {
    navigate(`/product/${id}`);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 animate-fade-in">
      <div className="rounded-3xl bg-indigo-900 overflow-hidden relative min-h-[500px] flex items-center mb-12 shadow-2xl group">
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1550745165-9bc0b252726f?auto=format&fit=crop&q=80&w=2000')] bg-cover bg-center opacity-40 group-hover:scale-105 transition-transform duration-700"></div>
        <div className="relative z-10 p-8 md:p-16 max-w-2xl">
          <span className="text-indigo-300 font-bold tracking-wider text-sm mb-2 block uppercase">
            New Collection 2025
          </span>
          <h2 className="text-4xl md:text-6xl font-black text-white mb-6 leading-tight">
            The future of tech <br /> in your hands.
          </h2>
          <button className="px-8 py-3 bg-white text-indigo-900 font-bold rounded-full hover:bg-indigo-50 hover:px-10 transition-all duration-300 shadow-lg">
            Explore Now
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 lg:gap-8">
        {filteredProducts.map((product) => (
          <ProductCard
            key={product.id}
            product={product}
            onClick={() => handleProductClick(product.id)}
          />
        ))}
      </div>

      {filteredProducts.length === 0 && (
        <div className="text-center py-20">
          <Search size={48} className="mx-auto text-gray-300 mb-4" />
          <p className="text-gray-500 text-lg">
            No matching products found.
          </p>
          <button
            onClick={() => {
              setSearchQuery("");
            }}
            className="text-indigo-600 font-semibold mt-2 hover:underline"
          >
            Clear search
          </button>
        </div>
      )}
    </div>
  );
};

export default HomePage;