import { useState, useEffect, useRef } from 'react'

interface Props {
  hedaer: JSX.Element
  sidebar: JSX.Element
  topLeft: JSX.Element
  topRight: JSX.Element
  bottomLeft: JSX.Element
  bottomRight: JSX.Element
}

export const Layout = (props: Props) => {
  const headerHeightParcentage = useRef(0)

  useEffect(() => {
    headerHeightParcentage.current = (48 / window.innerHeight) * 100
    console.log(headerHeightParcentage.current)
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
      <div className="flex min-h-screen">
        <div style={{ width: `${sidebarWidth}%` }}>{props.sidebar}</div>
        <div
          className="bg-gray-300 w-1 cursor-col-resize z-2"
          onMouseDown={handleMouseDown}
        ></div>
        <div className="flex-grow">
          {/* --- */}
          <div className="bg-gray-700 min-h-screen pt-12">
            <div className="flex flex-col h-full">
              <div className="h-1/12">
                <div className="grid grid-cols-2 px-2 pt-2 gap-2">
                  <div className="col-span-1">{props.topLeft}</div>
                  <div className="col-span-1">{props.topRight}</div>
                </div>
              </div>
              <div className="h-11/12">
                <div className="grid grid-cols-2 p-2 gap-2 h-[calc(100vh-9rem)]">
                  <div className="col-span-1">{props.bottomLeft}</div>
                  <div className="col-span-1">{props.bottomRight}</div>
                </div>
              </div>
            </div>
          </div>
          {/* --- */}
        </div>
      </div>
    </>
  )
}
