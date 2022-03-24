import { auth, firestore } from "./config";
// import { getdoc, doc } from "firebase/firestore";
import { useEffect, useState } from "react";
// import { useAuthState } from "react-firebase-hooks/auth";
import { onAuthStateChanged } from "firebase/auth";

// Custom hook to read  auth record and user profile doc
export function useUserData() {
  // const [user] = useAuthState(auth);
  const [user, setUser] = useState({});

  useEffect(() => {
    // turn off realtime subscription
    // let unsubscribe;

    // if (user) {
    //   const ref = firestore.collection("users").doc(user.uid);
    //   unsubscribe = ref.onSnapshot((doc) => {
    //     setUsername(doc.data()?.username);
    //   });
    // } else {
    //   setUsername(null);
    // }

    // return unsubscribe;
    const unsubscribe = onAuthStateChanged(auth, (authUser) => {
      if (authUser) {
        setUser(authUser);
      } else {
        //logged out
        setUser(null);
      }
    });

    return () => {
      unsubscribe();
      // setUser({});
    };
  }, [user]);

  return { user };
}
