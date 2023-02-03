const Alert = ({ message, className }) => {
  return <div className={"message " + className}>{message}</div>
}

Alert.defaultProps = {
  className: "draw",
}

export default Alert
