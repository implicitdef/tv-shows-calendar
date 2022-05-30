import * as React from 'react'
import { useCallback } from 'react'
import { TheState } from 'tv/frontend/redux/state'
import * as authThunk from 'tv/frontend/redux/thunks/auth'
import { useThisDispatch, useThisMappedState } from 'tv/frontend/redux/utils'
import {
  loggedInStatusSelector,
  userEmailSelector,
} from 'tv/frontend/redux/ducks/auth'
import { metaActions } from 'tv/frontend/redux/ducks/meta'

export default function AuthBar() {
  const mapState = useCallback(
    (state: TheState) => ({
      loggedInStatus: loggedInStatusSelector(state),
      email: userEmailSelector(state),
    }),
    [],
  )
  const { loggedInStatus, email } = useThisMappedState(mapState)
  const dispatch = useThisDispatch()
  const onClickAbout = () => dispatch(metaActions.displayAbout())
  const onLogin = () => {
    dispatch(authThunk.login())
  }
  const onLogout = () => {
    dispatch(authThunk.logout())
  }
  return (
    <div className='auth-bar'>
      <a className='auth-bar__button' onClick={onClickAbout}>
        about
      </a>
      {loggedInStatus === 'loggedIn' && email ? <span>{email}</span> : ''}
      {loggedInStatus === 'loggedOut' && (
        <a className='auth-bar__button' onClick={onLogin}>
          sign in with Google
        </a>
      )}
      {loggedInStatus === 'loggedIn' && (
        <a className='auth-bar__button' onClick={onLogout}>
          sign out
        </a>
      )}
    </div>
  )
}
