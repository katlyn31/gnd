import React from 'react'
import Arrow from '../assets/arrow.png'
export default function Button({text}) {
  return (
   <button className='p-4 cursor-pointer border rounded-full font-bold bg-amber-500 items-center flex gap-2 hover:bg-amber-700'>{text} <img className='w-20' src={Arrow}/></button>
  )
}
