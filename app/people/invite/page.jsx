"use client"
import React, { useEffect } from 'react'
import { useState } from 'react'
import useWorkfastStore from  "./../../../store.js";

const Page = () => {

    const fetchInvites=useWorkfastStore((state)=> state.fetchInvites);
    const invites=useWorkfastStore((state)=>state.invites);
    const { isInviteOpen } = useWorkfastStore();
    const deleteInvite=useWorkfastStore((state)=>state.deleteInvite);
    const [activeTab, setActiveTab] = useState('pending');
    const [data, setData] = useState([]);


    const handleDelete=async(id)=>{
        try{
           await deleteInvite(id);
           await fetchInvites();
        }catch(err){
            console.log(err);
        }}

    useEffect(()=>{
    const fetchData=async()=>{
         await fetchInvites();
    }
    fetchData();
    },[fetchInvites, isInviteOpen])


    useEffect(() => {
    if (invites?.length > 0) {
        setData(invites);
    }
    }, [invites ]);


    
   

  return (
    <div className=' w-full flex flex-col space-y-2   rounded-tr-lg rounded-br-lg  bg-gray-800 min-h-screen  border border-gray-600'>
         <div className=' relative flex-1 min-w-fit '>
         <div className='  absolute border-t border-gray-600 border-r rounded-tr-md z-10 bg-gray-800 w-full'>
        <h1 className='pl-2'>Invited People</h1>

       <div className='  flex flex-row border-t border-gray-600 py-2 px-4 space-x-5 border-b '> 
        <p  onClick={()=>setActiveTab('pending')} className={`cursor-pointer text-sm ${activeTab==='pending'?' text-yellow-400 border-b border-yellow-500': 'text-white'}`}>Pending</p>
        <p onClick={()=>setActiveTab('accept')} className={`cursor-pointer text-sm ${activeTab==='accept'?' text-yellow-400 border-b border-yellow-500': 'text-white'}`}>Accepted</p>
       </div>
       </div>
       </div>
       
       {activeTab === 'pending'?
       (
       <div className='py-1'>
       <div className='mt-16 '>
        <div className=' px-8 flex flex-row  '>
            <p className='flex-1 text-md text-start  '>Email address</p>
            <p className=' flex-1 text-md text-center '>Invited Date</p>
            <p className=' flex-1'></p>
        </div>
           <div className='px-4 py-2 flex flex-col space-y-3 h-screen overflow-y-auto scrollbar-custom '>
            {data && data.length >0 && data.map((item, index)=>(

              item.status==="notaccept" && (<div key={index} className='flex flex-row justify-between items-center px-4 py-8 bg-gray-700 border border-transparent rounded-lg'>
                    
                    <div className='flex flex-col space-y-3 flex-1'>
                     <p className='text-sm'>{item.email}</p>
                     <p className='text-sm flex flex-row justify-start items-center space-x-1 text-gray-400'>Invited by <span className='text-sm ml-2 text-yellow-400'>{item.invitedByPerson}</span></p>
                     <p className='text-sm'>{item.type}</p>
                    </div>

                    <div className='flex flex-col justify-center items-center flex-1'>
                    <p className='text-sm'>Sent {item.invitedDate}</p>
                    </div>

                    <div className='flex-1 flex flex-row space-x-4'>
                    <button className='px-4 py-2 border border-yellow-400 rounded-md text-xs text-center bg-transparent'>Resend Invitation</button>
                    <button onClick={()=>handleDelete(item.id)} className='px-4 py-2 border border-red-500 rounded-md text-xs text-center bg-transparent'>Revoke</button>
                    </div>
                </div>)
))}
        </div>
       </div>
       </div>
        ):(
            <div className='py-1'>
       <div className='mt-16 '>
            <div className=' px-8 flex flex-row  justify-around'>
                <p className='flex-1 text-md text-start'>Email address</p>
                <p className='flex-1 text-md text-center'>Invited Date</p>
                <p className='flex-1 text-md text-end'>Joined Date</p> 
            </div>
            <div className='px-4 py-2 flex flex-col space-y-3 h-screen overflow-y-auto scrollbar-custom'>
                {data && data.length >0 && data.map((item, index)=>(
                     
                     item.status==='accept' && ( <div key={index} className='flex flex-row justify-between items-center  py-8 bg-gray-700 border border-transparent rounded-lg px-4'>
                        <div className='flex flex-col space-y-3'>
                         <p className='text-sm'>{item.email}</p>
                         <p className='text-sm flex flex-row justify-start items-center space-x-1 text-gray-400'>Invited by <span className='text-sm ml-2 text-yellow-400'>{item.invitedByPerson}</span></p>
                         <p className='text-sm'>{item.type}</p>
                        </div>
                        <div className='flex flex-col justify-center items-center'>
                        <p className='text-sm'>Invited on {item.invitedDate}</p>
                        </div>
                        <div className='flex flex-row items-center justify-center'>
                        <p className='text-sm'>Joined {item.joinedDate}</p>
                        </div>
                    </div>)
                ))}
            </div>
           </div>
           </div>)
       }
       
    </div>
  )
}

export default Page