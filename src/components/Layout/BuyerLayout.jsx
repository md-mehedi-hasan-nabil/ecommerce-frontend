import PropTypes from "prop-types";
import Footer from "../Shared/Footer";
import NavigationBar from "../Buyer/Navbar/NavigationBar";

export default function BuyerLayout({ children }) {
  return (
    <>
      <NavigationBar />
      <div className="container">
        {children}
        <Footer />
      </div>
    </>
  );
}

BuyerLayout.propTypes = {
  children: PropTypes.node.isRequired,
};
