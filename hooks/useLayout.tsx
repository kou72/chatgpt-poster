import { useState, useEffect } from 'react'

export const useLayout = () => {
  const headerHeight = 48
  const barWidth = 4
  const [topHeight, setTopHeight] = useState(0)
  const [bottomHeight, setBottomHeight] = useState(0)
  const [sidebarWidth, setSidebarWidth] = useState(0)
  const [leftWidth, setLeftWidth] = useState(0)
  const [rightWidth, setRightWidth] = useState(0)

  useEffect(() => {
    const height = window.innerHeight - (headerHeight + barWidth)
    setTopHeight(height * 0.2)
    setBottomHeight(height * 0.8)

    const width = window.innerWidth - barWidth * 2
    setSidebarWidth(width * 0.2)
    setLeftWidth(width * 0.4)
    setRightWidth(width * 0.4)
  }, [])

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

  const leftRightHandlerDown = (e: { preventDefault: () => void }) => {
    e.preventDefault()
    document.addEventListener('mousemove', handleLeftWidth)
    document.addEventListener('mouseup', leftRightHandlerUp)
  }

  const handleLeftWidth = (e: { clientX: number }) => {
    const contents = window.innerWidth - (sidebarWidth + barWidth * 2)
    const right = window.innerWidth - (e.clientX + barWidth)
    const left = contents - right
    setLeftWidth(left)
    setRightWidth(right)
  }

  const leftRightHandlerUp = () => {
    document.removeEventListener('mousemove', handleLeftWidth)
    document.removeEventListener('mouseup', leftRightHandlerUp)
  }

  const topBottomHandlerDown = (e: { preventDefault: () => void }) => {
    e.preventDefault()
    document.addEventListener('mousemove', handleTopBottomHeight)
    document.addEventListener('mouseup', topBottomHandlerUp)
  }

  const handleTopBottomHeight = (e: { clientY: number }) => {
    const top = e.clientY - (headerHeight + barWidth)
    const bottom = window.innerHeight - e.clientY
    setTopHeight(top)
    setBottomHeight(bottom)
  }

  const topBottomHandlerUp = () => {
    document.removeEventListener('mousemove', handleTopBottomHeight)
    document.removeEventListener('mouseup', topBottomHandlerUp)
  }

  return {
    headerHeight,
    barWidth,
    topHeight,
    bottomHeight,
    sidebarWidth,
    leftWidth,
    rightWidth,
    sidebarHandlerDown,
    leftRightHandlerDown,
    topBottomHandlerDown,
  }
}
