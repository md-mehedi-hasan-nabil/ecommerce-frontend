import { HelmetProvider } from 'react-helmet-async';
import "flowbite";
import { RouterProvider } from "react-router-dom";
import { Toaster } from "react-hot-toast";
// import adminRouter from "./routes/admin";
import useFirebaseAuth from "./hooks/useFirebaseAuth";
import Loader from "./components/Loader/Loader";
import router from "./routes/router";

export default function App() {
  const { loading } = useFirebaseAuth();

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


