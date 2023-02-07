import React, { useCallback, useEffect, useState } from "react"
import { checkWinPlanMatch, cpuIdHard, randomNumber } from "../helper.js"
import Alert from "./Alert.jsx"

const Main = () => {
  //default state of houses
  const defaultState = []
  for (let i = 1; i <= 9; i++) defaultState.push({ id: i, user: null })

  const [randomId, setRandomId] = useState(null)
  const [state, setState] = useState(defaultState)
  const [clicked, setClicked] = useState(false)
  const [dup, setDup] = useState(0)
  const [isFinish, setIsFinish] = useState(false)
  const [isUserWin, setIsUserWin] = useState(0)
  const [difficulty, setDifficulty] = useState(null) // easy, hard
  const [score, setScore] = useState(0)
  const [rounds, setRounds] = useState(0)

  const getUpdatedState = useCallback(
    (id, userID) => {
      const cell = state.find(cell => cell.id === id && !cell.user)
      if (!cell) return false

      const updatedState = state.map(cell => {
        if (cell.id !== id || cell.user) return cell

        return { ...cell, user: userID }
      })

      return updatedState
    },
    [state]
  )

  const click = e => {
    if (!difficulty) return
    if (isFinish) return
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

  //easy
  useEffect(() => {
    if (difficulty !== "easy") return
    if (isFinish) return
    if (!clicked) return

    if (state.every(cell => Boolean(cell.user))) {
      setIsFinish(true)
      setRounds(rounds + 1)
    }

    const updatedState = getUpdatedState(randomId, 2)
    if (!updatedState) return setDup(dup + 1)

    const timeOut = setTimeout(() => {
      setState(updatedState)
      setClicked(false)
    }, 1000)

    return () => clearTimeout(timeOut)
  }, [
    randomId,
    clicked,
    state,
    dup,
    isFinish,
    getUpdatedState,
    difficulty,
    rounds,
  ])

  //hard
  useEffect(() => {
    if (difficulty !== "hard") return
    if (isFinish) return
    if (!clicked) return

    if (state.every(cell => Boolean(cell.user))) {
      setIsFinish(true)
      setRounds(rounds + 1)
    }

    const newID = cpuIdHard(randomId, state)
    if (!newID) return
    const updatedState = getUpdatedState(newID, 2)
    if (!updatedState) return setDup(dup + 1)

    const timeOut = setTimeout(() => {
      setState(updatedState)
      setClicked(false)
    }, 1000)

    return () => clearTimeout(timeOut)
  }, [
    clicked,
    state,
    isFinish,
    getUpdatedState,
    difficulty,
    dup,
    randomId,
    rounds,
  ])

  useEffect(() => {
    if (isFinish) return

    /**
     * Plans of winning
     * if one user has below ids
     * 1,2,3
     * 4,5,6
     * 7,8,9
     * 1,4,7
     * 2,5,8
     * 3,6,9
     * 1,5,9
     * 3,5,7
     * @param {number} userID
     * @returns {boolean}
     */
    const checkUserWin = userID => {
      const userCells = state.filter(cell => cell.user === userID)
      if (userCells.length > 2) {
        const userIds = userCells.map(cell => cell.id)

        return checkWinPlanMatch(userIds)
      }
      return false
    }

    const checkUser1Win = checkUserWin(1)
    if (checkUser1Win) return setIsUserWin(1)

    const checkUser2Win = checkUserWin(2)
    if (checkUser2Win) return setIsUserWin(2)
  }, [state, isFinish, clicked])

  useEffect(() => {
    if (isFinish) return
    if (!isUserWin) return

    if (isUserWin === 1) setScore(score + 1)
    setIsFinish(true)
    setRounds(rounds + 1)
  }, [isUserWin, isFinish, score, rounds])

  return (
    <>
      <Alert
        message={
          !difficulty
            ? "Choose diffifulty"
            : isFinish && !isUserWin
            ? "Draw!"
            : isUserWin === 1
            ? "You Win!"
            : isUserWin === 2
            ? "You Lose!"
            : ""
        }
        className={
          !difficulty
            ? "small"
            : isFinish && !isUserWin
            ? "draw"
            : isUserWin === 1
            ? "win"
            : isUserWin === 2
            ? "lose"
            : ""
        }
      />
      <article className="main">
        <p className="score">
          Difficulty: <abbr>{difficulty}</abbr>
        </p>
        <p className="score">
          Rounds: <abbr>{rounds}</abbr> Score: <abbr>{score}</abbr>
        </p>
        <section className="difficulty-buttons">
          <button
            type="button"
            className="btn btn-difficulty easy"
            onClick={() => {
              setDifficulty("easy")
              setScore(0)
              setRounds(0)
            }}
          >
            Easy
          </button>
          <button
            type="button"
            className="btn btn-difficulty hard"
            onClick={() => {
              setDifficulty("hard")
              setScore(0)
              setRounds(0)
            }}
          >
            Hard
          </button>
        </section>
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
          className="btn btn-again"
          onClick={() => {
            setState(defaultState)
            setClicked(false)
            setDup(0)
            setIsFinish(false)
            setIsUserWin(0)
          }}
        >
          Again
        </button>
      </article>
    </>
  )
}

export default Main
