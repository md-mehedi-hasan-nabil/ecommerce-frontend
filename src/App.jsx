import { useEffect, useState } from "react";
import { HelmetProvider } from 'react-helmet-async';
import "flowbite";
import "./App.css";
import { RouterProvider } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import adminRouter from "./routes/admin";
import sellerRouter from "./routes/seller";
import buyerRouter from "./routes/buyer";
import useFirebaseAuth from "./hooks/useFirebaseAuth";
import Loader from "./components/Loader/Loader";
import { useSelector } from "react-redux";

export default function App() {
  const { loading } = useFirebaseAuth();
  const { role } = useSelector((state) => state.auth);
  const [router, setRouter] = useState(buyerRouter);

  useEffect(() => {
    if (role === "seller") {
      setRouter(sellerRouter);
    } else {
      setRouter(buyerRouter);
    }
  }, [role]);

  // setRouter(adminRouter)

  return (
    <>
      {loading ? (
        <Loader />
      ) : (
        <HelmetProvider>
          <RouterProvider router={router} />
          <Toaster position="top-center" reverseOrder={false} />
        </HelmetProvider>
      )}
    </>
  );
}


