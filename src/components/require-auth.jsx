import PropTypes from "prop-types"
import { UrlState } from "@/context"
import { useEffect } from "react"
import { useNavigate } from "react-router-dom"
import { BarLoader } from "react-spinners"

function RequireAuth({ children }) {
  const navigate = useNavigate()
  const { isAuthenticated, loading } = UrlState()

  useEffect(() => {
    if (!isAuthenticated && !loading) navigate("/auth")
  }, [isAuthenticated, loading])

  if (loading) return <BarLoader width={"100%"} color="#36d7b7" />

  if (isAuthenticated) return children
  return null // Explicitly return null if not authenticated
}

RequireAuth.propTypes = {
  children: PropTypes.node.isRequired,
}

export default RequireAuth
