
const TitleComponent = ({ data }) => {

  return (
    <div className='text-lg font-bold w-full h-full flex items-center justify-center'>
      <h2 className='w-full line-clamp-1 text-ellipsis' style={{textAlign: data?.alignment}}>
        {data?.title}
      </h2>
    </div>
  )
}

export default TitleComponent