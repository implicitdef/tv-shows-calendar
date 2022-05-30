import * as React from 'react'
import { useCallback } from 'react'
import { TheState } from 'tv/frontend/redux/state'
import { useThisMappedState } from 'tv/frontend/redux/utils'

export default function GlobalErrorBanner() {
  const mapState = useCallback(
    (state: TheState) => ({
      hasError: state.meta.hasGlobalError,
    }),
    [],
  )
  const { hasError } = useThisMappedState(mapState)
  return hasError ? (
    <div className='global-error-banner'>
      Oops, it looks like something didn't work as it should. Please refresh
      this page to see if things get better.
    </div>
  ) : null
}
