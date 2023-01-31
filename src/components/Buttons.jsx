const Buttons = ({ setHouses, state, setClicked }) => {
  const btnReset = () => {
    setHouses(state)
    setClicked(false)
  }
  return (
    <button type="button" className="btn-again" onClick={btnReset}>
      Again
    </button>
  )
}

export default Buttons
