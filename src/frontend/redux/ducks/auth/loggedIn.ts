import * as redux from "redux";
import * as reduxThunk from "redux-thunk";
import * as Domain from "tv/shared/domain";
import * as api from "tv/frontend/services/api";
import * as authStorage from "tv/frontend/services/authStorage";
import * as google from "tv/frontend/services/google";
import * as Actions from "tv/frontend/redux/ducks/actions";
import * as calendarSeasons from "tv/frontend/redux/ducks/calendar/seasons";
import * as metaHasGlobalError from "tv/frontend/redux/ducks/meta/hasGlobalError";
import * as metaRunningCalls from "tv/frontend/redux/ducks/meta/runningCalls";
import * as State from "tv/frontend/redux/ducks/state";
import * as authUserInfo from "tv/frontend/redux/ducks/auth/userInfo";

export interface ThisAction {
  type: "auth/loggedIn/SET";
  payload: boolean;
}

type ThisState = boolean;

export default function reducer(
  state: ThisState = false,
  action: ThisAction
): ThisState {
  switch (action.type) {
    case "auth/loggedIn/SET":
      return action.payload;
    default:
      return state;
  }
}

const set = (loggedIn: boolean): ThisAction => ({
  type: "auth/loggedIn/SET",
  payload: loggedIn
});

export const login = (): Actions.TT<void> => {
  return async dispatch => {
    try {
      await google.login();
      const token = await google.getToken();
      authStorage.store(token);
      dispatch(set(true));
      const user = await google.getUserInfo();
      dispatch(authUserInfo.set(user));
      await dispatch(calendarSeasons.fetch());
    } catch (e) {
      dispatch(metaHasGlobalError.set());
    }
  };
};

export const logout = (): Actions.TT<void> => {
  return async dispatch => {
    try {
      await google.logout();
      authStorage.clear();
      dispatch(set(false));
      dispatch(authUserInfo.set(null));
      await dispatch(calendarSeasons.fetch());
    } catch (e) {
      dispatch(metaHasGlobalError.set());
    }
  };
};

export const checkStatusOnStartupAndFetch = (): Actions.TT<void> => {
  return async dispatch => {
    try {
      const token = authStorage.get();
      if (token) {
        dispatch(set(true));
        const user = await google.getUserInfo();
        dispatch(authUserInfo.set(user));
      }
      await dispatch(calendarSeasons.fetch());
    } catch (e) {
      dispatch(set(false));
      dispatch(authUserInfo.set(null));
    }
  };
};
