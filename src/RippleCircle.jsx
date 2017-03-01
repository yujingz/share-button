import React from 'react'
import cx from 'classnames'
import './RippleCircle.css'

export default class RippleCicle extends React.Component {
  constructor (props) {
    super(props)

    this.state = {
      animating: false, width: 0, height: 0, top: 0, left: 0
    }
  }

  performAnimation (cursorPos, callback) {
    const {ripple} = this.refs
    const container = ripple.parentElement
    const containerPos = container.getBoundingClientRect()

    const circleDiam = Math.max(container.offsetWidth, container.offsetHeight)

    const params = {
      animating: true,
      width: circleDiam,
      height: circleDiam,
      top: cursorPos.top - containerPos.top - circleDiam / 2,
      left: cursorPos.left - containerPos.left - circleDiam / 2
    }

    this.setState(params, () => {
      setTimeout(callback)
    })
  }

  startAnimating (cursorPos, callback) {
    if (this.state.animating) {
      this.setState({animating: false}, () => {
        this.performAnimation(cursorPos, callback)
      })
    } else {
      this.performAnimation(cursorPos, callback)
    }
  }

  render () {
    const circleStyle = {
      top: this.state.top,
      left: this.state.left,
      width: this.state.width,
      height: this.state.height,
    }

    const circleCx = cx('ripple', {
      animating: this.state.animating
    })

    return (
      <div className={circleCx} style={circleStyle} ref='ripple' />
    )
  }
}
