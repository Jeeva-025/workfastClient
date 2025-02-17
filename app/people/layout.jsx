"use client";
import React from 'react'
import { TiContacts } from "react-icons/ti";
import { GrGroup } from "react-icons/gr";
import { AiOutlineUsergroupAdd } from "react-icons/ai";
import { useState, useEffect } from 'react';
import Invite from "../../components/Invite.js";
import Link from "next/link";
import { usePathname } from "next/navigation";
import useWorkfastStore from "../../store.js";
import { MdGroups } from "react-icons/md";
import CreateTeam from "../../components/CreateTeam.js"
import EditTeam from "../../components/EditTeam.js";
import { FaHome } from "react-icons/fa";
import { IoEllipsisVertical } from 'react-icons/io5';
import { useRef } from 'react';
import { BsPencilSquare } from "react-icons/bs";
import { IoTrashOutline } from 'react-icons/io5';
import { IoIosArrowForward } from "react-icons/io";


const Layout = ({children}) => {

  
    const [teamId, setTeamId] = useState();


      

        const menuRef=useRef(null);
        const deleteSpaceRef=useRef(null);
        const selectTeam=useRef(null);

        const [contextMenu, setContextMenu] = useState({
          visible: false,
          x: 0,
          y: 0,
          memberId: null,
          name: "",
        });
    const [isDeleteSpacePopupOpen, setIsDeleteSpacePopupOpen]=useState(false);
    const { isInviteOpen, setIsInviteOpen } = useWorkfastStore();
    const fetchTeams=useWorkfastStore((state)=> state.fetchTeams)
    const deleteTeam=useWorkfastStore((state)=>state.deleteTeam);
    const teams = useWorkfastStore((state)=>state.teams)

    const [isCreatePeopleOpen , setIsCreatePeopleOpen ]=useState(false);
    const [isSelectTeamPopupOpen, setIsSelectTeamPopupOpen]=useState(false);
 
    
    

  

  
  

  
  
  const pathname = usePathname();
  

  const handleMenuClick = (event, team) => {
    event.preventDefault();
    const rect = event.currentTarget.getBoundingClientRect();
    setContextMenu({
      visible: true,
      x: rect.right + 15,
      y: rect.top + rect.height / 2-40 ,
      memberId:team.team_id,
      name:team.team_name
     
    });
  };

  const contextMenuStyle= {
    position: 'fixed',
    top: contextMenu.y,
    left: contextMenu.x,
  };

  useEffect(() => {
      const handleClickOutside = (event) => {
        
        if (
          !isDeleteSpacePopupOpen &&
          contextMenu.visible &&
          menuRef.current &&
          !menuRef.current.contains(event.target  ) &&
          !deleteSpaceRef.current?.contains(event.target ) &&
          !selectTeam.current?.contains(event.target  )
        ) {
          setContextMenu({ ...contextMenu, visible: false });
        }
      };

      if(isDeleteSpacePopupOpen && deleteSpaceRef.current && !deleteSpaceRef.current.contains(event.target )){
        setIsDeleteSpacePopupOpen(false);
      }
  
      document.addEventListener('mousedown', handleClickOutside);
      return () => {
        document.removeEventListener('mousedown', handleClickOutside);
      };
    }, [contextMenu]);

    useEffect(()=>{
      const fetchData=async()=>{
        await fetchTeams();
      }
      fetchData();
    },[fetchTeams])

    const handleDelete=async(id)=>{
  
      try{
       await deleteTeam(id);
       await fetchTeams();
       setIsDeleteSpacePopupOpen(false);
      }catch(err){
        console.log(err);
      }
    }

  return (
    <>
    <div className='flex justify-center items-stretch p-1  max-h-screen '>
    <div className='flex flex-col justify-between bg-gray-800 rounded-tl-lg rounded-bl-lg max-h-screen min-w-[200px] py-3  space-y-3 border border-gray-600 '>
              <div>
                <h1 className='border-b border-gray-600 pl-3 '>People</h1>
                
                <div className='flex flex-col space-y-2'>
                <Link href="/people" className={`w-full py-1 ${pathname==='/people'?'border border-transparent rounded-lg mx-1  bg-yellow-300 bg-opacity-20  text-yellow-400 ':'text-white'}`}>
                    <div className='flex flex-row space-x-2 justify-start items-center'>
                      <TiContacts size={24}/>
                      <p className='text-xs'>All People</p>
                    </div>
                    </Link>
                    <Link href="/people/invite" className={`w-full py-1 ${pathname==='/people/invite'?'border border-transparent rounded-lg mx-1  bg-yellow-300 bg-opacity-20  text-yellow-400 ':'text-white px-1'}`}>
                    <div className='flex flex-row space-x-2 justify-start items-center'>
                      <GrGroup size={24}/>
                      <p className='text-xs'>Invited People</p>
                      </div>
                    </Link>
                    <hr className="w-full border-t border-gray-500 " />

                     {teams && teams.length>0 && (
                      <div className='flex flex-col space-y-1 w-full'>
                          { teams.map((item)=>(  
                             item.deactivateddate===null && <div key={item.id} className='flex flex-row justify-between items-center bg-[#0095FF] border border-transparent w-full'>
                              <div className='flex flex-row space-x-2 items-center py-1 pl-3 pr-2'>
                              
                                    <FaHome className="border border-white px-1 rounded-lg cursor-pointer text-white " size={24} /> 
                                  
                              <p className='text-xs'>{item.team_name}</p>
                              </div>
                              <IoEllipsisVertical onClick={(event)=>{
                                handleMenuClick(event, item)
                                setTeamId(item.team_id) }} className='cursor-pointer'/>
                            
                              </div>
                            ))}
                            <hr className="w-full border-t border-gray-500 " />
                            {contextMenu.visible && (
                              <div className="fixed inset-0 bg-black bg-opacity-70 flex justify-center items-center z-[59]">
                                <div ref={menuRef} style={contextMenuStyle}
                                  className='bg-[#1F2A3C] shadow-lg w-56 border border-[#475E85] rounded-lg py-4 flex flex-col space-y-4 z-50 '>

                                  <div className=" flex items-center space-x-3  cursor-pointer px-2">
                                     <BsPencilSquare size={19} className="text-[#28BFFF]" />
                                    <p className="text-[12px] text-white">Edit Team</p>
                                  </div>

                                  <div className="flex items-center justify-between px-2 cursor-pointer">
                                    <div onClick={()=>setIsSelectTeamPopupOpen(true)} className='flex items-center space-x-2'>
                                    <MdGroups size={24} className="text-[#00C7BE]" />
                                    <p className="text-[12px] text-white">Team Members</p>
                                    </div>
                                    < IoIosArrowForward className='text-white' />
                                  </div>

                                    <div onClick={()=>setIsDeleteSpacePopupOpen(true)} className=" flex items-center space-x-3 px-2 cursor-pointer">
                                    <IoTrashOutline  size={19} className="text-[#FF2D55]" />
                                    <p className="text-[12px] text-[#FF2D55]">Delete Space</p>
                                    </div>
                                    </div>
                                </div>)}
                    </div>)} 

                    <div onClick={()=>setIsCreatePeopleOpen(true)} className='cursor-pointer border bg-yellow-500 border-yellow-500 flex flex-row justify-center items-center space-x-2 py-2 rounded-lg mx-2'>
                      <MdGroups className='text-black'/>
                      <button className='text-xs text-black font-semibold'>Create teams</button>
                    </div>
                    
                </div>
                </div>

                <div onClick={()=>setIsInviteOpen(true)} className='border bg-yellow-500 border-yellow-500 flex flex-row justify-center items-center space-x-2 py-2 rounded-lg mx-2'>
                    <AiOutlineUsergroupAdd className='text-black'/>
                    <button className='text-xs font-semibold text-black'>Invite People</button>
                </div>
    
            </div>
            
              <div  className='flex-grow overflow-y-auto  scrollbar-custom mr-1  '>
                {children}
              </div>
            
    
    </div>

     {isInviteOpen && ( 
      <div className="fixed inset-0 bg-black bg-opacity-70 flex justify-center items-center z-50">
        <Invite />
      </div>
     )}
      

       {isCreatePeopleOpen && <div  className="fixed inset-0 bg-black bg-opacity-70 flex justify-center items-center z-50"> 
        <CreateTeam setIsCreatePeopleOpen={setIsCreatePeopleOpen}/>
      </div>}
     
      {isSelectTeamPopupOpen && <div ref={selectTeam} className="fixed inset-0 bg-black bg-opacity-70 flex justify-center items-center z-[69]"> 
        <EditTeam setIsSelectTeamPopupOpen={setIsSelectTeamPopupOpen} teamId={teamId}  />
      </div>}


       
      {isDeleteSpacePopupOpen && <div className="fixed inset-0 bg-black bg-opacity-70 flex justify-center items-center z-[69]">
       <div ref={deleteSpaceRef} className='bg-[#121825] flex flex-col justify-start items-center space-y-4 pt-4 border border-transparent rounded-lg w-[320px] '>
       <h1 className='text-xs'>Delete <span className='text-[#FFDD09]'>{contextMenu.name} ?</span></h1>
            <p className='text-[13px] font-thin text-center px-5'>Are you sure want to delete  the <span className='text-[#FFDD09]'>{contextMenu.name} </span>?</p>
           
            <div className='flex justify-between items-center border-t border-[#3D3F46] w-full'>
              <button className='flex-1 text-[#0A84FF] text-xs py-2' onClick={() => setIsDeleteSpacePopupOpen(false)}>Cancel</button>
              <button onClick={()=> handleDelete(contextMenu.memberId )} className='py-2 flex-1 text-[#FF3B30] text-xs border-l border-[#3D3F46]'>Delete</button>
       </div>
      </div>
      </div>}
     
    </>
  )
}

export default Layout;