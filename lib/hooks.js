import { auth, firestore } from "./config";
import { getDoc, doc, onSnapshot } from "firebase/firestore";
import { useEffect, useState } from "react";
// import { useAuthState } from "react-firebase-hooks/auth";
import { onAuthStateChanged } from "firebase/auth";
import { async } from "@firebase/util";

// Custom hook to read  auth record and user profile doc
export function useUserData() {
  const [user, setUser] = useState({});
  const [username, setUserName] = useState({});

  useEffect(() => {
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

  useEffect(() => {
    // turn off realtime subscription
    let unsubscribe;

    try {
      // if (auth.currentUser) {
      const currentUser = user.uid;
      unsubscribe = onSnapshot(doc(firestore, "users", user.uid), (docSnap) => {
        if (docSnap.exists()) {
          setUserName(docSnap.data()?.username);
          console.log(username, "jsjssj");

          //   setDate(doc.data().createdAt.toDate())
        } else {
          console.log("No such document!");
        }
      });
      // onSnapshot(db,(docSnap) => {

      // })
      // } else {
      //   setUserName(null);
      // }
    } catch (error) {
      console.log(error);
    }
    // const ref = firestore.collection("users").doc(user.uid);
    // unsubscribe = ref.onSnapshot((doc) => {
    //   setUsername(doc.data()?.username);
    // });

    return unsubscribe;
  }, [user, username]);

  return { user, username };
}
