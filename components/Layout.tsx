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
  const [contentsHeight, setContentsHeight] = useState(100)
  const [sidebarWidth, setSidebarWidth] = useState(20)
  const [userTextWidth, setUserTextWidth] = useState(40)

  useEffect(() => {
    const height = 100 - (headerHeight / window.innerHeight) * 100
    setContentsHeight(height)
  }, [])

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

  const userTextHandlerDown = (e: { preventDefault: () => void }) => {
    e.preventDefault()
    document.addEventListener('mousemove', handleUserTextWidth)
    document.addEventListener('mouseup', userTextHandlerUp)
  }

  const handleUserTextWidth = (e: { clientX: number }) => {
    const width = (e.clientX / window.innerWidth) * 100 - sidebarWidth
    setUserTextWidth(width)
  }

  const userTextHandlerUp = () => {
    document.removeEventListener('mousemove', handleUserTextWidth)
    document.removeEventListener('mouseup', userTextHandlerUp)
  }

  return (
    <>
      <div className={`fixed w-full z-10 h-[${headerHeight}px]`}>
        {props.hedaer}
      </div>
      <div className={`w-full pb-[${headerHeight}px]`}></div>
      <div className="flex" style={{ height: `${contentsHeight}vh` }}>
        <div style={{ width: `${sidebarWidth}%` }} className="overflow-auto">
          {props.sidebar}
        </div>
        <div
          className="bg-gray-300 w-1 cursor-col-resize z-2"
          onMouseDown={sidebarHandlerDown}
        ></div>
        <div style={{ width: `${userTextWidth}%` }}>
          <div className="grid grid-cols-2 px-2 pt-2 gap-2 bg-blue-300 h-full">
            {/* <div className="col-span-1">{props.leftTop}</div>
              <div className="col-span-1">{props.leftBottom}</div> */}
          </div>
        </div>
        <div
          className="bg-gray-300 w-1 cursor-col-resize z-2"
          onMouseDown={userTextHandlerDown}
        ></div>
        <div className="flex-grow">
          <div className="grid grid-cols-2 px-2 pt-2 gap-2 bg-blue-700 h-full">
            {/* <div className="col-span-1">{props.rightTop}</div>
              <div className="col-span-1">{props.rightBottom}</div> */}
          </div>
        </div>
      </div>
      {/* --- */}
      {/* <div className="bg-gray-700 min-h-screen">
            <div className="flex flex-col h-full">
              <div className="h-1/12">
                <div className="grid grid-cols-2 px-2 pt-2 gap-2">
                  <div className="col-span-1">{props.leftTop}</div>
                  <div className="col-span-1">{props.rightTop}</div>
                </div>
              </div>
              <div className="h-11/12">
                <div className="grid grid-cols-2 p-2 gap-2 h-[calc(100vh-9rem)]">
                  <div className="col-span-1">{props.leftBottom}</div>
                  <div className="col-span-1">{props.rightBottom}</div>
                </div>
              </div>
            </div>
          </div> */}
      {/* --- */}
      {/* </div> */}
      {/* </div> */}
    </>
  )
}
