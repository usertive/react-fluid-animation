import React, { Component } from 'react'
import PropTypes from 'prop-types'

import raf from 'raf'
import sizeMe from 'react-sizeme'

import FluidAnimation, { defaultConfig } from './fluid-animation'

class ReactFluidAnimation extends Component {
  static propTypes = {
    content: PropTypes.string,
    config: PropTypes.object,
    style: PropTypes.object,
    animationRef: PropTypes.func,
    size: PropTypes.shape({
      width: PropTypes.number,
      height: PropTypes.number
    })
  }

  static defaultProps = {
    config: defaultConfig,
    style: { }
  }

  componentDidMount() {
    window.addEventListener('resize', this._onResize)
    this._reset(this.props)
    this._tick()
    this._animation.start();
  }

  componentDidUpdate(prevProps, prevState, snapshot) {
    this._onResize()

    if (this.props.config) {
      this._animation.config = {
        ...this.props.config,
        defaultConfig
      }
    }
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this._onResize)
    if (this._tickRaf) {
      raf.cancel(this._tickRaf)
      this._tickRaf = null
    }
  }

  render() {
    const {
      content,
      config,
      animationRef,
      style,
      size,
      ...rest
    } = this.props

    return (
      <div
        style={{
          width: '100%',
          height: '100%',
          overflow: 'hidden',
          ...style
        }}
        {...rest}
        ref={this._containerRef}
      >
        <canvas
          ref={this._canvasRef}
          onMouseEnter={this._onMouseEnter}
          onMouseMove={this._onMouseMove}
          onMouseLeave={this.onMouseLeave}
          onClick={this._onMouseClick}
          onTouchStart={this._onTouchStart}
          onTouchMove={this._onTouchMove}
          onTouchEnd={this._onTouchEnd}
          style={{
            width: '100%',
            height: '100%'
          }}
        />
      </div>
    )
  }

  _containerRef = (ref) => {
    this._container = ref
  }

  _canvasRef = (ref) => {
    this._canvas = ref
  }

  _onMouseEnter = (event) => {
    event.preventDefault()
    this._animation.start()
  }

  _onMouseMove = (event) => {
    event.preventDefault()
    this._animation.onMouseMove(event.nativeEvent)
  }

  onMouseLeave = (event) => {
    event.preventDefault()
    this._animation.end()
  }

  _onMouseClick = (event) => {
    event.preventDefault();
    this._animation.changeColor();
  }

  _onTouchStart = (event) => {
    this._animation.onTouchStart(event.nativeEvent)
  }

  _onTouchMove = (event) => {
    this._animation.onTouchMove(event.nativeEvent)
  }

  _onTouchEnd = (event) => {
    this._animation.onTouchEnd(event.nativeEvent)
  }

  _onResize = () => {
    this._canvas.width = this._container.clientWidth
    this._canvas.height = this._container.clientHeight

    if (this._animation) {
      this._animation.resize()
    }
  }

  _tick = () => {
    if (this._animation) {
      this._animation.update()
    }

    this._tickRaf = raf(this._tick)
  }

  _reset(props) {
    const {
      animationRef,
      content,
      config
    } = props

    this._onResize()

    this._animation = new FluidAnimation({
      canvas: this._canvas,
      content,
      config
    })

    if (animationRef) {
      animationRef(this._animation)
      // this._animation.addRandomSplats(parseInt(Math.random() * 20) + 5)
    }
  }
}

export default sizeMe({ monitorWidth: true, monitorHeight: true })(ReactFluidAnimation)
