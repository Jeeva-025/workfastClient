import React from 'react'
import { FiPhone } from "react-icons/fi";
import { MdOutlineEmail } from "react-icons/md";
import { CiEdit } from "react-icons/ci";
import { IoClose } from "react-icons/io5";
import { GoDotFill } from "react-icons/go";
import { LuClock } from "react-icons/lu";

const People = ({info,setIsPeopleOpen}) => {

    const api = "https://workfast-server-tngc.vercel.app";

  return (
    <div className='relative flex flex-col justify-center items-start space-y-5 bg-gray-900 h-screen w-[250px] px-4 py-3'>
        <button onClick={()=>setIsPeopleOpen(false)} className='absolute top-2 right-2 '><IoClose/></button>
        
        <img className='w-full max-h-[150px] rounded-lg object-fill ' src={`${api}/uploads/${info.imagename}`}/>
        <h1>{info.username}</h1>
        <p className='text-xs'>{info.designation}</p>
        <div className='flex flex-row justify-between items-center space-x-3'>
            <div className='flex flex-row justify-center items-center'>
                <GoDotFill className='text-green-700' size={24}/>
                <p className='text-xs'>Active</p>
            </div>
            <div className='flex flex-row justify-center items-center space-x-1'>
                <LuClock className='text-white' size={24}/>
                <p className='text-xs'>3:54 PM local time</p>
            </div>
        </div>

        <div className='flex flex-row space-x-3 justify-center items-center'>
        <FiPhone/>
        <p className='text-xs'>{info.mobile_number}</p>
        </div>
        <div className='flex flex-row space-x-3 justify-center items-center'>
            <MdOutlineEmail/>
            <p className='text-xs'>{info.email}</p>
        </div>
        <div className='flex flex-row justify-center items-center py-2 rounded-md space-x-2 min-w-full border border-gray-600'>
        <CiEdit />
        <button className='text-xs'>Edit Profile</button>
        </div>
        
    </div>
  )
}

export default People