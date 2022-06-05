import { useEffect, useState } from "react";
import React from "react";
import {
  getAuth,
  isSignInWithEmailLink,
  sendSignInLinkToEmail,
  signInWithEmailLink,
} from "firebase/auth";

const LOCAL_STORAGE_EMAIL = "emailForSignIn";

// Doc : https://firebase.google.com/docs/auth/web/email-link-auth

function onArriving() {
  const auth = getAuth();
  // Confirm the link is a sign-in with email link.
  if (isSignInWithEmailLink(auth, window.location.href)) {
    console.log("@@@@ it is a signin");
    // Get the email if available. This should be available if the user completes the flow on the same device where they started it.
    let email = window.localStorage.getItem(LOCAL_STORAGE_EMAIL);
    if (!email) {
      // User opened the link on a different device. To prevent session fixation
      // attacks, ask the user to provide the associated email again. For example:
      // TODO handle this case
      throw new Error("email not found in local storage");
    }
    // The client SDK will parse the code from the link for you.
    signInWithEmailLink(auth, email, window.location.href)
      .then((result) => {
        // Clear email from storage.
        window.localStorage.removeItem(LOCAL_STORAGE_EMAIL);
        console.log("@@@ user is ", result.user);
        console.log(
          "@@@ user is new ? ",
          (result as any).additionalUserInfo.isNewUser
        );
      })
      .catch((error) => {
        // Some error occurred, you can inspect the code: error.code
        // Common errors could be invalid email and invalid or expired OTPs.
        console.error("@@@@ ERROR " + error.code, error);
        // TODO handle error
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

export default function AuthBar({
  loggedInStatus,
  email,
}: {
  loggedInStatus: "loggedIn" | "loggedOut" | "unknown";
  email: string | null;
}) {
  // TODO make all these links interactive
  const onClickAbout = () => {};
  const onLogin = () => {};
  const onLogout = () => {};

  useEffect(() => {
    onArriving();
  }, []);

  const onSignin = (email: string) => {
    console.log("@@@ sign in", email);

    const auth = getAuth();
    sendSignInLinkToEmail(auth, email, {
      // TODO The link's domain has to be added in the Firebase Console list of authorized domains, which can be found by going to the Sign-in method tab (Authentication -> Sign-in method).
      url: `${window.location.host}/signinlink`,
    })
      .then(() => {
        // The link was successfully sent. TODO Inform the user.
        console.log("@@@ signin email sent");
        // Save the email locally so you don't need to ask the user for it again
        // if they open the link on the same device.
        window.localStorage.setItem(LOCAL_STORAGE_EMAIL, email);
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        // TODO handle error
        console.error(`error ${errorCode} ${errorMessage}`);
        // ..
      });
  };
  return (
    <div className="auth-bar">
      <a className="auth-bar__button" onClick={onClickAbout}>
        about
      </a>
      {loggedInStatus === "loggedIn" && email ? <span>{email}</span> : null}
      {loggedInStatus === "loggedOut" && (
        <a className="auth-bar__button" onClick={onLogin}>
          sign up / sign in
        </a>
      )}
      {loggedInStatus === "loggedIn" && (
        <a className="auth-bar__button" onClick={onLogout}>
          sign out
        </a>
      )}
      <AuthForm {...{ onSignin }} />
    </div>
  );
}
