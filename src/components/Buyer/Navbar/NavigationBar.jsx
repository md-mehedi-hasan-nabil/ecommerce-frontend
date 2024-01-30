import { Dropdown, Navbar } from "flowbite-react";
import Cart from "./Cart";
import Search from "./Search";
import logo from "../../../assets/logo.png";
import { Link, NavLink } from "react-router-dom";
import { getAuth, signOut } from "firebase/auth";
import { app } from "../../../firebase/firebaseConfig";
import { toast } from "react-hot-toast";
import useFirebaseAuth from "../../../hooks/useFirebaseAuth";
import { useDispatch } from "react-redux";
import { userLoggedOut } from "../../../features/auth/authSlice";

export default function NavigationBar() {
  const dispatch = useDispatch();
  const { user } = useFirebaseAuth();

  const auth = getAuth(app);

  function accountSignOut() {
    signOut(auth)
      .then(() => {
        // Sign-out successful.
        dispatch(userLoggedOut());
        toast.success("SignOut successfully!");
      })
      .catch((error) => {
        // An error happened.
        console.error(error);
      });
  }

  return (
    <div className="sticky top-0 z-50 bg-white/95 backdrop-filter backdrop-blur-xl">
      <div className="container">
        <Navbar style={{ background: "transparent" }} fluid={true}>
          <Link className="flex items-center" to="/">
            <img src={logo} className="mr-3 h-16" alt=" Logo" />
            {/* <span className="self-center whitespace-nowrap text-xl font-semibold dark:text-white">
          ecommerce
        </span> */}
          </Link>
          <div className="flex justify-end items-center md:w-1/2 md:order-2">
            <Search />

            {user?.displayName ? (
              <>
                {/* cart */}
                <Cart />
                {/* profile */}
                <Dropdown
                  arrowIcon={false}
                  inline={true}
                  label={
                    <img
                      alt="User"
                      src={user?.photoURL}
                      className="w-10 h-10 rounded-full object-cover border-2"
                    />
                  }
                >
                  <Dropdown.Header>
                    <span className="block text-sm">{user?.displayName}</span>
                    <span className="block truncate text-sm font-medium">
                      {user?.email}
                    </span>
                  </Dropdown.Header>
                 <Link to="/dashboard/all-product"> <Dropdown.Item>Dashboard</Dropdown.Item></Link>
                  <Dropdown.Item>Settings</Dropdown.Item>
                  <Dropdown.Item>Earnings</Dropdown.Item>
                  <Dropdown.Divider />
                  <Dropdown.Item onClick={accountSignOut}>
                    Sign out
                  </Dropdown.Item>
                </Dropdown>
              </>
            ) : (
              <Link
                className="ml-4 text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5"
                to="/login"
              >
                Login
              </Link>
            )}

            <Navbar.Toggle />
          </div>
          <Navbar.Collapse>
            <NavLink to="/">Home</NavLink>
            <NavLink to="/cart">Cart</NavLink>
            <NavLink to="/order">Order</NavLink>
            <NavLink to="/contact">Contact</NavLink>
          </Navbar.Collapse>
        </Navbar>
      </div>
    </div>
  );
}
