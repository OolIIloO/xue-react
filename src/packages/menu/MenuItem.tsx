import * as React from 'react'
import * as PropTypes from 'prop-types'
import { classes } from '../utils'
import Transition from '../transition/Transition'

interface IMenuItemProps {
  uniqueKey?: string
  selectedKey?: string
  expandKeys?: string[]
  handleSelectedKey?: (key: string) => any
  handleExpandKeys?: (key: string) => any
  className?: string
  style?: React.CSSProperties
  mode?: 'vertical' | 'horizontal'
  theme?: 'light' | 'dark'
}

class MenuItem extends React.Component<IMenuItemProps> {
  public static displayName = 'MenuItem'

  public static propTypes = {
    uniqueKey: PropTypes.string,
    selectedKey: PropTypes.string,
    expandKeys: PropTypes.arrayOf(PropTypes.string),
    mode: PropTypes.oneOf(['vertical', 'horizontal']),
    theme: PropTypes.oneOf(['light', 'dark']),
    onSelectedChange: PropTypes.func,
    onExpandChange: PropTypes.func,
    className: PropTypes.string,
    style: PropTypes.object
  }

  public render() {
    const {
      uniqueKey,
      selectedKey,
      handleSelectedKey,
      children,
      className,
      style,
      mode,
      theme
    } = this.props
    return (
      <li
        className={classes('x-menu-item', className, theme, mode, {
          active: uniqueKey === selectedKey
        })}
        style={style}
        onClick={() => handleSelectedKey!(uniqueKey as string)}
      >
        {children}
        {mode === 'vertical' && theme === 'light' && (
          <Transition
            visible={uniqueKey === selectedKey && mode === 'vertical'}
            beforeEnter={{ height: '0', top: '50%', opacity: 0 }}
            afterEnter={{ height: '100%', top: '0', opacity: 1 }}
          >
            <div className="x-menu-item-filler" />
          </Transition>
        )}
      </li>
    )
  }
}

export default MenuItem
