import * as React from "react";

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
  return (
    <div className="auth-bar">
      <a className="auth-bar__button" onClick={onClickAbout}>
        about
      </a>
      {loggedInStatus === "loggedIn" && email ? <span>{email}</span> : null}
      {loggedInStatus === "loggedOut" && (
        <a className="auth-bar__button" onClick={onLogin}>
          sign in with Google
        </a>
      )}
      {loggedInStatus === "loggedIn" && (
        <a className="auth-bar__button" onClick={onLogout}>
          sign out
        </a>
      )}
    </div>
  );
}
