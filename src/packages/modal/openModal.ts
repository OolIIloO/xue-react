import * as React from 'react'
import * as ReactDOM from 'react-dom'
import { uniqueId } from '../utils'
import Modal from './Modal'

interface IModalOptions {
  title: string | React.ReactNode
  content: string | React.ReactNode
  okText?: string
  okType?: 'default' | 'dashed' | 'primary' | 'danger'
  cancelText?: string
  cancelType?: 'default' | 'dashed' | 'primary' | 'danger'
  maskClosable?: boolean
  afterClose?: () => any
  className?: string
  style?: React.CSSProperties
}

const containerMap = {}

function addModalContainer(modalId: string, container: HTMLDivElement) {
  containerMap[modalId] = container
}

function ensureUniqueModalInstance(modalId: string) {
  if (containerMap[modalId]) {
    throw new Error(`Duplicate modalId found: ${modalId}`)
  }
}

export function openModal(options: IModalOptions) {
  const modalId = uniqueId('$x-modal$-')
  ensureUniqueModalInstance(modalId)
  return new Promise((resolve, reject) => {
    const {
      title,
      content,
      okText,
      okType = 'primary',
      cancelText,
      cancelType = 'default',
      maskClosable,
      afterClose,
      className,
      style
    } = options
    const container = document.createElement('div')
    document.body.append(container)
    const modalInstance = React.createElement(
      Modal as React.ComponentClass,
      {
        visible: true,
        mode: 'imperative',
        title,
        content,
        okText,
        okType,
        cancelText,
        cancelType,
        maskClosable,
        promiseHandler: { resolve, reject },
        modalId,
        afterClose,
        className,
        style
      } as React.ClassAttributes<any>
    )
    ReactDOM.render(modalInstance, container)
    addModalContainer(modalId, container)
  })
}

export function removeModal(modalId: string) {
  if (!containerMap[modalId]) {
    return
  }
  const container = containerMap[modalId]
  ReactDOM.unmountComponentAtNode(container)
  container.remove()
  delete containerMap[modalId]
}
