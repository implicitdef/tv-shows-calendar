import * as React from "react";
import { useCallback } from "react";
import * as authDuck from "tv/frontend/redux/ducks/auth";
import * as metaDuck from "tv/frontend/redux/ducks/meta";
import { State } from "tv/frontend/redux/state";
import * as authThunk from "tv/frontend/redux/thunks/auth";
import { useThisDispatch, useThisMappedState } from "tv/frontend/redux/utils";

export default function AuthBar() {
  const mapState = useCallback(
    (state: State) => ({
      loggedIn: !!authDuck.isUserLoggedInSelector(state),
      email: authDuck.userEmailSelector(state)
    }),
    []
  );
  const { loggedIn, email } = useThisMappedState(mapState);
  const dispatch = useThisDispatch();
  const onClickAbout = () => dispatch(metaDuck.actions.displayAbout());
  const onLogin = () => {
    dispatch(authThunk.login());
  };
  const onLogout = () => {
    dispatch(authThunk.logout());
  };
  return (
    <div className="auth-bar">
      <a className="auth-bar__button" onClick={onClickAbout}>
        about
      </a>
      {loggedIn && email ? <span>{email}</span> : ""}
      {loggedIn || (
        <a className="auth-bar__button" onClick={onLogin}>
          sign in with Google
        </a>
      )}
      {loggedIn && (
        <a className="auth-bar__button" onClick={onLogout}>
          sign out
        </a>
      )}
    </div>
  );
}
