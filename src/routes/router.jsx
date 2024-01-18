import { createBrowserRouter } from "react-router-dom";
import BuyerHome from "../pages/Buyer/BuyerHome";
import ProductDetails from "../pages/Buyer/ProductDetails";
import CartPage from "../pages/Buyer/CartPage";
import PrivateRoute from "../components/Buyer/PrivateRoute";
import Login from "../pages/Login";
import Registration from "../pages/Registration";
import OrderPage from "../pages/Buyer/Order";
import Payment from "../pages/Buyer/Payment";
import SellerProducts from "../pages/Seller/SellerProducts";
import ProductsOrder from "../pages/Seller/ProductsOrder";
import Earning from "../pages/Seller/Earning";
import ProductCategory from "../components/Shared/ProductCategory";
import SellerLayout from "../components/Layout/SellerLayout";
import AddProduct from "../pages/Seller/AddProduct";
import Contact from "../pages/Buyer/Contact";
import BuyerLayout from "../components/Layout/BuyerLayout";
import ErrorPage from "../pages/ErrorPage";

const router = createBrowserRouter([
  {
    path: "/",
    element: <BuyerLayout />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: "",
        element: <BuyerHome />,
      },
      {
        path: "/contact",
        element: <Contact />,
      },
      {
        path: "/cart",
        element: (
          <PrivateRoute>
            <CartPage />
          </PrivateRoute>
        ),
      },
      {
        path: "/order",
        element: (
          <PrivateRoute>
            <OrderPage />
          </PrivateRoute>
        ),
      },
    ],
  },
  {
    path: "/most-selling-product",
    element: "",
  },
  {
    path: "/product-details/:productId",
    element: (
      <PrivateRoute>
        <ProductDetails />
      </PrivateRoute>
    ),
  },
  {
    path: "/payment",
    element: (
      <PrivateRoute>
        <Payment />
      </PrivateRoute>
    ),
  },
  {
    path: "/place-order",
    element: "",
  },
  {
    path: "/order-history",
    element: "",
  },
  {
    path: "/profile",
    element: "",
  },
  {
    path: "/request-for-product",
    element: "",
  },
  {
    path: "/dashboard",
    element: <SellerLayout />,
    children: [
      {
        path: "all-product",
        element: <SellerProducts />,
      },
      {
        path: "add-product",
        element: (
          <>
            <AddProduct />
          </>
        ),
      },
      {
        path: "product-category",
        element: (
          <>
            <ProductCategory />
          </>
        ),
      },
      {
        path: "product-order",
        element: <ProductsOrder />,
      },
      {
        path: "earning",
        element: <Earning />,
      },
    ],
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

export default router;
