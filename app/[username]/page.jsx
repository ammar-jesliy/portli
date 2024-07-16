'use client'

import {useContext} from 'react'
import { UserPageContext } from '../_context/UserPageContext'

const UserPage = () => {

  const { userDetails, socials, layouts, userComponents } = useContext(UserPageContext)

  console.log(socials)
  console.log(layouts)
  console.log(userComponents)

  if (!userDetails) {
    return <div>User not found</div>
  }

  return (
    <div className='w-full min-h-screen' data-theme={userDetails[0]?.theme}>
      {userDetails[0]?.username}
      {socials.map(social => (
        social.link &&
        <div key={social.id}>
          {social.platform}
        </div>
      ))}
    </div>
  )
}

export default UserPage