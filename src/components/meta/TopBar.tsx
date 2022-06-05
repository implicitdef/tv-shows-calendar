import { useEffect, useState } from "react";
import React from "react";
import {
  Auth,
  getAuth,
  isSignInWithEmailLink,
  onAuthStateChanged,
  sendSignInLinkToEmail,
  signInWithEmailLink,
  signOut,
  User,
} from "firebase/auth";
import { initializeApp } from "firebase/app";
import Link from "next/link";

const LOCAL_STORAGE_EMAIL = "emailForSignIn";

// Doc : https://firebase.google.com/docs/auth/web/email-link-auth

// TODO rework that and execute it only client side

function initFirebaseApp() {
  // https://firebase.google.com/docs/web/setup
  const firebaseConfig = {
    apiKey: "AIzaSyCF5qkzsY95L3b-8W-hVsAVo1-j68BTygU",
    authDomain: "tv-shows-calendar.firebaseapp.com",
    projectId: "tv-shows-calendar",
    storageBucket: "tv-shows-calendar.appspot.com",
    messagingSenderId: "130288006280",
    appId: "1:130288006280:web:a0c1cae89cdc17c7149b3d",
  };
  initializeApp(firebaseConfig);
}

function doSignOut() {
  const auth = getAuth();
  signOut(auth)
    .then(() => {
      // Sign-out successful.
    })
    .catch((error) => {
      // An error happened.
      console.error(error);
    });
}

function handleArrivalFromSigninLink() {
  const auth = getAuth();
  // Is the current URL a signin link sent by email ?
  if (isSignInWithEmailLink(auth, window.location.href)) {
    // If the user is on the same device, we have his email on local storage
    let email = window.localStorage.getItem(LOCAL_STORAGE_EMAIL);
    if (!email) {
      // User opened the link on a different device. To prevent session fixation
      // attacks, ask the user to provide the associated email again. For example:
      // TODO handle this case
      throw new Error("email not found in local storage");
    }
    signInWithEmailLink(auth, email, window.location.href)
      .then(() => {
        window.localStorage.removeItem(LOCAL_STORAGE_EMAIL);
        // clean the signin parameters
        window.history.pushState(null, "", "/");
      })

      .catch((error) => {
        // Common errors could be invalid email and invalid or expired OTPs.
        // TODO handle error
        console.error("@@@@ ERROR " + error.code, error);
      });
  } else {
    console.log("@@@ not a signin link");
  }
}

const AuthForm = ({ onSignin }: { onSignin: (email: string) => void }) => {
  const [email, setEmail] = useState("");
  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        onSignin(email);
      }}
    >
      <label htmlFor="funk">
        Your email :
        <input
          value={email}
          type="email"
          onChange={(e) => setEmail(e.target.value)}
        />
      </label>
      <button type="submit">OK</button>
    </form>
  );
};

export function TopBar() {
  const [showEmailForm, setShowEmailForm] = useState(false);
  const [status, setStatus] = useState<User | "loggedOut" | "unknown">(
    "unknown"
  );
  const isSignedIn = typeof status !== "string";

  useEffect(() => {
    initFirebaseApp();
    handleArrivalFromSigninLink();
  }, []);

  useEffect(() => {
    // set and updates the logged in/logged out status whenever it changes
    onAuthStateChanged(getAuth(), (user) => {
      setStatus(user || "loggedOut");
    });
  }, [setStatus]);

  const onSignin = (email: string) => {
    console.log("@@@ on signin");
    const auth = getAuth();
    console.log("@@@ sendSignInLinkToEmail", email);

    sendSignInLinkToEmail(auth, email, {
      // The domain has to be authorized in the Firebase Console
      url: `http://${window.location.host}/`,
      handleCodeInApp: true,
    })
      .then(() => {
        // TODO Inform the user.
        console.log("@@@ signin email sent");
        // If the user opens the link on the same device, we won't have to ask for the email again
        window.localStorage.setItem(LOCAL_STORAGE_EMAIL, email);
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        // TODO handle error
        console.error("@@@ ici error");
        console.error(error);
        // ..
      });
  };
  return (
    <div className="auth-bar">
      <Link href="/about">
        <a className="auth-bar__button">about</a>
      </Link>
      {status === "loggedOut" && (
        <a className="auth-bar__button" onClick={() => setShowEmailForm(true)}>
          sign up / sign in
        </a>
      )}
      {showEmailForm && <AuthForm {...{ onSignin }} />}
      {isSignedIn && (
        <>
          <span>{status.email}</span>
          <a className="auth-bar__button" onClick={() => doSignOut()}>
            sign out
          </a>
        </>
      )}
    </div>
  );
}
