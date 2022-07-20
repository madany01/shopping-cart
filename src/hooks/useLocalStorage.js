import { useEffect, useState } from 'react'

function readLocalStorage(key, defaultValue) {
  const item = localStorage.getItem(key)
  if (item === null) {
    if (defaultValue instanceof Function) return defaultValue()
    return defaultValue
  }
  return JSON.parse(item)
}

function useLocalStorage(initialKey, defaultValue) {
  const [data, setData] = useState(() => readLocalStorage(initialKey, defaultValue))

  useEffect(() => {
    localStorage.setItem(initialKey, JSON.stringify(data))
    // useLocalStorage("initialKey", ..)
    // initialThing means that changing the Thing won't be reflected via effect
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data])

  return [data, setData]
}

export default useLocalStorage
