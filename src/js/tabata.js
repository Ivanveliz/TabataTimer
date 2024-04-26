import { calcTotalMinSec } from './main'
//VARIBLES PARA METODOLOGA TABATA

export function setUpOptionsSec(select) {
  // agrego los segundos:
  const options = Array.from({ length: 60 }, (_, index) => index + 1)
  options.forEach((sec) => {
    const option = document.createElement('option')
    option.value = sec
    option.textContent = sec === 1 ? `${sec} segundo` : `${sec} segundos`
    select.appendChild(option)
  })
}

export function setUpOptionsRounds(select) {
  // agrego los segundos:
  const options = Array.from({ length: 30 }, (_, index) => index + 1)
  options.forEach((sec) => {
    const option = document.createElement('option')
    option.value = sec
    option.textContent = sec
    select.appendChild(option)
  })
}

//sacar total de tiempo de trabajo:
export function updateTotalTimeTabata(
  selectRest,
  selectWork,
  selectRounds,
  totalTimeTabata,
) {
  let totalSecTabata =
    (Number(selectRest.value) + Number(selectWork.value)) *
    Number(selectRounds.value)

  let timeTabata = calcTotalMinSec(totalSecTabata)
  console.log(timeTabata)
  let minutesBrowser
  let secondsBrowser
  minutesBrowser =
    timeTabata.minutes < 10
      ? `0${timeTabata.minutes}:`
      : `${timeTabata.minutes}:`
  secondsBrowser =
    timeTabata.secondsLeft < 10
      ? `0${timeTabata.secondsLeft}`
      : timeTabata.secondsLeft
  totalTimeTabata.textContent = minutesBrowser + secondsBrowser
}
