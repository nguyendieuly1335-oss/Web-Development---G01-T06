import React, { createContext, useContext, useState, useMemo, useEffect } from "react";
import api from "../lib/api";

const ProductContext = createContext();

export const ProductProvider = ({ children }) => {
  const [products, setProducts] = useState([]); 
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");
  const fetchProducts = async () => {
    setIsLoading(true);
    setError(null);
    try {
      const response = await api.get('/products');
      setProducts(response.data.data || response.data); 
    } catch (err) {
      console.error("Failed to fetch products:", err);
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const getProductById = async (id) => {
    try {
      const response = await api.get(`/products/${id}`);
      return response.data.data || response.data; 
    } catch (err) {
      console.error(`Failed to fetch product ${id}:`, err);
      throw err;
    }
  };

  const filteredProducts = useMemo(() => {
    if (!searchQuery) return products;
    
    return products.filter((product) =>
      product.title?.toLowerCase().includes(searchQuery.toLowerCase())
    );
  }, [products, searchQuery]);

  const value = {
    products,        
    filteredProducts,
    searchQuery,
    setSearchQuery,
    isLoading, 
    error,
    fetchProducts,
    getProductById,
  };

  return (
    <ProductContext.Provider value={value}>
      {children}
    </ProductContext.Provider>
  );
};

export const useProduct = () => {
  return useContext(ProductContext);
};