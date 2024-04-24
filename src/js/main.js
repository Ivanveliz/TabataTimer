import '../scss/styles.scss'
import 'bootstrap'
const buttonStartForTime = document.querySelector('#btn-start-forTime')
const buttonStartAmrap = document.querySelector('#btn-start-amrap')
const buttonStartEmom = document.querySelector('#btn-start-emom')
const buttonStartabata = document.querySelector('#btn-start-tabata')
const counter = document.querySelector('#number')
let roundsNumbers = document.querySelector('#rounds-number')
const selectWorkTabata = document.querySelector('#select-work')
const selectRestTabata = document.querySelector('#select-rest')
const totalRoundsTabata = document.querySelector('#select-rounds')
const containerSelectRounds = document.querySelector('#container-select-rounds')

// exporto la funcion para usarla en todos las demas metodologías

export function setUpOptions(selectId) {
  const select = document.querySelector(selectId)

  // agregar los minutos al selec, hasta 30 minutos:
  const options = Array.from({ length: 30 }, (_, index) => index + 1)
  options.forEach((min) => {
    const option = document.createElement('option')
    option.value = min
    option.textContent = min === 1 ? `${min} minuto` : `${min} minutos`
    select.appendChild(option)
  })

  // cambio el valor del contador:
  select.addEventListener('change', function () {
    if (Number(select.value)) {
      counter.textContent = select.value
      roundsNumbers.textContent = select.value
    }
  })
}

// creo una cuenta regresiva antes de que empieze el cronometro.

let countDownInterval
function countDown(button) {
  let countDown = 6
  countDownInterval = setInterval(function () {
    if (countDown > 1) {
      countDown--
      if (countDown === 3) {
      }
      counter.textContent = countDown
    } else {
      clearInterval(countDownInterval)

      switch (button) {
        case buttonStartForTime:
          startTimefortime()
          break
        case buttonStartAmrap:
          startTimeForAmrap()
          break
        case buttonStartEmom:
          startTimeForEmom()
          break
        case buttonStartabata:
          startTimeForTabata()
        default:
          break
      }
    }
  }, 1000)
}

//funcion para pasar de minutos a segundos y pintarlos en la pantalla
export function calcTotalMinSec(seconds) {
  const minutes = Math.floor(seconds / 60)
  const secondsLeft = seconds % 60
  return { minutes, secondsLeft }
}

//funciones para cada una de las metodologías

function startTimefortime() {
  buttonStartForTime.disabled = true
  const totalSec = select.value * 60
  console.log(select.value)
  let minutesBrowser
  let secondsBrowser
  let currentCounter = 0

  let cronometro = setInterval(function () {
    if (currentCounter < totalSec) {
      currentCounter++
      const time = calcTotalMinSec(currentCounter)
      minutesBrowser =
        time.minutes < 10 ? `0${time.minutes}` : `${time.minutes}`
      secondsBrowser =
        time.secondsLeft < 10 ? `0${time.secondsLeft}` : `${time.secondsLeft}`
      counter.textContent = `${minutesBrowser} : ${secondsBrowser}`
    } else {
      clearInterval(cronometro)
      buttonStartForTime.disabled = false
    }
  }, 1000)
}

function startTimeForTabata() {
  containerSelectRounds.classList.add('d-none')
  buttonStartabata.disabled = true

  const secondsWork = selectWorkTabata.value
  const secondsRest = selectRestTabata.value
  let totalSecTabata =
    parseFloat(parseFloat(secondsWork) + parseFloat(secondsRest)) *
    totalRoundsTabata.value

  console.log(totalSecTabata)

  function startRounds() {
    return new Promise((resolve, reject) => {
      let currentRound = 1
      function startNextRounds() {
        if (currentRound <= totalRoundsTabata.value) {
          let currentCounter = secondsWork

          let cronometro = setInterval(function () {
            let minutesBrowser
            let secondsBrowser

            currentCounter--
            const time = calcTotalMinSec(currentCounter)
            minutesBrowser =
              time.minutes < 10 ? `0${time.minutes}` : `${time.minutes}`
            secondsBrowser =
              time.secondsLeft < 10
                ? `0${time.secondsLeft}`
                : `${time.secondsLeft}`
            counter.textContent = `${minutesBrowser} : ${secondsBrowser}`

            if (currentCounter === 0) {
              clearInterval(cronometro)
              currentCounter = secondsRest
              cronometro = setInterval(function () {
                let minutesBrowser
                let secondsBrowser
                currentCounter--
                const time = calcTotalMinSec(currentCounter)
                minutesBrowser =
                  time.minutes < 10 ? `0${time.minutes}` : `${time.minutes}`
                secondsBrowser =
                  time.secondsLeft < 10
                    ? `0${time.secondsLeft}`
                    : `${time.secondsLeft}`
                counter.textContent = `${minutesBrowser} : ${secondsBrowser}`

                if (currentCounter === 0) {
                  clearInterval(cronometro)
                  currentRound++
                  startNextRounds()
                }
              }, 1000)
              currentRound++
              startNextRounds()
            }
          }, 1000)
        } else {
          resolve()
        }
      }
      startNextRounds()
    })
  }
  startRounds(totalRoundsTabata.value).then(() => {
    console.log('Todas las rondas han terminado')
  })
  buttonStartabata.disabled = false
  containerSelectRounds.classList.remove('d-none')
}

function startTimeForAmrap() {
  const totalSec = select.value * 60
  let minutesBrowser
  let secondsBrowser
  let currentCounter = totalSec

  let cronometro = setInterval(function () {
    if (currentCounter > 0) {
      currentCounter--
      const time = calcTotalMinSec(currentCounter)
      minutesBrowser =
        time.minutes < 10 ? `0${time.minutes}` : `${time.minutes}`
      secondsBrowser =
        time.secondsLeft < 10 ? `0${time.secondsLeft}` : `${time.secondsLeft}`
      counter.textContent = `${minutesBrowser} : ${secondsBrowser}`
    } else {
      clearInterval(cronometro)
    }
  }, 1000)
}

function startTimeForEmom() {
  buttonStartEmom.disabled = true
  let rounds = parseInt(select.value)

  function startRounds(rounds) {
    return new Promise((resolve, reject) => {
      let currentRound = 1

      function startNextRounds() {
        if (currentRound <= rounds) {
          let currentCounter = 60
          roundsNumbers.textContent = `Ronda ${currentRound}`

          let cronometro = setInterval(function () {
            let minutesBrowser
            let secondsBrowser

            currentCounter--
            const time = calcTotalMinSec(currentCounter)
            minutesBrowser =
              time.minutes < 10 ? `0${time.minutes}` : `${time.minutes}`
            secondsBrowser =
              time.secondsLeft < 10
                ? `0${time.secondsLeft}`
                : `${time.secondsLeft}`
            counter.textContent = `${minutesBrowser} : ${secondsBrowser}`

            if (currentCounter === 0) {
              clearInterval(cronometro)
              currentRound++

              startNextRounds()
            }
          }, 1000)
        } else {
          resolve() // Resuelve la promesa cuando todas las rondas han terminado
        }
      }
      startNextRounds() // Inicia la primera ronda
    })
  }
  startRounds(rounds).then(() => {
    console.log('Todas las rondas han terminado')
  })
}

// // creo la pausa
// let isPause = false
// function pause() {
//   if (!isPause) {
//     clearInterval(cronometro)

//     isPause = true
//   } else {
//     startTime()
//     isPause = false
//   }
// }

if (buttonStartForTime) {
  buttonStartForTime.addEventListener('click', function () {
    buttonStartForTime.disabled = true
    countDown(buttonStartForTime)
    buttonStartForTime.disabled = false
  })
}

if (buttonStartAmrap) {
  buttonStartAmrap.addEventListener('click', function () {
    buttonStartAmrap.disabled = true
    countDown(buttonStartAmrap)
    buttonStartAmrap.disabled = false
  })
}
if (buttonStartEmom) {
  buttonStartEmom.addEventListener('click', function () {
    buttonStartEmom.disabled = true
    countDown(buttonStartEmom)
    buttonStartEmom.disabled = false
  })
}

if (buttonStartabata) {
  buttonStartabata.addEventListener('click', function () {
    buttonStartabata.disabled = true
    countDown(buttonStartabata)
    buttonStartabata.disabled = false
  })
}
