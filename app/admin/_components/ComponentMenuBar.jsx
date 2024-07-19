

const ComponentMenuBar = ({ children, orientation }) => {
  return (
    <div className={`bg-white border absolute rounded-[10px] shadow-md hidden group-hover:flex items-center px-2 py-1 z-50 ${orientation === "vertical" ? 'w-10 right-0 translate-x-1/3 flex-col' : 'h-10 flex-row translate-y-1/3 bottom-0'} `}>{children}</div>
  )
}

export default ComponentMenuBar