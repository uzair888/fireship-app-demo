import { auth, googleAuthProvider, firestore } from "../lib/config";
import {
  signInWithPopup,
  signInAnonymously,
  updateProfile,
} from "firebase/auth";
import { setDoc, doc } from "firebase/firestore";
import { useContext } from "react";
import { UserContext } from "../lib/context";

export default function Enter({}) {
  const { user, username } = useContext(UserContext);

  return (
    <main>
      {user ? (
        <>
          <div>{user.displayName}</div>
          <SignOutButton />
        </>
      ) : (
        <SignInButton />
      )}
    </main>
  );
}

function SignOutButton() {
  return <button onClick={() => auth.signOut()}>Sign Out</button>;
}

function SignInButton() {
  //TODO: Add Try/Catch
  const signInWithGoogle = () => {
    signInWithPopup(auth, googleAuthProvider).then((authUser) => {
      updateProfile(auth.currentUser, {
        displayName: authUser.user.displayName,
      });
      const timestamp = new Date();
      const userRoles = ["user"];
      const docData = {
        timestamp,
        username: authUser.user.displayName,
        email: authUser.user.email,
        // contact,
        authProvider: "local",
        userRoles,
        // })
      };

      setDoc(doc(firestore, "users", authUser.user.uid), docData);
    });
  };

  const signInAnonimosly = async () => {
    await signInAnonymously(auth)
      .then(() => {
        // Signed in..
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        // ...
      });
  };

  return (
    <>
      <button className="btn-google" onClick={signInWithGoogle}>
        <img src={"/google.png"} /> Sign in with Google
      </button>
      <button onClick={signInAnonimosly}>Sign in Anonymously</button>
    </>
  );
}

// function UsernameForm() {}
