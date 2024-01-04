import Footer from "../Shared/Footer";
import NavigationBar from "../Buyer/Navbar/NavigationBar";
import { Outlet } from "react-router-dom";

export default function BuyerLayout() {
  return (
    <>
      <NavigationBar />
      <div className="container">
        <Outlet />
        <Footer />
      </div>
    </>
  );
}


