import React, { useState, useEffect, useRef } from 'react';

import { IoClose } from 'react-icons/io5';
import { HiOutlineUserAdd } from 'react-icons/hi';
import { IoSearch } from 'react-icons/io5';
import { IoEllipsisVertical, IoCheckmarkCircleOutline } from 'react-icons/io5';
import { IoTrashOutline } from "react-icons/io5";
import { FaCheck } from "react-icons/fa6";
import useWorkfastStore  from "../store.js"

const EditTeam = ({ setIsSelectTeamPopupOpen,  teamId}) => {

  console.log(teamId);

  const api = "https://workfast-server-tngc.vercel.app";

  console.log(teamId);
  const [isDeletePopOpen, setIsDeletePopOpen] = useState(false);
  const [isDeleteAllPopOpen, setIsDeleteAllPopOpen] = useState(false);
  const [selectionMode, setSelectionMode] = useState(false);
  const [selectedId, setSelectedId] = useState([]);
  const teamMates=useWorkfastStore((state)=>state.teamMates);
  const peoples=useWorkfastStore((state)=>state.peoples)
  const fetchByTeamNames=useWorkfastStore((state)=> state.fetchByTeamNames)
  
  const deleteUserFromTeam=useWorkfastStore((state)=>state.deleteUserFromTeam);

  const [contextMenu, setContextMenu] = useState({
    visible: false,
    x: 0,
    y: 0,
    memberId: null,
    name: ""
  });
  
  const menuRef = useRef(null);
  const deletePopRef = useRef(null); 
  const selection =  useRef(null);
  const deleteAllPopRef = useRef(null);

  const handleMenuClick = (event, member) => {
    event.preventDefault();
    const rect = event.currentTarget.getBoundingClientRect();
    setContextMenu({
      visible: true,
      x: rect.right + 15,
      y: rect.top + rect.height / 2-40 ,
      memberId: member.user_id,
      name: member.user_name
    });
  };

  const handleRemove = async(id) => {
    const arr=[id];
    try{
     await deleteUserFromTeam(arr, teamId);
     await fetchByTeamNames(teamId);
     setIsDeletePopOpen(false);
    }catch(err){
      console.log(err);
    }
  };

  const handleRemoveAll=async()=>{
    console.log(selectedId);
    console.log(teamId);
    try{
    await deleteUserFromTeam(selectedId, teamId);
    await fetchByTeamNames(teamId);
    setIsDeleteAllPopOpen(false)
    setSelectedId([]);
    }catch(err){
      console.log(err);
    }
  }

  const handleSelect = (id) => {
    console.log(`Selecting member with id: ${id}`);
    setContextMenu({ ...contextMenu, visible: false });
  };

  const getRoleColor = (role) => {
    switch (role) {
      case 'Workspace Owner':
        return 'bg-[#413F20] text-[#9F8D15]';
      case 'Admin':
        return 'bg-[#41311E] text-[#FF9500]';
      case 'Member':
        return 'bg-[#1C2149] text-[#807EFF]';
      case 'Customer':
        return 'bg-[#163631] text-[#39CB77]';
      case 'Guest':
        return 'bg-[#143351] text-[#2DA8FF]';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      
      if (
        contextMenu.visible &&
        menuRef.current &&
        !menuRef.current.contains(event.target) &&
        !deletePopRef.current?.contains(event.target)
      ) {
        setContextMenu({ ...contextMenu, visible: false });
      }
      
      if (
        isDeletePopOpen &&
        deletePopRef.current &&
        !deletePopRef.current.contains(event.target)
      ) {
        setIsDeletePopOpen(false);
      }
      if(isDeleteAllPopOpen && deleteAllPopRef.current && !deleteAllPopRef.current.contains(event.target)){ setIsDeleteAllPopOpen(false)}

      if(!isDeleteAllPopOpen && selectionMode && selection.current && !selection.current.contains(event.target)){ 
      setSelectionMode(false)
      setSelectedId([]);      
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [contextMenu, isDeletePopOpen, selectionMode, isDeleteAllPopOpen]);


  useEffect(()=>{
    const fetchData=async()=>{
      try{
      await fetchByTeamNames(teamId);
      }catch(err){
        console.log(err);
      }
    }
    fetchData();
  },[fetchByTeamNames])


  const handleChange = (id) => {
    if (selectedId.indexOf(id)!=-1) {  
      setSelectedId((prev) => prev.filter(item => item !== id));
    } else {
      setSelectedId((prev) => [...prev, id]);
    }
  };

  const handelSelectAll=()=>{
    setSelectedId((prev) => {
      const allIds = peoples.map((member) => member.user_id); // Get all member ids
      return [...new Set([...prev, ...allIds])]; // Flatten the ids and add them to selectedId
    });
  }
  

  const contextMenuStyle = {
    position: 'fixed',
    top: contextMenu.y,
    left: contextMenu.x,
  };

  
  return (
    <div className="bg-[#121825] flex flex-col justify-start items-start space-y-3 py-4 border border-gray-600 rounded-lg min-w-md w-[450px] max-h-[80vh] overflow-y-auto scrollbar-custom">
      <div className="flex flex-col space-y-2 items-start justify-center w-full">
        <div className="px-4 w-full flex justify-between items-center">
          <p className="text-white text-sm text-left">Team Members</p>
          <IoClose onClick={()=>setIsSelectTeamPopupOpen(false)} className="cursor-pointer" size={24} />
        </div>

        <hr className="w-full border-t border-gray-500 my-2" />

        <div className="px-2 w-full flex flex-col space-y-2">
          <div className="relative w-full">
            <IoSearch className="absolute left-2 top-1/2 transform -translate-y-1/2 text-gray-400" size={14} />
            <input
              className="bg-gray-800 text-xs pl-6 py-1 border border-gray-600 rounded-md w-full text-white placeholder-gray-400"
              type="text"
              placeholder="Search"
            />
          </div>
          <div className="w-full flex space-x-1 items-center">
            <div className="w-6 h-6 flex items-center px-1 justify-center rounded-md bg-[#413F20] text-[#FFDD09]">
              <HiOutlineUserAdd />
            </div>
            <p className="text-xs">Add People</p>
          </div>
        </div>

        

        <div ref={selection} className=" flex flex-col  w-full">
        {selectionMode && (
            <div className="flex justify-between items-center py-1 px-3 w-full">
              <button onClick={()=>handelSelectAll()} className="text-[#FFDD09] text-xs" >
                Select All
              </button>
              <p className="text-xs text-white">{selectedId.length} Selected</p>
              <button onClick={()=> setIsDeleteAllPopOpen(true)} className="text-[#E9362C] text-xs">
                Remove
              </button>
            </div>
          )}
          {teamMates && peoples && peoples.map((user) => (
           teamMates.indexOf(user.user_id)!=-1 && <div key={user.user_id} className={`${selectedId.includes(user.user_id) ? "bg-[#292C22]  ":""}`}>
              <div className="flex justify-between w-full px-2 py-1">
              <div onClick={()=>setSelectionMode(true)} className="flex space-x-2 items-center">
                  {selectionMode && ( 
                    <div onClick={()=>handleChange(user.user_id)} className={`w-4 h-4 flex items-center justify-center rounded-full border border-[#4C566B] shadow-md ${selectedId.includes(user.user_id)?"bg-[#FFDD09]" : ""}`}>
                    {selectedId.includes(user.user_id) &&<FaCheck size={5} className="text-black" />}
                    </div>)}  
                <img className="w-6 h-6 rounded-md object-cover" src={`${api}/uploads/${user.imagename}`} alt={user.user_name} />
                <div className="flex flex-col space-y-1 justify-start">
                  <p className="text-[10px]">{user.user_name}</p>
                  <p className={`text-[10px] rounded-sm px-1 ${getRoleColor(user.type)}`}>{user.type}</p>
                </div>
              </div>
              <div>

                {!selectionMode && <IoEllipsisVertical
                  onClick={(event) =>{ handleMenuClick(event, user);
                  
                }}
                  className="cursor-pointer"
                />}
              </div>
            </div>
            </div>
          ))}

          {contextMenu.visible &&
              <div
                ref={menuRef}
                style={contextMenuStyle}
                className={`bg-[#222222] shadow-lg w-32 border border-transparent rounded-lg py-2 flex flex-col space-y-2 z-20 ${
                  isDeletePopOpen ? 'bg-[#222222] bg-opacity-70' : '' // Apply opacity when delete \
                }`}>
                <div
                  className="flex items-center justify-between cursor-pointer px-2"
                  onClick={() => handleSelect(contextMenu.memberId)}
                >
                  <p className='text-xs text-white'>Select</p>
                  <IoCheckmarkCircleOutline className="text-white" />
                </div>

                <hr className="w-full border-t border-gray-500" />

                <div
                  className="flex items-center justify-between px-2 cursor-pointer"
                  onClick={() => setIsDeletePopOpen(true)}
                >
                  <p className='text-xs text-[#FF2D55]'>Remove</p>
                  <IoTrashOutline className="text-[#FF2D55]" />
                </div>
              </div>
            }
        </div>


      </div>

      {isDeletePopOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-70 flex justify-center items-center z-[59]">
          <div
            ref={deletePopRef} // Attach ref to the delete popup
            className='bg-[#121825] flex flex-col justify-start items-center space-y-4 pt-4 border border-transparent rounded-lg w-[300px]'
          >
            <h1 className='text-xs'>Remove <span className='text-[#FFDD09]'>@ {contextMenu.name} ?</span></h1>
            <p className='text-[13px] font-thin text-center'>Are you sure want to remove the Member</p>
            <div className='flex justify-between items-center border-t border-[#3D3F46] w-full'>
              <button className='flex-1 text-[#0A84FF] text-xs py-2' onClick={() => setIsDeletePopOpen(false)}>Cancel</button>
              <button onClick={()=> handleRemove(contextMenu.memberId)} className='py-2 flex-1 text-[#FF3B30] text-xs border-l border-[#3D3F46]'>Remove</button>
            </div>
          </div>
        </div>
      )}

      {isDeleteAllPopOpen && (
        <div  className="fixed inset-0 bg-black bg-opacity-70 flex justify-center items-center z-[59] ">
          <div
            ref={deleteAllPopRef} // Attach ref to the delete popup
            className='bg-[#121825] flex flex-col justify-start items-center space-y-4 pt-4 border border-transparent rounded-lg w-[300px]'
          >
            <h1 className='text-xs'>Remove <span className='text-[#FFDD09]'>All Members?</span></h1>
            <p className='text-[13px] font-thin text-center'>Are you sure want to remove the all members, including yourself, from the team?</p>
            <p className='text-[13px] font-thin text-center'>Once removed, the team will no longer exist.</p>
            <div className='flex justify-between items-center border-t border-[#3D3F46] w-full'>
              <button className='flex-1 text-[#0A84FF] text-xs py-2' onClick={() => setIsDeleteAllPopOpen(false)}>Cancel</button>
              <button onClick={()=> handleRemoveAll()} className='py-2 flex-1 text-[#FF3B30] text-xs border-l border-[#3D3F46]'>Remove All</button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
};

export default EditTeam;