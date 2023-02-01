import { useEffect, useState } from "react"

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
  const [isFinish, setIsFinish] = useState(false)

  const click = e => {
    if (clicked) return

    const id = Number(e.target.closest(".cell").dataset.id)
    if (!id) return

    const cell = state.find(cell => cell.id === id && !cell.user)
    if (!cell) return

    const updatedState = state.map(cell => {
      if (cell.id !== id || cell.user) return cell

      return { ...cell, user: 1 }
    })

    setState(updatedState)
    setClicked(true)
  }

  useEffect(() => {
    if (isFinish) return
    setRandomId(randomNumber())
  }, [dup, isFinish])

  useEffect(() => {
    if (isFinish) return
    if (!clicked) return

    if (state.every(cell => Boolean(cell.user))) setIsFinish(true)

    const cell = state.find(cell => cell.id === randomId)
    if (cell.user) return setDup(dup + 1)

    const updatedState = state.map(item => {
      if (item.id !== randomId) return item

      return { ...item, user: 2 }
    })

    const timeOut = setTimeout(() => {
      setState(updatedState)
      setClicked(false)
    }, 1000)

    return () => clearTimeout(timeOut)
  }, [randomId, clicked, state, dup, isFinish])

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
      <button
        type="button"
        className="btn-again"
        onClick={() => {
          setState(defaultState)
          setClicked(false)
          setDup(0)
          setIsFinish(false)
        }}
      >
        Again
      </button>
    </article>
  )
}

export default Main
