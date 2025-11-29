import Footer from "./Footer";
import Header from "./Header";
import { useProduct } from "../providers/ProductProvider";

const MainLayout = ({ children }) => {
  const { searchQuery, setSearchQuery } = useProduct();
  return (
    <div className="min-h-screen bg-gray-50 font-sans text-gray-900 flex flex-col">
      <Header searchQuery={searchQuery} setSearchQuery={setSearchQuery} />
      <main className="flex-grow">{children}</main>
      <Footer />
    </div>
  );
};

export default MainLayout;
