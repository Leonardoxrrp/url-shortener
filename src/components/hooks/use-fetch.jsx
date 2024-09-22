import { useState } from "react"

const useFetch = (cb, options = {}) => {
  const [data, setData] = useState(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)

  const fn = async (...args) => {
    setLoading(true)
    setError(null)
    try {
      const response = await cb(options, ...args)
      setData(response)
    } catch (error) {
      setError(error.message || "Something went wrong")
    } finally {
      setLoading(false)
    }
  }

  return { data, loading, error, fn }
}

export default useFetch
