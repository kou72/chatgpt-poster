import { useLayout } from '@/hooks/useLayout'

interface Props {
  hedaer: JSX.Element
  sidebar: JSX.Element
  leftTop: JSX.Element
  leftBottom: JSX.Element
  rightTop: JSX.Element
  rightBottom: JSX.Element
}

export const Layout = (props: Props) => {
  const {
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
  } = useLayout()

  const SidebarWidthHandleBar = () => {
    return (
      <div
        className="bg-gray-500 cursor-col-resize z-2"
        style={{ width: `${barWidth}px` }}
        onMouseDown={sidebarHandlerDown}
      ></div>
    )
  }

  const LeftRightWidthHandleBar = () => {
    return (
      <div
        className="bg-gray-500 cursor-col-resize z-2"
        style={{ width: `${barWidth}px` }}
        onMouseDown={leftRightHandlerDown}
      ></div>
    )
  }

  const TopBottomHeightHandleBar = () => {
    return (
      <div
        className="bg-gray-500 cursor-row-resize z-2"
        style={{ height: `${barWidth}px` }}
        onMouseDown={topBottomHandlerDown}
      ></div>
    )
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
          <div
            className="px-1 pt-1 pb-3"
            style={{ height: `${bottomHeight}px` }}
          >
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
          <div
            className="px-1 pt-1 pb-4"
            style={{ height: `${bottomHeight}px` }}
          >
            {props.rightBottom}
          </div>
        </div>
      </div>
    </>
  )
}
