import { useCallback, useState } from 'react'

function useToggledState(initialState) {
  const [state, setState] = useState(initialState)

  const toggleState = useCallback(() => {
    setState(s => !s)
  }, [])

  return [state, toggleState]
}

export default useToggledState
