import PropTypes from "prop-types"

function Error({ message }) {
  return <span className="text-sm text-red-400">{message}</span>
}

Error.propTypes = {
  message: PropTypes.string.isRequired,
}

export default Error
