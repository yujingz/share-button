import React, { Component } from 'react'
import cx from 'classnames'
import './ShareButton.css'
import RippleCircle from './RippleCircle.jsx'

const SOCIAL_MEDIAS = [
  { name: 'Facebook', style: {color: '#5F7FC3'}, count: 12 },
  { name: 'Twitter',  style: {color: '#73B8F2'}, count: 50 },
  { name: 'Google +', style: {color: '#EB8368'}, count: 248 }
]

class App extends Component {
  constructor (props) {
    super(props)

    this.state = {
      expanded: false,
      cursorPos: {}
    }
  }

  renderSocialMedias () {
    const socialMedias = SOCIAL_MEDIAS.map((social, index) => {
      return (
        <li className='social-media' key={index} style={social.style}>
          <span className='social-media-name'> {social.name} </span>
          <span className='social-media-counter'> {social.count} </span>
        </li>
      )
    })

    return (
      <ul className='social-medias'>
        {socialMedias}
      </ul>
    )
  }

  onCollapsingShareDetails () {
    this.setState({expanded: false})
  }

  onClickShare (e) {
    if (!this.state.expanded) {
      const cursorPos = {
        top: e.clientY,
        left: e.clientX,
        time: Date.now()
      }

      this.circle.startAnimating(cursorPos)
      setTimeout(() => {
        this.setState({expanded: true})
      }, 300)
    }
  }

  render () {
    const expandableCx = cx('expandable-button', {expanded: this.state.expanded})
    const headerCx = cx('header', {expanded: this.state.expanded})
    const titleCx = cx('title', {expanded: this.state.expanded})
    const closeCx = cx('fa fa-times close-btn', {expanded: this.state.expanded})

    return (
      <div className={expandableCx} onClick={this.onClickShare.bind(this)}>
        <div className={headerCx}>
          <span className={titleCx}>SHARE</span>
          <i className={closeCx} onClick={this.onCollapsingShareDetails.bind(this)} />
          {this.renderSocialMedias()}
          <input type='text' className='link-input'
            onFocus={(e) => e.target.select() }
            readOnly defaultValue='https://www.gogole.com/' />
        </div>

        <RippleCircle ref={circle => this.circle = circle} />
      </div>
    )
  }
}

export default App
