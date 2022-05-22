import * as calendarThunk from 'tv/frontend/redux/thunks/calendar'
import * as api from 'tv/frontend/services/api'
import { SomeThunkAction } from 'tv/frontend/redux/actions'
import { metaActions } from 'tv/frontend/redux/ducks/meta'
import { searchActions } from 'tv/frontend/redux/ducks/search'

export const unfollowShow = (id: number): SomeThunkAction<void> => {
  return async (dispatch, getState) => {
    try {
      await api.unfollowShow({ dispatch, getState }, id)
      dispatch(calendarThunk.fetchSeasons())
    } catch (e) {
      dispatch(metaActions.registerGlobalError())
    }
  }
}

export const followShow = (id: number): SomeThunkAction<void> => {
  return async (dispatch, getState) => {
    try {
      dispatch(searchActions.clear())
      await api.followShow({ dispatch, getState }, id)
      dispatch(calendarThunk.fetchSeasons())
    } catch (e) {
      dispatch(metaActions.registerGlobalError())
    }
  }
}
