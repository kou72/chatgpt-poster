import { useState, useEffect, useRef } from 'react'

interface Props {
  hedaer: JSX.Element
  sidebar: JSX.Element
  leftTop: JSX.Element
  leftBottom: JSX.Element
  rightTop: JSX.Element
  rightBottom: JSX.Element
}

export const Layout = (props: Props) => {
  const headerHeight = 48
  const barWidth = 4
  const [topHeight, setTopHeight] = useState(0)
  const [bottomHeight, setBottomHeight] = useState(0)
  const [sidebarWidth, setSidebarWidth] = useState(0)
  const [leftWidth, setLeftWidth] = useState(0)
  const [rightWidth, setRightWidth] = useState(0)

  /* eslint-disable react-hooks/exhaustive-deps */
  useEffect(() => {
    const height = window.innerHeight - (headerHeight + barWidth)
    setTopHeight(height * 0.2)
    setBottomHeight(height * 0.8)

    const width = window.innerWidth - barWidth * 2
    setSidebarWidth(width * 0.2)
    setLeftWidth(width * 0.4)
    setRightWidth(width * 0.4)
  }, [])

  const SidebarWidthHandleBar = () => {
    return (
      <div
        className="bg-gray-500 cursor-col-resize z-2"
        style={{ width: `${barWidth}px` }}
        onMouseDown={sidebarHandlerDown}
      ></div>
    )
  }

  const sidebarHandlerDown = (e: { preventDefault: () => void }) => {
    e.preventDefault()
    document.addEventListener('mousemove', handleSidebarWidth)
    document.addEventListener('mouseup', sidebarHandlerUp)
  }

  const handleSidebarWidth = (e: { clientX: number }) => {
    const sidebar = e.clientX
    const contents = window.innerWidth - (sidebar + barWidth * 2)
    const left = contents * (leftWidth / (leftWidth + rightWidth))
    const right = contents * (rightWidth / (leftWidth + rightWidth))
    setSidebarWidth(sidebar)
    setLeftWidth(left)
    setRightWidth(right)
  }

  const sidebarHandlerUp = () => {
    document.removeEventListener('mousemove', handleSidebarWidth)
    document.removeEventListener('mouseup', sidebarHandlerUp)
  }

  const LeftRightWidthHandleBar = () => {
    return (
      <div
        className="bg-gray-500 cursor-col-resize z-2"
        style={{ width: `${barWidth}px` }}
        onMouseDown={LeftRightHandlerDown}
      ></div>
    )
  }

  const LeftRightHandlerDown = (e: { preventDefault: () => void }) => {
    e.preventDefault()
    document.addEventListener('mousemove', handleleftWidth)
    document.addEventListener('mouseup', LeftRightHandlerUp)
  }

  const handleleftWidth = (e: { clientX: number }) => {
    const contents = window.innerWidth - (sidebarWidth + barWidth * 2)
    const right = window.innerWidth - (e.clientX + barWidth)
    const left = contents - right
    setLeftWidth(left)
    setRightWidth(right)
  }

  const LeftRightHandlerUp = () => {
    document.removeEventListener('mousemove', handleleftWidth)
    document.removeEventListener('mouseup', LeftRightHandlerUp)
  }

  const TopBottomHeightHandleBar = () => {
    return (
      <div
        className="bg-gray-500 cursor-row-resize z-2"
        style={{ height: `${barWidth}px` }}
        onMouseDown={TopBottomHandlerDown}
      ></div>
    )
  }

  const TopBottomHandlerDown = (e: { preventDefault: () => void }) => {
    e.preventDefault()
    document.addEventListener('mousemove', handleTopBottomHeight)
    document.addEventListener('mouseup', TopBottomHandlerUp)
  }

  const handleTopBottomHeight = (e: { clientY: number }) => {
    const top = e.clientY - (headerHeight + barWidth)
    const bottom = window.innerHeight - e.clientY
    setTopHeight(top)
    setBottomHeight(bottom)
  }

  const TopBottomHandlerUp = () => {
    document.removeEventListener('mousemove', handleTopBottomHeight)
    document.removeEventListener('mouseup', TopBottomHandlerUp)
  }

  return (
    <>
      <div
        className="fixed w-full z-10"
        style={{ height: `${headerHeight}px` }}
      >
        {props.hedaer}
      </div>
      <div
        className="w-full"
        style={{ paddingBottom: `${headerHeight}px` }}
      ></div>
      <div
        className="flex bg-gray-700"
        style={{ height: `${topHeight + bottomHeight + barWidth - 1}px` }}
      >
        <div className="overflow-auto" style={{ width: `${sidebarWidth}px` }}>
          {props.sidebar}
        </div>
        <SidebarWidthHandleBar />
        <div
          className="h-full flex flex-col"
          style={{ width: `${leftWidth}px` }}
        >
          <div className="p-1" style={{ height: `${topHeight}px` }}>
            {props.leftTop}
          </div>
          <TopBottomHeightHandleBar />
          <div className="p-1" style={{ height: `${bottomHeight}px` }}>
            {props.leftBottom}
          </div>
        </div>
        <LeftRightWidthHandleBar />
        <div
          className="h-full flex flex-col"
          style={{ width: `${rightWidth}px` }}
        >
          <div className="p-1" style={{ height: `${topHeight}px` }}>
            {props.rightTop}
          </div>
          <TopBottomHeightHandleBar />
          <div className="p-1" style={{ height: `${bottomHeight}px` }}>
            {props.rightBottom}
          </div>
        </div>
      </div>
    </>
  )
}
