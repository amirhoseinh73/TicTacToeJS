import {
  WIN_PLAN_1,
  WIN_PLAN_2,
  WIN_PLAN_3,
  WIN_PLAN_4,
  WIN_PLAN_5,
  WIN_PLAN_6,
  WIN_PLAN_7,
  WIN_PLAN_8,
} from "./config"

// random number for cpu easy
export const randomNumber = () => Math.trunc(Math.random() * 9) + 1

const randomNumberRange = (...range) => {
  const min = Math.min(...range)
  const max = Math.max(...range)

  const rand = Math.trunc(Math.random() * (max - min) + min)
  if (!range.includes(rand)) return randomNumberRange(...range)
  return rand
}

export const checkWinPlanMatch = userIds => {
  let checkWin = false
  checkWin = WIN_PLAN_1.every(id => userIds.indexOf(id) >= 0)
  if (checkWin) return true
  checkWin = WIN_PLAN_2.every(id => userIds.indexOf(id) >= 0)
  if (checkWin) return true
  checkWin = WIN_PLAN_3.every(id => userIds.indexOf(id) >= 0)
  if (checkWin) return true
  checkWin = WIN_PLAN_4.every(id => userIds.indexOf(id) >= 0)
  if (checkWin) return true
  checkWin = WIN_PLAN_5.every(id => userIds.indexOf(id) >= 0)
  if (checkWin) return true
  checkWin = WIN_PLAN_6.every(id => userIds.indexOf(id) >= 0)
  if (checkWin) return true
  checkWin = WIN_PLAN_7.every(id => userIds.indexOf(id) >= 0)
  if (checkWin) return true
  checkWin = WIN_PLAN_8.every(id => userIds.indexOf(id) >= 0)
  if (checkWin) return true

  return checkWin
}

export const cpuIdHard = (randomId, state) => {
  const user1Ids = []
  const user2Ids = []
  const emptyCells = []

  state.forEach(cell => {
    if (!cell.user) emptyCells.push(cell.id)

    if (cell.user === 1) user1Ids.push(cell.id)
    if (cell.user === 2) user2Ids.push(cell.id)
  })

  if (!user1Ids.includes(5) && emptyCells.includes(5)) return 5
  if (user1Ids.includes(5) && user1Ids.length === 1) return randomNumberRange(1, 3, 7, 9) //prettier-ignore

  // priority to get win cpu
  if (user2Ids.includes(1) && user2Ids.includes(2) && emptyCells.includes(3)) return 3 //prettier-ignore
  if (user2Ids.includes(1) && user2Ids.includes(3) && emptyCells.includes(2)) return 2 //prettier-ignore
  if (user2Ids.includes(1) && user2Ids.includes(4) && emptyCells.includes(7)) return 7 //prettier-ignore
  if (user2Ids.includes(1) && user2Ids.includes(7) && emptyCells.includes(4)) return 4 //prettier-ignore
  if (user2Ids.includes(1) && user2Ids.includes(5) && emptyCells.includes(9)) return 9 //prettier-ignore
  if (user2Ids.includes(1) && user2Ids.includes(9) && emptyCells.includes(5)) return 5 //prettier-ignore
  if (user2Ids.includes(2) && user2Ids.includes(3) && emptyCells.includes(1)) return 1 //prettier-ignore
  if (user2Ids.includes(2) && user2Ids.includes(5) && emptyCells.includes(8)) return 8 //prettier-ignore
  if (user2Ids.includes(2) && user2Ids.includes(8) && emptyCells.includes(5)) return 5 //prettier-ignore
  if (user2Ids.includes(3) && user2Ids.includes(5) && emptyCells.includes(7)) return 7 //prettier-ignore
  if (user2Ids.includes(3) && user2Ids.includes(7) && emptyCells.includes(5)) return 5 //prettier-ignore
  if (user2Ids.includes(3) && user2Ids.includes(6) && emptyCells.includes(9)) return 9 //prettier-ignore
  if (user2Ids.includes(3) && user2Ids.includes(9) && emptyCells.includes(6)) return 6 //prettier-ignore
  if (user2Ids.includes(4) && user2Ids.includes(5) && emptyCells.includes(6)) return 6 //prettier-ignore
  if (user2Ids.includes(4) && user2Ids.includes(6) && emptyCells.includes(5)) return 5 //prettier-ignore
  if (user2Ids.includes(5) && user2Ids.includes(6) && emptyCells.includes(4)) return 4 //prettier-ignore
  if (user2Ids.includes(5) && user2Ids.includes(7) && emptyCells.includes(3)) return 3 //prettier-ignore
  if (user2Ids.includes(5) && user2Ids.includes(8) && emptyCells.includes(2)) return 2 //prettier-ignore
  if (user2Ids.includes(5) && user2Ids.includes(9) && emptyCells.includes(1)) return 1 //prettier-ignore
  if (user2Ids.includes(6) && user2Ids.includes(9) && emptyCells.includes(3)) return 3 //prettier-ignore
  if (user2Ids.includes(7) && user2Ids.includes(8) && emptyCells.includes(9)) return 9 //prettier-ignore
  if (user2Ids.includes(7) && user2Ids.includes(9) && emptyCells.includes(8)) return 8 //prettier-ignore
  if (user2Ids.includes(8) && user2Ids.includes(9) && emptyCells.includes(1)) return 1 //prettier-ignore

  //stop user 1
  if (user1Ids.includes(1) && user1Ids.includes(2) && emptyCells.includes(3)) return 3 //prettier-ignore
  if (user1Ids.includes(1) && user1Ids.includes(3) && emptyCells.includes(2)) return 2 //prettier-ignore
  if (user1Ids.includes(1) && user1Ids.includes(4) && emptyCells.includes(7)) return 7 //prettier-ignore
  if (user1Ids.includes(1) && user1Ids.includes(5) && emptyCells.includes(9)) return 9 //prettier-ignore
  if (user1Ids.includes(1) && user1Ids.includes(7) && emptyCells.includes(4)) return 4 //prettier-ignore
  if (user1Ids.includes(1) && user1Ids.includes(9) && emptyCells.includes(5)) return 5 //prettier-ignore
  if (user1Ids.includes(2) && user1Ids.includes(3) && emptyCells.includes(1)) return 1 //prettier-ignore
  if (user1Ids.includes(2) && user1Ids.includes(5) && emptyCells.includes(8)) return 8 //prettier-ignore
  if (user1Ids.includes(2) && user1Ids.includes(8) && emptyCells.includes(5)) return 5 //prettier-ignore
  if (user1Ids.includes(3) && user1Ids.includes(5) && emptyCells.includes(7)) return 7 //prettier-ignore
  if (user1Ids.includes(3) && user1Ids.includes(7) && emptyCells.includes(5)) return 5 //prettier-ignore
  if (user1Ids.includes(3) && user1Ids.includes(6) && emptyCells.includes(9)) return 9 //prettier-ignore
  if (user1Ids.includes(3) && user1Ids.includes(9) && emptyCells.includes(6)) return 6 //prettier-ignore
  if (user1Ids.includes(4) && user1Ids.includes(5) && emptyCells.includes(6)) return 6 //prettier-ignore
  if (user1Ids.includes(4) && user1Ids.includes(6) && emptyCells.includes(5)) return 5 //prettier-ignore
  if (user1Ids.includes(5) && user1Ids.includes(6) && emptyCells.includes(4)) return 4 //prettier-ignore
  if (user1Ids.includes(5) && user1Ids.includes(7) && emptyCells.includes(3)) return 3 //prettier-ignore
  if (user1Ids.includes(5) && user1Ids.includes(8) && emptyCells.includes(2)) return 2 //prettier-ignore
  if (user1Ids.includes(5) && user1Ids.includes(9) && emptyCells.includes(1)) return 1 //prettier-ignore
  if (user1Ids.includes(6) && user1Ids.includes(9) && emptyCells.includes(3)) return 3 //prettier-ignore
  if (user1Ids.includes(7) && user1Ids.includes(8) && emptyCells.includes(9)) return 9 //prettier-ignore
  if (user1Ids.includes(7) && user1Ids.includes(9) && emptyCells.includes(8)) return 8 //prettier-ignore
  if (user1Ids.includes(8) && user1Ids.includes(9) && emptyCells.includes(7)) return 7 //prettier-ignore

  //plan of winning user is 8,2,4,6
  if (user1Ids.includes(2) && user1Ids.includes(4) && emptyCells.includes(1)) return randomNumberRange(1, 3, 7) //prettier-ignore
  if (user1Ids.includes(2) && user1Ids.includes(6) && emptyCells.includes(3)) return randomNumberRange(1, 3, 9) //prettier-ignore
  if (user1Ids.includes(4) && user1Ids.includes(8) && emptyCells.includes(7)) return randomNumberRange(1, 7, 9) //prettier-ignore
  if (user1Ids.includes(6) && user1Ids.includes(8) && emptyCells.includes(9)) return randomNumberRange(3, 7, 9) //prettier-ignore

  return randomId
}
