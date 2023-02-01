import { useCallback, useEffect, useState } from "react"

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

  const getUpdatedState = useCallback(
    (id, user) => {
      const cell = state.find(cell => cell.id === id && !cell.user)
      if (!cell) return false

      const updatedState = state.map(cell => {
        if (cell.id !== id || cell.user) return cell

        return { ...cell, user: user }
      })

      return updatedState
    },
    [state]
  )

  const click = e => {
    if (clicked) return

    const id = Number(e.target.closest(".cell").dataset.id)
    if (!id) return

    const updatedState = getUpdatedState(id, 1)
    if (!updatedState) return

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

    const updatedState = getUpdatedState(randomId, 2)
    if (!updatedState) return setDup(dup + 1)

    const timeOut = setTimeout(() => {
      setState(updatedState)
      setClicked(false)
    }, 1000)

    return () => clearTimeout(timeOut)
  }, [randomId, clicked, state, dup, isFinish, getUpdatedState])

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
