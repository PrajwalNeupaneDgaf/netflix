import React from 'react'

function NetflixLogo() {
  return (
    <div >
        <img onClick={()=>{
       window.location.href = '/'
    }} 
    className='w-[6rem] cursor-pointer saturate-100 flex justify-center items-center' 
    src="https://upload.wikimedia.org/wikipedia/commons/0/08/Netflix_2015_logo.svg" alt="Netflix" />
    </div>
  )
}

export default NetflixLogo