import React from 'react'

const layout = ({ children }) => {
  return (
    <div className='bg-no-repeat bg-center bg-cover bg-[url("/images/bg.jpg")]'>
        {children}
    </div>
  )
}

export default layout;