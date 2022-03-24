import { auth, googleAuthProvider } from "../lib/config";
import { signInWithPopup, signInAnonymously } from "firebase/auth";
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
      console.log(authUser);
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
