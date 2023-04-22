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
  const barHeight = 2
  const [sidebarWidth, setSidebarWidth] = useState(20)
  const [leftWidth, setLeftWidth] = useState(40)
  const [topHeight, setTopHeight] = useState(50)
  const [bottomHeight, setBottomHeight] = useState(50)

  useEffect(() => {
    const contents = 100 - (headerHeight / window.innerHeight) * 100
    const bottom = contents - topHeight
    setBottomHeight(bottom)
  }, [])

  const SidebarWidthHandleBar = () => {
    return (
      <div
        className="bg-gray-300 w-1 cursor-col-resize z-2"
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
    const width = (e.clientX / window.innerWidth) * 100
    setSidebarWidth(width)
  }

  const sidebarHandlerUp = () => {
    document.removeEventListener('mousemove', handleSidebarWidth)
    document.removeEventListener('mouseup', sidebarHandlerUp)
  }

  const LeftRightWidthHandleBar = () => {
    return (
      <div
        className="bg-gray-300 w-1 cursor-col-resize z-2"
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
    const width = (e.clientX / window.innerWidth) * 100 - sidebarWidth
    setLeftWidth(width)
  }

  const LeftRightHandlerUp = () => {
    document.removeEventListener('mousemove', handleleftWidth)
    document.removeEventListener('mouseup', LeftRightHandlerUp)
  }

  const TopBottomHeightHandleBar = () => {
    return (
      <div
        className="bg-gray-300 h-1 cursor-row-resize z-2"
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
    const top = ((e.clientY - headerHeight) / window.innerHeight) * 100
    const bottom = ((window.innerHeight - e.clientY) / window.innerHeight) * 100
    setTopHeight(top)
    setBottomHeight(bottom)
  }

  const TopBottomHandlerUp = () => {
    document.removeEventListener('mousemove', handleTopBottomHeight)
    document.removeEventListener('mouseup', TopBottomHandlerUp)
  }

  return (
    <>
      <div className={`fixed w-full z-10 h-[${headerHeight}px]`}>
        {props.hedaer}
      </div>
      <div className={`w-full pb-[${headerHeight}px]`}></div>
      <div className="flex" style={{ height: `${topHeight + bottomHeight}vh` }}>
        <div style={{ width: `${sidebarWidth}%` }} className="overflow-auto">
          {props.sidebar}
        </div>
        <SidebarWidthHandleBar />

        <div className="h-full" style={{ width: `${leftWidth}%` }}>
          <div className="p-1" style={{ height: `${topHeight}vh` }}>
            {props.leftTop}
          </div>
          <TopBottomHeightHandleBar />
          <div className="p-1" style={{ height: `${bottomHeight}vh` }}>
            {props.leftBottom}
          </div>
        </div>
        <LeftRightWidthHandleBar />
        <div className="h-full flex-grow">
          <div className="p-1" style={{ height: `${topHeight}vh` }}>
            {props.rightTop}
          </div>
          <TopBottomHeightHandleBar />
          <div className="p-1" style={{ height: `${bottomHeight}vh` }}>
            {props.rightBottom}
          </div>
        </div>
      </div>
    </>
  )
}
