import * as React from 'react'
import * as PropTypes from 'prop-types'
import Option from './Option'
import { classes } from '../utils'
import '../style/Radio.scss'

interface IRadioProps {
  value?: any
  defaultValue?: any
  onChange?: (checkedValue: any, e: React.MouseEvent) => any
  vertical?: boolean
  radioStyle?: 'radio' | 'button'
  className?: string
  style?: React.CSSProperties
}

interface IRadionState {
  checkedValue: any
}

interface IOptionProps {
  value: any
  checkedValue?: any
  onClick?: (checkedValue: any, e: React.MouseEvent) => any
  radioStyle?: 'radio' | 'button'
  disabled?: boolean
  vertical?: boolean
  className?: string
  style?: React.CSSProperties
}

class Radio extends React.Component<IRadioProps, IRadionState> {
  public static displayName = 'Radio'

  public static Option: typeof Option = Option

  public static propTypes = {
    defaultValue: PropTypes.any,
    onChange: PropTypes.func,
    vertical: PropTypes.bool,
    radioStyle: PropTypes.oneOf(['radio', 'button']),
    className: PropTypes.string,
    style: PropTypes.object
  }

  public static defaultProps = {
    vertical: false,
    radioStyle: 'radio'
  }

  public static getDerivedStateFromProps(
    nextProps: IRadioProps,
    prevState: IRadionState
  ) {
    const { value } = nextProps
    const { checkedValue } = prevState
    if ('value' in nextProps && value !== checkedValue) {
      return { checkedValue: value }
    }
    return null
  }

  constructor(props: IRadioProps) {
    super(props)
    this.state = {
      checkedValue: props.defaultValue
    }
  }

  public componentDidMount() {
    const { defaultValue } = this.props
    if (!('value' in this.props) && 'defaultValue' in this.props) {
      this.setState({ checkedValue: defaultValue })
    }
  }

  public renderChildren = () => {
    const { radioStyle, vertical, children } = this.props
    const { checkedValue } = this.state
    return React.Children.map(
      children,
      (child: React.ReactElement<IOptionProps>) => {
        return React.cloneElement(child, {
          onClick: this.handleClick,
          checkedValue,
          radioStyle,
          vertical
        })
      }
    )
  }

  public handleClick: (checkedValue: any, e: React.MouseEvent) => any = (
    checkedValue,
    e
  ) => {
    if (checkedValue !== this.state.checkedValue) {
      this.setState({ checkedValue })
      if (this.props.onChange) {
        this.props.onChange(checkedValue, e)
      }
    }
  }

  public render() {
    const { vertical, className, style } = this.props
    return (
      <div
        className={classes('x-radio', className, { vertical })}
        style={style}
      >
        {this.renderChildren()}
      </div>
    )
  }
}

export default Radio
