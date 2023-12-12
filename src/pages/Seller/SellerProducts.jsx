import { Link } from "react-router-dom";
import SellerLayout from "../../components/Layout/SellerLayout";
import Products from "../../components/Shared/Products";

export default function SellerProducts() {
  return (
    <SellerLayout>
      <Link
        className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2"
        to="/add-product"
      >
        Add product
      </Link>
      <Products type="seller" />
    </SellerLayout>
  );
}
