import { countDownInterval, counter, startTime } from './main'

export function countDown() {
  let countDown = 6
  countDownInterval = setInterval(function () {
    if (countDown > 1) {
      countDown--
      counter.textContent = countDown
    } else {
      clearInterval(countDownInterval)
      counter.disabled = false

      startTime(buttonId)
    }
  }, 1000)
}
