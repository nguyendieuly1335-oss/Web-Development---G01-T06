import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import AppRouter from "./routes/app-router.jsx";
import { ToastContainer } from "react-toastify";
import { ProductProvider } from "./providers/ProductProvider.jsx";

createRoot(document.getElementById("root")).render(
  <StrictMode>
      <ProductProvider>
        <AppRouter />
        <ToastContainer />
      </ProductProvider>
  </StrictMode>
);
