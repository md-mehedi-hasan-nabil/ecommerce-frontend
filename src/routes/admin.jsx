import { createBrowserRouter } from "react-router-dom";
import Dashboard from "../pages/admin/Dashboard";
import ProductCategory from "../pages/admin/ProductCategory";
import ManageProducts from "../pages/Admin/ManageProducts";
import ManageOrder from "../pages/Admin/ManageOrder";
import AllUser from "../pages/Admin/AllUser";
import Inbox from "../pages/Admin/Inbox";
import ErrorPage from "../pages/ErrorPage";
import AddProduct from "../pages/Shared/AddProduct";
import AdminLayout from "../components/Layout/AdminLayout";

const adminRouter = createBrowserRouter([
  {
    path: "/",
    element: <Dashboard />,
    errorElement: <ErrorPage />,
  },
  {
    path: "/manage-products",
    element: <ManageProducts />,
  },
  {
    path: "/add-product",
    element: (
      <AdminLayout>
        <AddProduct />
      </AdminLayout>
    ),
  },
  {
    path: "/manage-order",
    element: <ManageOrder />,
  },
  {
    path: "/product-category",
    element: <AdminLayout><ProductCategory /></AdminLayout>,
  },
  {
    path: "/all-user",
    element: <AllUser />,
  },
  {
    path: "/inbox",
    element: <Inbox />,
  },
]);

export default adminRouter;
