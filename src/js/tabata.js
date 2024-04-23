import { calcTotalMinSec } from './main'
const selectWork = document.querySelector('#select-work')
const selectRest = document.querySelector('#select-rest')
const selectRounds = document.querySelector('#select-rounds')
let totalTimeTabata = document.querySelector('#total-time-tabata')
function setUpOptionsSec(select) {
  // agrego los segundos:
  const options = Array.from({ length: 60 }, (_, index) => index + 1)
  options.forEach((sec) => {
    const option = document.createElement('option')
    option.value = sec
    option.textContent = sec === 1 ? `${sec} segundo` : `${sec} segundos`
    select.appendChild(option)
  })
}
setUpOptionsSec(selectRest)
setUpOptionsSec(selectWork)

function setUpOptionsRounds(select) {
  // agrego los segundos:
  const options = Array.from({ length: 30 }, (_, index) => index + 1)
  options.forEach((sec) => {
    const option = document.createElement('option')
    option.value = sec
    option.textContent = sec
    select.appendChild(option)
  })
}

setUpOptionsRounds(selectRounds)

//sacar total de tiempo de trabajo:
function updateTotalTime() {
  let totalSecTabata =
    (Number(selectRest.value) + Number(selectWork.value)) *
    Number(selectRounds.value)

  let timeTabata = calcTotalMinSec(totalSecTabata)

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

updateTotalTime()
selectRest.addEventListener('change', updateTotalTime)
selectWork.addEventListener('change', updateTotalTime)
selectRounds.addEventListener('change', updateTotalTime)
