import { Dropdown, Navbar } from "flowbite-react";
import logo from "../../assets/logo.png";
import { Link } from "react-router-dom";
import { getAuth, signOut } from "firebase/auth";
import { app } from "../../firebase/firebaseConfig";
import { toast } from "react-hot-toast";
import useFirebaseAuth from "../../hooks/useFirebaseAuth";
import { useDispatch, useSelector } from "react-redux";
import { switchUserRole } from "../../features/auth/authSlice";


export default function AdminNavbar() {
  const dispatch = useDispatch();
  const {user} = useFirebaseAuth();
  const auth = getAuth(app);
  const { role } = useSelector((state) => state.auth);

  function changeUserRole() {
    dispatch(switchUserRole(role === "buyer" ? "seller" : "buyer"));
  }

  function accountSignOut() {
    signOut(auth)
      .then(() => {
        // Sign-out successful.
        toast.success("SignOut successfully!");
      })
      .catch((error) => {
        // An error happened.
        console.error(error);
      });
  }

  return (
    <Navbar
      className="hidden md:block shadow sticky top-0 z-50 bg-slate-100/90 backdrop-filter backdrop-blur-xl"
      fluid={true}
    >
      <Link to="/" className="flex items-center">
        <img src={logo} className="mr-3 h-6 sm:h-9" alt="Flowbite Logo" />
        <span className="self-center whitespace-nowrap text-xl font-semibold dark:text-white">
          ecommerce
        </span>
      </Link>
      <div className="flex justify-end items-center md:w-1/2 md:order-2">
        {user?.displayName ? (
          <>
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
              <Dropdown.Item>Dashboard</Dropdown.Item>
              <Dropdown.Item className="border-2" onClick={changeUserRole}>
                Switch to {role === "buyer" ? "Selling" : "Buying"}
              </Dropdown.Item>
              <Dropdown.Item>Settings</Dropdown.Item>
              <Dropdown.Item>Earnings</Dropdown.Item>
              <Dropdown.Divider />
              <Dropdown.Item onClick={accountSignOut}>Sign out</Dropdown.Item>
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
    </Navbar>
  );
}
