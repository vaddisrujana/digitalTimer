import {Component} from 'react'
import './index.css'

class DigitalTimer extends Component {
  state = {
    timer: false,
    minutes: 25,
    seconds: '00',
    count: 25,
  }

  componentWillUnmount() {
    this.clearTimerInterval()
  }

  clearTimerInterval = () => clearInterval(this.intervalId)

  onIncrement = () => {
    const {timer} = this.state
    if (timer === false) {
      this.setState(prevState => ({count: prevState.count + 1}))
      this.setState(prevState => ({minutes: prevState.minutes + 1}))
    }
  }

  onDecrement = () => {
    const {timer} = this.state
    if (timer === false) {
      this.setState(prevState => ({count: prevState.count - 1}))
      this.setState(prevState => ({minutes: prevState.minutes - 1}))
    }
  }

  tick = () => {
    const {minutes, seconds} = this.state
    if (minutes === 0) {
      this.setState({minutes: '00'})
    } else if (seconds === '00' || seconds === 0) {
      this.setState({seconds: 59})
      this.setState(prevState => ({minutes: prevState.minutes - 1}))
    } else {
      this.setState(prevState => ({seconds: prevState.seconds - 1}))
    }
  }

  onPauseOrStart = () => {
    const {timer} = this.state
    this.setState(prevState => ({timer: !prevState.timer}))
    if (timer === true) {
      console.log('unmount')
      this.clearTimerInterval()
    } else {
      console.log('mount')
      this.intervalId = setInterval(this.tick, 1000)
    }
  }

  onReset = () => {
    this.setState({minutes: 25, seconds: '00', count: 25})
    this.clearTimerInterval()
  }

  render() {
    const {timer, minutes, seconds, count} = this.state
    const text = timer ? 'Pause' : 'Start'
    const alt = timer ? 'pause icon' : 'play icon'
    const image = timer
      ? 'https://assets.ccbp.in/frontend/react-js/pause-icon-img.png'
      : 'https://assets.ccbp.in/frontend/react-js/play-icon-img.png'
    const text1 = timer ? 'Running' : 'Paused'
    return (
      <div className="timer">
        <h1 className="heading">Digital Timer</h1>
        <div className="background">
          <div className="timer1">
            <h1 className="time">
              {minutes}:{seconds}
            </h1>
            <p className="paused">{text1}</p>
          </div>

          <div className="timer2">
            <div className="background3">
              <div className="background1">
                <button
                  className="start"
                  onClick={this.onPauseOrStart}
                  type="button"
                >
                  <p>{text}</p> <img src={image} className="image1" alt={alt} />
                </button>
              </div>
              <div className="background2">
                <button className="reset" onClick={this.onReset} type="button">
                  <img
                    src="https://assets.ccbp.in/frontend/react-js/reset-icon-img.png"
                    className="image2"
                    alt="reset icon"
                  />
                  <p>Reset</p>
                </button>
              </div>
            </div>
            <p className="para">Set Timer Limit</p>
            <div className="back">
              <button
                className="button1"
                onClick={this.onDecrement}
                type="button"
              >
                -
              </button>
              <p className="para1">{count}</p>
              <button
                className="button2"
                onClick={this.onIncrement}
                type="button"
              >
                +
              </button>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default DigitalTimer
