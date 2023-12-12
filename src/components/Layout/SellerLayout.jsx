import PropTypes from "prop-types";
import Navigation from "../Seller/Navigation";
import Footer from "../Shared/Footer";
import SellerSidebar from "../Seller/SellerSidebar";

export default function SellerLayout({ children }) {
  return (
    <div>
      <Navigation />
      <>
        <SellerSidebar />
        <div className="p-4 sm:ml-64">
          <div className="p-4 border-2 border-gray-200 border-dashed rounded-lg">
            {children}
          </div>
        </div>
      </>
      <Footer />
    </div>
  );
}

SellerLayout.propTypes = {
  children: PropTypes.node.isRequired,
};
