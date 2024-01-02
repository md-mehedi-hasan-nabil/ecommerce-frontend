import { useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import logo from "../assets/logo.png";
import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { getAuth } from "firebase/auth";
import { app } from "../firebase/firebaseConfig";
import { useGoogleLoginMutation } from "../features/auth/authApi";
import { toast } from "react-hot-toast";

export default function Login() {
  const [googleLogin, { isSuccess: isSuccessLogin, isError: isErrorLogin }] =
    useGoogleLoginMutation();
  const navigate = useNavigate();
  const location = useLocation();

  const from = location.state?.from?.pathname || "/";

  const provider = new GoogleAuthProvider();
  const auth = getAuth(app);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  useEffect(() => {
    if (isSuccessLogin) {
      navigate(from, { replace: true });
      toast.success("Login successfully!");
    }
  }, [isSuccessLogin, from, navigate]);

  useEffect(() => {
    if (isErrorLogin) {
      toast.success("Login Failed !");
    }
  }, [isErrorLogin]);

  function handleSubmit() {}

  function signInGoogle() {
    signInWithPopup(auth, provider)
      .then((result) => {
        const user = result.user;
        const { displayName, email, phoneNumber, photoURL } = user;
        googleLogin({ displayName, email, phoneNumber, photoURL });
      })
      .catch((error) => {
        console.error(error);
      });
  }

  return (
    <section className="flex justify-center items-center min-h-screen bg-indigo-100 dark:bg-gray-800">
      <div className="w-96 shadow-lg rounded-lg px-6 py-6 lg:px-8 bg-indigo-50 dark:bg-gray-700">
        <div className="flex-center">
          <Link to="/">
            <img className="w-28 py-3 mx-auto" src={logo} alt="logo" />
          </Link>
        </div>
        <h3 className="mb-4 text-2xl font-medium text-gray-900 dark:text-white">
          Sign In to your account
        </h3>
        <form onSubmit={(e) => handleSubmit(e)} className="space-y-6">
          <div>
            <label
              htmlFor="email"
              className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            >
              Your email
            </label>
            <input
              type="email"
              name="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-indigo-500 focus:border-indigo-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
              placeholder="name@company.com"
              required
            />
          </div>
          <div>
            <label
              htmlFor="password"
              className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            >
              Your password
            </label>
            <input
              type="password"
              name="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter password"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-indigo-500 focus:border-indigo-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
              required
            />
          </div>
          <button
            onClick={signInGoogle}
            type="button"
            className="w-full text-white bg-[#4285F4] hover:bg-[#4285F4]/90 focus:ring-4 focus:outline-none focus:ring-[#4285F4]/50 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex justify-center items-center mr-2 mb-2"
          >
            <svg
              className="w-4 h-4 mr-2 -ml-1"
              aria-hidden="true"
              focusable="false"
              data-prefix="fab"
              data-icon="google"
              role="img"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 488 512"
            >
              <path
                fill="currentColor"
                d="M488 261.8C488 403.3 391.1 504 248 504 110.8 504 0 393.2 0 256S110.8 8 248 8c66.8 0 123 24.5 166.3 64.9l-67.5 64.9C258.5 52.6 94.3 116.6 94.3 256c0 86.5 69.1 156.6 153.7 156.6 98.2 0 135-70.4 140.8-106.9H248v-85.3h236.1c2.3 12.7 3.9 24.9 3.9 41.4z"
              ></path>
            </svg>
            Sign in with Google
          </button>

          <button
            //   disabled={isLoading}
            type="submit"
            className={`w-full text-white shadow-xl bg-indigo-700 hover:bg-indigo-800 focus:ring-4 focus:outline-none focus:ring-indigo-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-indigo-600 dark:hover:bg-indigo-700 dark:focus:ring-indigo-800 disabled:cursor-not-allowed`}
          >
            Login to your account
          </button>
          <div className="text-sm font-medium text-gray-500 dark:text-gray-300">
            Not registered?{"  "}
            <Link
              to="/registration"
              className="text-indigo-700 hover:underline dark:text-indigo-500"
            >
              Create account
            </Link>
          </div>
        </form>
      </div>
    </section>
  );
}
