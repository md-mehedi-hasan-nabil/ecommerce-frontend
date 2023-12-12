import { useEffect, useState } from "react";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { app } from "../firebase/firebaseConfig";
import { useDispatch } from "react-redux";
import { switchUserRole, userLoggedIn } from "../features/auth/authSlice";

export default function useFirebaseAuth() {
  const dispatch = useDispatch();
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  const auth = getAuth(app);

  useEffect(() => {
    // set initial value in redux store
    const localStorageRole = localStorage.getItem("role");
    if (localStorageRole) {
      dispatch(switchUserRole(localStorageRole));
    } else {
      dispatch(switchUserRole("buyer"));
    }

    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        const { displayName, email, phoneNumber, photoURL, accessToken } =
          user || {};
        dispatch(
          userLoggedIn({
            accessToken,
            user: {
              displayName,
              email,
              phoneNumber,
              photoURL,
            },
          })
        );
        setLoading(false);
        setUser(user);
      } else {
        setLoading(false);
        setUser(null);
      }
    });

    return () => {
      unsubscribe();
    };
  }, [dispatch, auth]);

  return { user, loading };
}
