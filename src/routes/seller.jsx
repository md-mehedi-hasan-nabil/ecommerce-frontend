import { createBrowserRouter } from "react-router-dom";
import ErrorPage from "../pages/ErrorPage";
import SellerHome from "../pages/Seller/SellerHome";
import SellerProducts from "../pages/Seller/SellerProducts";
import ProductsOrder from "../pages/Seller/ProductsOrder";
import Earning from "../pages/Seller/Earning";
import Login from "../pages/Login";
import Registration from "../pages/Registration";
import ProductCategory from "../components/Shared/ProductCategory";
import AddProduct from "../pages/Shared/AddProduct";
import SellerLayout from "../components/Layout/SellerLayout";

const sellerRouter = createBrowserRouter([
  {
    path: "/",
    element: <SellerHome />,
    errorElement: <ErrorPage />,
  },
  {
    path: "/all-product",
    element: <SellerProducts />,
  },
  {
    path: "/add-product",
    element: (
      <SellerLayout>
        <AddProduct />
      </SellerLayout>
    ),
  },
  {
    path: "/product-category",
    element: (
      <SellerLayout>
        <ProductCategory />
      </SellerLayout>
    ),
  },
  {
    path: "/product-order",
    element: <ProductsOrder />,
  },
  {
    path: "/earning",
    element: <Earning />,
  },
  {
    path: "/login",
    element: (
      <>
        <Login />
      </>
    ),
  },
  {
    path: "/registration",
    element: (
      <>
        <Registration />
      </>
    ),
  },
]);

export default sellerRouter;
