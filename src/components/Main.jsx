import { useEffect, useState } from "react"

const Main = () => {
  const STATE = []
  for (let i = 1; i <= 9; i++) {
    STATE.push({
      id: i,
      user: null,
    })
  }

  const [houses, setHouses] = useState(STATE)
  const [clicked, setClicked] = useState(false)

  const click = e => {
    const id = Number(e.target.closest(".cell").dataset.id)
    if (!id) return

    const checkedHouse = houses.map(house => {
      if (house.id === id && !house.user) house.user = 1
      return house
    })
    setHouses(checkedHouse)
    setClicked(true)
  }

  const randomNumber = () => Math.trunc(Math.random() * 9) + 1
  let id = randomNumber()

  useEffect(() => {
    if (!clicked) return
    const checkedHouse = houses.map(house => {
      if (house.id === id) {
        if (!house.user) {
          house.user = 2
          setClicked(false)
        } else id = randomNumber()
      }
      return house
    })
    setHouses(checkedHouse)
  }, [clicked, id])

  return (
    <article className="main">
      <div className="grid">
        {houses.map(house => (
          <section key={house.id} data-id={house.id} className="cell">
            <button
              type="button"
              onClick={click}
              className={
                house.user &&
                (house.user === 1
                  ? "circle"
                  : house.user === 2
                  ? "times"
                  : "empty")
              }
            ></button>
          </section>
        ))}
      </div>
    </article>
  )
}

export default Main
