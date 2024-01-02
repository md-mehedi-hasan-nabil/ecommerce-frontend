import Navigation from "../Seller/Navigation";
import Footer from "../Shared/Footer";
import SellerSidebar from "../Seller/SellerSidebar";
import { Outlet } from "react-router-dom";

export default function SellerLayout() {
  return (
    <div>
      <Navigation />
      
        <SellerSidebar />
        <div className="p-4 sm:ml-64">
          <div className="p-4 border-2 border-gray-200 border-dashed rounded-lg">
            <Outlet />
          </div>
        </div>
      
      <Footer />
    </div>
  );
}
