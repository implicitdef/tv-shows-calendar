import React from "react";
import Link from "next/link";
import { doSignOut, useUser } from "../../client.auth";

export function TopBar() {
  const user = useUser();
  return (
    <div className="auth-bar">
      <Link href="/">
        <a className="auth-bar__button">home</a>
      </Link>
      <Link href="/about">
        <a className="auth-bar__button">about</a>
      </Link>
      {!user && (
        <Link href="/signin">
          <a className="auth-bar__button">sign up / sign in</a>
        </Link>
      )}
      {user && (
        <>
          <span>{user.email}</span>
          <a className="auth-bar__button" onClick={doSignOut}>
            sign out
          </a>
        </>
      )}
    </div>
  );
}
