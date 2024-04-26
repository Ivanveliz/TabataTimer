import { Button } from 'bootstrap'
import { setUpOptionsSec } from './tabata.js'
import { setUpOptionsRounds } from './tabata.js'
import { updateTotalTimeTabata } from './tabata.js'
import '../scss/styles.scss'
import 'bootstrap'
//botones del index
const buttonForTime = document.querySelector('#btn-for-time')
const buttonAmrap = document.querySelector('#btn-amrap')
const buttonEmom = document.querySelector('#btn-emom')
const buttonTabata = document.querySelector('#btn-tabata')

//botones de start de cada metodologia
let buttonStartForTime = document.querySelector('#btn-start-for-time')
let buttonStartAmrap = document.querySelector('#btn-start-amrap')
let buttonStartabata = document.querySelector('#btn-start-tabata')
let buttonStartEmom = document.querySelector('#btn-start-emom')

let roundsNumbers = document.querySelector('#rounds-number')
let selectWorkTabata = document.querySelector('#select-work')
let selectRestTabata = document.querySelector('#select-rest')
let totalTimeTabata = document.querySelector('#total-time-tabata')
let totalRoundsTabata = document.querySelector('#select-rounds')
let containerSelectRounds = document.querySelector('#container-select-rounds')

// agregar los minutos al selec, hasta 30 minutos: esto sirve para EMOM, AMRAP y FOR TIME
function setUpOptions(select) {
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

//renderizado de las metodologías
function rederHTML(url) {
  fetch(url)
    .then((response) => {
      if (!response.ok) {
        throw new Error('La solicitud no fue exitosa')
      }
      return response.text()
    })
    .then((html) => {
      document.body.innerHTML = html
      const select = document.querySelector('#select')

      buttonStartAmrap = document.querySelector('#btn-start-amrap')
      buttonStartForTime = document.querySelector('#btn-start-for-time')
      buttonStartabata = document.querySelector('#btn-start-tabata')
      buttonStartEmom = document.querySelector('#btn-start-emom')
      roundsNumbers = document.querySelector('#rounds-number')
      selectWorkTabata = document.querySelector('#select-work')
      selectRestTabata = document.querySelector('#select-rest')
      totalRoundsTabata = document.querySelector('#select-rounds')
      totalTimeTabata = document.querySelector('#total-time-tabata')

      if (buttonStartForTime) {
        setUpOptions(select)
        buttonStartForTime.addEventListener('click', function () {
          buttonStartForTime.disabled = true
          countDown(buttonStartForTime)
          buttonStartForTime.disabled = false
        })
      } else if (buttonStartAmrap) {
        setUpOptions(select)
        buttonStartAmrap.addEventListener('click', function () {
          buttonStartAmrap.disabled = true
          countDown(buttonStartAmrap)
          buttonStartAmrap.disabled = false
        })
      } else if (buttonStartEmom) {
        setUpOptions(select)
        buttonStartEmom.addEventListener('click', function () {
          buttonStartEmom.disabled = true
          countDown(buttonStartEmom)
          buttonStartEmom.disabled = false
        })
      } else if (buttonStartabata) {
        setUpOptionsSec(selectRestTabata)
        setUpOptionsSec(selectWorkTabata)
        setUpOptionsRounds(totalRoundsTabata)
        updateTotalTimeTabata(
          selectRestTabata,
          selectWorkTabata,
          totalRoundsTabata,
          totalTimeTabata,
        )

        selectRestTabata.addEventListener('change', updateTotalTimeTabata)
        selectWorkTabata.addEventListener('change', updateTotalTimeTabata)
        totalRoundsTabata.addEventListener('change', updateTotalTimeTabata)
      }
    })
}

buttonForTime.addEventListener('click', function () {
  rederHTML('../pages/forTime.html')
})

buttonAmrap.addEventListener('click', function () {
  rederHTML('../pages/amrap.html')
})

buttonEmom.addEventListener('click', function () {
  rederHTML('../pages/emom.html')
})

buttonTabata.addEventListener('click', function () {
  rederHTML('../pages/tabata.html')
})

// creo una cuenta regresiva antes de que empieze el cronometro, y agrego un switch para que se active dependiendo de la metodologia
let counter
let countDownInterval
function countDown(button) {
  counter = document.querySelector('#number')
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

//cronometro para cada una de las metodologías

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
