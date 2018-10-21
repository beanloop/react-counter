import * as React from 'react'
export type Easing = (n: number) => number

export interface State {
  /**
   * The current value of the animation
   */
  value: number
  /**
   * Timestamp indicating the start of the animation
   */
  start: number
  /**
   * Indicates wheter the counter is animating
   */
  isAnimating: boolean
}

export interface Props {
  /**
   * Which number to animate from. Defaults to 0
   */
  from?: number
  /**
   * Which number to animate to. Required
   */
  to: number
  /**
   * Duration in ms for the animation to run. Defaults to 1000
   */
  duration?: number
  /**
   * Easing function to use. Defaults to an easeOutCubic function
   */
  easing?: Easing

  children?: (n: number) => JSX.Element
}

/**
 *
 * The default easing function
 *
 * @param n number
 */
const easeOutCubic: Easing = n => --n * n * n + 1

class Counter extends React.Component<Props, State> {
  public state = {
    value: 0,
    start: Date.now(),
    isAnimating: true,
  }

  private animate = () => {
    if (this.state.isAnimating) {
      window.requestAnimationFrame(this.animate)

      const now = Date.now()
      const {to} = this.props
      const {start} = this.state
      const from = this.props.from || 0
      const duration = this.props.duration || 1000
      const easing = this.props.easing || easeOutCubic

      if (now - start >= duration) {
        this.setState({isAnimating: false})
      }

      let percentage = (now - start) / duration
      percentage = percentage > 1 ? 1 : percentage
      const easingVal = easing(percentage)

      const value = from + (to - from) * easingVal

      this.setState({
        value: Math.round(value),
      })
    }
  }

  public componentDidMount() {
    window.requestAnimationFrame(this.animate)
  }

  public render() {
    const {value} = this.state

    if (this.props.children && typeof this.props.children === 'function') {
      return this.props.children(value)
    }
    return <span>{value}</span>
  }
}

export {Counter}
