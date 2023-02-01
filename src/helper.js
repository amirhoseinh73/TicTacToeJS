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
