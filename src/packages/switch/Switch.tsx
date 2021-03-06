import * as React from 'react'
import * as PropTypes from 'prop-types'
import { Wave, classes } from '../utils'
import '../style/Switch.scss'

interface ISwitchProps {
  checked?: boolean
  defaultChecked?: boolean
  size?: 'small' | 'default'
  onChange?: (checked: boolean, e: React.MouseEvent) => any
  disabled?: boolean
  className?: string
  style?: React.CSSProperties
}

interface ISwitchState {
  derivedChecked: boolean
}

class Switch extends React.Component<ISwitchProps, ISwitchState> {
  public static displayName = 'Switch'

  public static propTypes = {
    defaultChecked: PropTypes.bool,
    onChange: PropTypes.func,
    size: PropTypes.oneOf(['small', 'default']),
    disabled: PropTypes.bool,
    style: PropTypes.object,
    className: PropTypes.string
  }

  public static defaultProps = {
    size: 'default',
    defaultChecked: false
  }

  public static getDerivedStateFromProps(
    nextProps: ISwitchProps,
    prevState: ISwitchState
  ) {
    const { checked } = nextProps
    const { derivedChecked } = prevState
    if ('checked' in nextProps && checked !== derivedChecked) {
      return { derivedChecked: checked }
    }
    return null
  }

  constructor(props: ISwitchProps) {
    super(props)
    this.state = {
      derivedChecked: props.defaultChecked || false
    }
  }

  public handleClick: React.MouseEventHandler = e => {
    const { disabled, onChange } = this.props
    if (disabled) {
      return
    }
    const { derivedChecked } = this.state
    this.setState({
      derivedChecked: !derivedChecked
    })
    if (onChange) {
      onChange(!derivedChecked, e)
    }
  }

  public render() {
    const { size, disabled, style, className } = this.props
    const { derivedChecked } = this.state
    const switchClassName = classes('x-switch', className, size, {
      checked: derivedChecked,
      disabled
    })
    return (
      <Wave closeWave={disabled}>
        <span
          className={switchClassName}
          onClick={this.handleClick}
          style={style}
        >
          <span className="x-switch-core" />
        </span>
      </Wave>
    )
  }
}

export default Switch
