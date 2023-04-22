import { useState } from 'react'
import Header from './Header'
import Sidebar from './Sidebar'
import Head from 'next/head'

export const Layout = ({ children }: { children: any }) => {
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
      <div className="fixed w-full h-12 z-10">
        <Header />
      </div>
      <div className="flex min-h-screen">
        <div style={{ width: `${sidebarWidth}%` }}>
          <Sidebar />
        </div>
        <div
          className="bg-gray-300 w-1 cursor-col-resize z-2"
          onMouseDown={handleMouseDown}
        ></div>
        <div className="flex-grow">
          <main>{children}</main>
        </div>
      </div>
    </>
  )
}
