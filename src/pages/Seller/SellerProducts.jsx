import { Link } from "react-router-dom";
import Products from "../../components/Shared/Products";

export default function SellerProducts() {
  return (
    <div className="p-4">
      <Link
        className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2"
        to="/dashboard/add-product"
      >
        Add product
      </Link>
      <Products />
    </div>
  );
}
