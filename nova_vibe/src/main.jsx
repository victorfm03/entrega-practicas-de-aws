/**
 * Punto de entrada de la aplicación React.
 * Configura el enrutamiento con createBrowserRouter y envuelve la app
 * con el proveedor de tema para alternar entre modo claro y oscuro.
 */
import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import "@fortawesome/fontawesome-free/css/all.min.css";
import 'mdb-react-ui-kit/dist/css/mdb.min.css';
import { createBrowserRouter, RouterProvider } from "react-router";
import Home from './pages/home.jsx';
import Product from './pages/product.jsx';
import "./globalStyle.css";
import { ThemeProviderWrapper } from "./ThemeProvider.jsx";
import Category from './pages/category.jsx';
import ProductList from './pages/ProductList.jsx';
import ProductModify from './pages/ProductModify.jsx';
import CategoryList from './pages/CategoryList.jsx';
import CategoryModify from './pages/CategoryModify.jsx';
import ProductsByCategory from './pages/ProductsByCategory.jsx';
import CategoriesByProduct from './pages/CategoriesByProduct.jsx';
import ProductListCard from './pages/ProductListCard.jsx';
import ProductListDownload from './pages/ProductListDownload.jsx';

/**
 * Definición de rutas de la aplicación.
 * Cada ruta hija se renderiza dentro de la página Home como layout.
 */
const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
    children: [
      {
        path: "añadirProducto",
        element: <Product />,
      },
      {
        path: "añadirCategoria",
        element: <Category />,
      },
      {
        path: "productList",
        element: <ProductList />,
      },
      {
        path: "productListCards",
        element: <ProductListCard />,
      },
      {
        path: "productListDownload",
        element: <ProductListDownload />,
      },
      {
        path: "productosPorCategoria",
        element: <ProductsByCategory />,
      },
      {
        path: "categoriasPorProducto",
        element: <CategoriesByProduct />,
      },
      {
        path: "modificarProducto/:id_product",
        element: <ProductModify />,
      },
      {
        path: "CategoryList",
        element: <CategoryList />,
      },
      {
        path: "modificarCategoria/:id_category",
        element: <CategoryModify />,
      },
    ],
  },
]);

// Renderiza la aplicación en el elemento con id 'root'.
createRoot(document.getElementById("root")).render(
  <StrictMode>
    <ThemeProviderWrapper>
      <RouterProvider router={router} />
    </ThemeProviderWrapper>
  </StrictMode>
);

