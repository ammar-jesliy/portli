

const ComponentMenuBar = ({ children }) => {
  return (
    <div className="h-10 bg-white border absolute bottom-0 translate-y-1/2 rounded-[10px] shadow-md hidden group-hover:flex items-center px-2">{children}</div>
  )
}

export default ComponentMenuBar