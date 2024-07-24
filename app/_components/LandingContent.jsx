import React from 'react'
import Header from './Header'
import Hero from './Hero'
import Features from './Features'

const LandingContent = () => {
  return (
    <>
    <div className='w-full h-full absolute bg-gradient-to-b from-primaryLightBlue/35 to-[white] -z-10'></div>
    <div className='max-w-[1250px] mx-auto py-4 px-4'>
        <Header />
        <Hero />
        <Features />
    </div>
    </>
  )
}

export default LandingContent