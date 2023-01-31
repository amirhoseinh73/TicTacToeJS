import { useEffect, useState } from "react"
import Buttons from "./Buttons.jsx"

const Main = () => {
  //default state of houses
  const defaultState = []
  for (let i = 1; i <= 9; i++) defaultState.push({ id: i, user: null })

  // random number for cpu easy
  const randomNumber = () => Math.trunc(Math.random() * 9) + 1

  const [randomId, setRandomId] = useState(null)
  const [state, setState] = useState(defaultState)
  const [clicked, setClicked] = useState(false)
  const [dup, setDup] = useState(0)

  const click = e => {
    if (clicked) return

    const id = Number(e.target.closest(".cell").dataset.id)
    if (!id) return

    const updatedState = state.map(item => {
      if (item.id !== id) return item

      return { ...item, user: 1 }
    })

    // const cell = state.find(cell => cell.id === id)
    // if (cell.user) return

    // const cellIndex = state.findIndex(cell => cell.id === id)
    // if (cellIndex < 0) return

    // const newState = [...state]
    // const newCell = { ...newState[cellIndex] }
    // newCell.user = 1
    // newState[cellIndex] = newCell

    setState(updatedState)
    setClicked(true)
  }

  useEffect(() => {
    setRandomId(randomNumber())
  }, [dup])

  useEffect(() => {
    console.log(dup)
    if (!clicked) return

    const cell = state.find(cell => cell.id === randomId)
    if (cell.user) setDup(dup + 1)
    else {
      const updatedState = state.map(item => {
        if (item.id !== randomId) return item

        return { ...item, user: 2 }
      })

      setState(updatedState)
      setClicked(false)
    }
  }, [randomId, clicked, state])

  return (
    <article className="main">
      <div className="grid">
        {state.map(house => (
          <section key={house.id} data-id={house.id} className="cell">
            <button
              type="button"
              onClick={click}
              className={
                house.user ? (house.user === 1 ? "circle" : "times") : "empty"
              }
            ></button>
          </section>
        ))}
      </div>
      <Buttons
        setHouses={setState}
        state={defaultState}
        setClicked={setClicked}
      />
    </article>
  )
}

export default Main
