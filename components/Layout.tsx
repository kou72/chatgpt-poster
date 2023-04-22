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
  const [contentsHeight, setContentsHeight] = useState(100)

  useEffect(() => {
    const height = 100 - (48 / window.innerHeight) * 100
    setContentsHeight(height)
  }, [])

  const [sidebarWidth, setSidebarWidth] = useState(20)

  const handleMouseDown = (e: { preventDefault: () => void }) => {
    e.preventDefault()
    document.addEventListener('mousemove', handleMouseMove)
    document.addEventListener('mouseup', handleMouseUp)
  }

  const handleMouseMove = (e: { clientX: number }) => {
    setSidebarWidth((e.clientX / window.innerWidth) * 100)
  }

  const handleMouseUp = () => {
    document.removeEventListener('mousemove', handleMouseMove)
    document.removeEventListener('mouseup', handleMouseUp)
  }

  return (
    <>
      <div className="fixed w-full z-10 h-[48px]">{props.hedaer}</div>
      <div className="w-full pb-[48px]"></div>
      <div className="flex" style={{ height: `${contentsHeight}vh` }}>
        <div style={{ width: `${sidebarWidth}%` }} className="overflow-auto">
          {props.sidebar}
        </div>
        <div
          className="bg-gray-300 w-1 cursor-col-resize z-2"
          onMouseDown={handleMouseDown}
        ></div>
        {/* <div className="flex-grow"> */}
        <div style={{ width: `40%` }}>
          <div className="grid grid-cols-2 px-2 pt-2 gap-2 bg-blue-300 h-full">
            {/* <div className="col-span-1">{props.leftTop}</div>
              <div className="col-span-1">{props.leftBottom}</div> */}
          </div>
        </div>
        <div style={{ width: `40%` }}>
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
