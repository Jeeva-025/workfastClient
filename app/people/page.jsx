"use client"
import React from 'react'
import People from "../../components/People.js"
import { useState, useEffect } from 'react';
import { MdKeyboardArrowDown } from "react-icons/md";
import useWorkfastStore from "../../store.js";




const Page = () => {
  const api = "https://workfast-server-tngc.vercel.app";

  

 

  const peoples = useWorkfastStore((state)=>state.peoples);
  const fetchPeoples=useWorkfastStore((state)=>state.fetchPeoples);
  const [search, setSearch]=useState("");


  const [isPeopleOpen, setIsPeopleOpen]=useState(false);
  const[data, setData]=useState({
          account:'',
          recommend:'',
            org:''   
      })
      const [toggle, setToggle] = useState({
        account: false,
        org: false,
        recommend: false,
      });
  const[info, setInfo]=useState(null);
  
  const account=["Admin", "Members", "Guest", "Customer"]
  const recommend=[ "A to Z", "Z to A"]
  

const handleToggle=(type)=>{
  setToggle((prev) => ({ ...prev, [type]: !prev[type] }));
}


useEffect(()=>{
 const fetchData=async()=>{
   await fetchPeoples("");
 }
 fetchData();
},[fetchPeoples])

 if(peoples.length>0){
  console.log(peoples);
 }

 const filteredData = peoples && peoples.length > 0 && peoples.filter((item) =>
  item.user_name.toLowerCase().includes(search.toLowerCase())
);

const fetchDataByQuery=async()=>{
  let query = '';
  
  if (data.account) query += `type=${data.account}&`;
  if (data.recommend){
    const normalizedRecommend = data.recommend.replace(/\s+to\s+/g, '-'); 
    query += `order=${normalizedRecommend}&`;
  } 
  if (data.org) query += `designation=${data.org}&`;

  // Remove trailing '&' if it exists
  if (query.endsWith('&')) query = query.slice(0, -1);
  try{
    await fetchPeoples(query);
  }catch(error){
    console.error("Error fetching data:", error);
  }
}

useEffect(() => {
  
     fetchDataByQuery(); // Trigger the fetch only when account or recommend is updated
  
}, [data.account, data.recommend, data.org]);

  return (
    <>
  {/* max-w-[1090px] */}
        <div className=' flex flex-col space-y-2  rounded-tr-lg rounded-br-lg  bg-gray-800 min-h-screen border border-gray-600 '>
          <div className=' relative flex-1 w-full'>
        <div className='  absolute  w-full   border-t border-gray-600 border-r rounded-tr-md z-10 bg-gray-800'>
          <div className='flex flex-row justify-between items-center pt-2 px-6'>
          <h1 className='text-md'>All People</h1>
          <button className='text-md px-2 py-1 border border-gray-600 rounded-md text-gray-400 '>Invite People</button>
          </div>

          <div className=' border-t border-gray-600 py-3 px-6 w-full'>
          <input
          placeholder='Search for people'
          onChange={(e)=>setSearch(e.target.value)}
           className='w-full border  px-1 border-gray-600 text-gray-400 bg-gray-700 rounded-md'/>
          </div>

          <div className='flex justify-between items-center  px-6 ' >
            <div className='flex space-x-4'>
              <div className='relative w-full '>
                          <div onClick={()=>handleToggle('account')} className={`cursor-pointer flex flex-row w-36 justify-between items-center px-2 py-1 border border-gray-600 rounded-md ${toggle.account ? 'rounded-bl-none rounded-br-none': 'rounded-md'}`}>
                          <div  className="text-xs whitespace-nowrap " >
                          {data.account && typeof data.account === 'string' ? data.account : "Account Type"}
                          </div>
                          <MdKeyboardArrowDown size={24}/>
                          </div>
              
                          {toggle.account &&(
                              <div className='absolute w-36 bg-gray-800 border border-gray-500 rounded-bl-md rounded-br-md '>
                                  {account.map((item, index)=>(
                                  <div onClick={()=>setData((prev) => ({
                                      ...prev,
                                      account: prev.account === item ? "" : item,
                                    }))} key={index} className='flex flex-row justify-start items-center space-x-2  text-xs  px-4 py-2 cursor-pointer '>
                                  
              
                                  <p className='text-xs whitespace-nowrap'>{item }</p>
                                  </div>
                                  ))}
                              </div>
                          )}
              </div>
              <div className='relative w-full '>
                          <div onClick={()=>handleToggle('org')} className={` cursor-pointer flex flex-row w-36 justify-between items-center px-2 py-1 border border-gray-600 rounded-md ${toggle.org ? 'rounded-bl-none rounded-br-none': 'rounded-md'}`}>
                          <div  className="text-xs " >
                          {data.org && typeof data.org === 'string' ? data.org : "Organization"}
                          </div>
                          <MdKeyboardArrowDown size={24}/>
                          </div>
              
                          {toggle.org &&(
                              <div className=' absolute bg-gray-800 w-40 border border-gray-500 rounded-md mt-1 '>
                                  
                                  <div   className='flex flex-row justify-center items-center   text-xs  px-2 py-3   rounded-md '>
                                  
              
                                  <input onChange={(e)=>setData((prev) => ({
                                      ...prev,
                                      org:e.target.value
                                    }))} placeholder='E.g. #Design Team' className='w-full h-auto border  px-1 border-gray-600 text-gray-400 bg-gray-700 rounded-md'/>
                                  </div>
                                  
                              </div>
                          )}
              </div>
            </div>
            <div className=' flex justify-center items-center '>
            <div className='relative w-full '>
                          <div onClick={()=>handleToggle('recommend')} className={` cursor-pointer flex flex-row w-36 justify-between items-center px-2 py-1 border border-gray-600 rounded-md ${toggle.recommend ? 'rounded-bl-none rounded-br-none': 'rounded-md'}`}>
                          <div  className="text-xs  w-full " >
                          {data.recommend && typeof data.recommend === 'string' ? data.recommend : "Most Recommend"}
                          </div>
                          <MdKeyboardArrowDown size={24}/>
                          </div>
              
                          {toggle.recommend &&(
                              <div className='absolute w-36 bg-gray-800 border border-gray-500 rounded-bl-md rounded-br-md '>
                                  {recommend.map((item, index)=>(
                                  <div onClick={()=>setData((prev) => ({
                                      ...prev,
                                      recommend: prev.recommend === item ? "" : item,
                                    }))} key={index} className='flex flex-row justify-start items-center space-x-2  text-xs  px-4 py-2 cursor-pointer '>
                                  
              
                                  <p className='text-xs whitespace-nowrap'>{item }</p>
                                  </div>
                                  ))}
                              </div>
                          )}
              </div>
           </div>
          </div>
          </div>
          </div>

            <div className="flex-1  px-6  ">
              <div className="grid grid-cols-5 gap-7 mt-32  scrollbar-custom">
            {filteredData && filteredData.map((data,index)=>(
                  <div key={index} onClick={()=>{
                    setInfo(data);
                    setIsPeopleOpen(true)
                    
                    }} className='border border-gray-600 rounded-md flex flex-col justify-start  space-x-2 max-w-[300px] max-h-auto pb-4'>
                    <img className=' w-full max-h-[150px] object-cover rounded-tl-md rounded-tr-md' src={`${api}/uploads/${data.imagename}`}/>
                    <p className='text-sm font-medium'>{data.user_name}</p>
                    <p className='text-[15px] '>{data.designation}</p>
                  </div>

            ))}
              </div>
          </div>
    </div>
    
    

{isPeopleOpen && (
  <div className="fixed inset-0 bg-black bg-opacity-70 flex justify-end items-center z-50">
    <People info={info} setIsPeopleOpen={setIsPeopleOpen} />
  </div>
)}



</>


  )
}

export default Page;