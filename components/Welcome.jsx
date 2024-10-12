import React from 'react'
import Image from 'next/image';

const Welcome = ({ name }) => {
  // console.log(fi);
  
  return (
    <section className='rounded-lg flex justify-between items-center px-1 bg-[url("/images/bg.jpg")] bg-center bg-cover drop-shadow bg-slate-100 py-1 h-[17vh]'>
        <div>
            <h1 className='font-medium'>Welcome</h1>
            <h1 className='font-semibold text-2xl capitalize'> {name}</h1>
        </div>
        {/* <div>
            <Image
                alt='welcome-image'
                src={"/images/bg.jpg"}
                width={100}
                height={100}
            />
        </div> */}
    </section>
  )
}

export default Welcome