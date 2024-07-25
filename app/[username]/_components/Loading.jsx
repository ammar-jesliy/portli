import Image from 'next/image'
import React from 'react'
import Logo from '../../../public/Logo-text.svg'

const Loading = () => {
  return (
    <div className='flex flex-col items-center justify-center w-full min-h-screen gap-6 bg-primaryLightBlue/15'>
      <Image src={Logo} alt='logo' width={100} priority />
      <div className='spinner'></div>
    </div>
  )
}

export default Loading