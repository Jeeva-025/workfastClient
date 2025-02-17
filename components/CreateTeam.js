import React from 'react'
import { FaHome } from "react-icons/fa";
import { PiBinocularsFill } from "react-icons/pi";
import { IoMicSharp } from "react-icons/io5";
import { MdMicOff } from "react-icons/md";  
import { BsChatFill } from "react-icons/bs";
import { IoVideocam } from "react-icons/io5";
import { MdEmail } from "react-icons/md";
import { IoIosSearch } from "react-icons/io";
import { LuHistory } from "react-icons/lu";
import { IoClose } from "react-icons/io5";
import { useState } from 'react';
import { FaPlus } from "react-icons/fa6";
import { MdGroups } from "react-icons/md";
import { FiHash } from "react-icons/fi";
import { FaCheck } from "react-icons/fa6";
import useWorkfastStore  from "../store.js"

 



const CreateTeam = ({setIsCreatePeopleOpen}) => {

    const api = "https://workfast-server-tngc.vercel.app";

    const[isIconsOpen, setIsIconOpen]=useState(true);
    const[isDropDownOpen, setIsDropDownOpen]=useState(false);
    const[selectedMembers, setSelectedMembers]=useState([]);
    const [selectedId, setSelectedId] = useState([]);
    const [Icon, setIcon] = useState(() => FiHash);
    const [iconColor, setIconColor]=useState("#2FD15B");
    const [isSwitchOn, setIsSwitchOn] = useState(false);
    const addTeams=useWorkfastStore((state)=>state.addTeams)
    const fetchTeams=useWorkfastStore((state)=>state.fetchTeams);
    const peoples=useWorkfastStore((state)=>state.peoples)
    const teams=useWorkfastStore((state)=> state.teams);
    const[data, setData]=useState({
        team_name:"",
    })


    console.log(data);
    if(teams){
        console.log(teams);
    }

    

    const colors=["#FF453B","#FEA00A","#FFD50A","#2FD15B","#79C3FF","#5E5CE7","#FF4F78","#D67FF6","#CAA675","#737D87","#EBB5AE"];

    const icons = [
        { component: FiHash, name: "FiHash" },
        { component: FaHome, name: "FaHome" },
        { component: PiBinocularsFill, name: "PiBinocularsFill" },
        { component: IoMicSharp, name: "IoMicSharp" },
        { component: MdMicOff, name: "MdMicOff" },
        { component: BsChatFill, name: "BsChatFill" },
        { component: IoVideocam, name: "IoVideocam" },
        { component: MdEmail, name: "MdEmail" },
      ];

    


   
  

      const getRoleColor = (role) => {
        switch (role) {
          case 'Workspace Owner':
            return 'bg-[#413F20] text-[#9F8D15]'; // Gold background, black text
          case 'Admin':
            return 'bg-[#41311E] text-[#FF9500]'; // Orange background, white text
          case 'Member':
            return 'bg-[#1C2149] text-[#807EFF]'; // Light blue background, white text
          case 'Customer':
            return 'bg-[#163631] text-[#39CB77]'; // Green background, white text
          case 'Guest':
            return 'bg-[#143351] text-[#2DA8FF]'; // Blue background, white text
          default:
            return 'bg-gray-100 text-gray-800'; // Default: Light gray background and dark gray text
        }
      };


    
      const handleChange = (id) => {
       
      
        const selectedMember = peoples.find(item => item.user_id === id);
        
        if (selectedId.indexOf(id)!=-1) {  
          setSelectedId((prev) => prev.filter(item => item !== id));
          setSelectedMembers(selectedMembers.filter(item => item.user_id !== id));
        } else {
          setSelectedId((prev) => [...prev, id]);
          setSelectedMembers((prev) => [...prev, selectedMember]);
        }
      };

      const handleToggle = () => {
        setIsSwitchOn((prev) => {
            const newState = !prev;
           // Update members based on newState
            if (newState) {
                // If switched ON, select all members and their IDs
                setSelectedMembers(peoples);
                setSelectedId(peoples.map(member => member.user_id));
            } else {
                // If switched OFF, clear selected lists
                setSelectedMembers([]);
                setSelectedId([]);
            }
             // Update members list with checked state
            return newState;
        });
    };


    const validate=()=>{
        if(!data.team_name){
            alert("All Fields are required")
            return false;
        }
        if(selectedId.length===0){
            alert("Select Members");
            return false;
        }
        return true;
    }

    const handleCreateTeam=async()=>{
        if (validate()) {
            try {
                await addTeams(data.team_name, selectedId);
                await fetchTeams();
                setIsCreatePeopleOpen(false);
            } catch (error) {
                console.error("Error while creating team:", error);
            }
        }    
    }

    if(peoples){
        console.log(peoples);
    }
    if(selectedId.length>0){
    console.log(selectedId);
    
    }

    console.log(data.team_name);

  return (
    
    <div className="bg-[#121825] flex flex-col justify-start items-start space-y-3 py-4 px-4 border border-gray-600 rounded-lg min-w-md w-[450px] max-h-[80vh] overflow-y-auto scrollbar-custom">
        <div className='flex flex-col space-y-4 items-start justify-center w-full'>
        { <div className='w-full flex justify-between items-center'>
        <p className="text-white text-sm text-left ">Create Team</p>
        <IoClose onClick={()=>setIsCreatePeopleOpen(false)} className="cursor-pointer" size={24}/>
        </div>}
        

        {!isDropDownOpen && <div className='flex flex-col justify-start space-y-2 w-full'>
            <h1 className='text-xs'>Team Icon</h1>
            <div className='flex flex-row justify-between items-center w-full '>
                <Icon size={36} className="text-white px-1   border border-transparent rounded-lg" style={{ backgroundColor: iconColor }}/>
                <p className='text-xs px-2 py-1 border border-yellow-400 text-yellow-400 rounded-lg'>Upload Image</p>
            </div>
        </div>}

        { !isDropDownOpen && isIconsOpen && <div className='flex flex-col justify-start space-y-2 w-full'>
            <div className='flex justify-between items-center w-full'><h1 className='text-xs'>Team icons</h1> <IoClose size={24} onClick={()=>setIsIconOpen(false)}/> </div>
            
            <div className='flex flex-row  justify-center items-center w-full px-1 py-2 border border-gray-700 shadow-lg  rounded-lg '>
                <div className='w-full flex flex-grow space-x-2 items-center'>
                {icons.map(({ component: IconComponent, name }, index) => (
          <IconComponent
            onClick={() => {
              setIcon(() => IconComponent);
              setData((prev) => ({ ...prev, IconName: name })); // Store the name of the icon
            }} key={index} size={36} className={`px-1 rounded-lg cursor-pointer bg-[#2E3A54] ${ Icon === IconComponent ? "text-[#FFDD09]  border border-[#FFDD09]" : "text-white border-transparent"}`}
          />
        ))}
                </div>
                < FaPlus size={36} className="px-1 rounded-lg cursor-pointer bg-[#414125]  
          text-[#FFDD09]  border-transparent" />

            </div>

            <div className="flex justify-evenly">
               {colors.map((item, index)=>(
                <div key={index} className={` rounded-full ${iconColor === item ? "border-2 border-yellow-400" : ""}`} >
                   <div  onClick={()=>setIconColor(item)} className={`w-5 h-5 flex justify-center items-center text-white text-lg font-bold rounded-full m-1 cursor-pointer  $`}
                   style={{ backgroundColor: item }} ></div>
                   </div>
               ))}
            </div>
        </div>}

        { !isDropDownOpen && <div className='w-full flex flex-col justify-center items-start space-y-2'>
            <div className='flex space-x-1 items-center'>
            <div className="w-6 h-6 flex items-center justify-center rounded-md px-1 bg-[#0A4F26] text-[#31D843]"><img src='/Group 2147223776.svg' className="w-4 h-4"/></div>
            <p className='text-xs'>Team Name</p>   
            </div>
            <input value={data.team_name} onChange={(e)=>setData((prev)=>({...prev, team_name:e.target.value}))} className='bg-gray-800 text-xs px-2 py-2 border border-gray-600 rounded-md w-full' type="text" placeholder="Enter team name (e.g, AI Enthusiast)" />
        </div>}

        <div className='w-full flex flex-col justify-center items-start space-y-2'>
            <div className='flex space-x-1 items-center'>
            <div className="w-6 h-6 flex items-center px-1 justify-center rounded-lg bg-[#18364C] text-[#32ADE6]"><IoIosSearch/></div>
            <p className='text-xs'>Search Members</p>   
            </div>
            <input onClick={()=>setIsDropDownOpen(true)} className='bg-gray-800 text-xs px-2 py-2 border border-gray-600 rounded-md w-full' type="text" placeholder="Enter team name (e.g, AI Enthusiast)" />
        </div>

        <div className='w-full flex flex-col justify-center items-start space-y-3'>
            <div className='flex space-x-1 items-center'>
            <div className="w-6 h-6 flex items-center px-1 justify-center rounded-lg bg-[#3D3A0A] text-[#F5D300]"><LuHistory /></div>
            <p className='text-xs'>Recent</p>   
            </div>
           
            <div className="flex gap-3 bg-transparent ">
                {peoples && peoples.map((user, index) => (
                    <div key={index} onClick={()=>handleChange(user.user_id)} className=" cursor-pointer relative flex flex-col items-center">
                    
                    <div className="w-6 h-6 rounded-md relative">
                        <img
                        src={`${api}/uploads/${user.imagename}`}
                        alt={user.user_name}
                        className="w-full h-full object-cover rounded-md"
                        />
                        
                        <div className={`absolute -top-1.5 -right-1.5  w-3 h-3 flex items-center justify-center rounded-full border border-[#0D1117] shadow-md ${selectedId.includes(user.user_id)?"bg-green-500" : "bg-yellow-400"}`}>
                        {selectedId.includes(user.user_id) ? (
                            <FaCheck size={5} className="text-white" />
                            ) : (
                            <FaPlus size={5} className="text-black" />
                            )}
                        </div>
                    </div>
                    
                    <span className="text-white text-[10px] mt-1">{user.user_name}</span>
                    </div>
                ))}
            </div>
        </div>

        {isDropDownOpen && <div className='w-full'>
            <div className='w-full'>
            <div className="border-t border-gray-700 my-2 w-full"></div>
                <div className=' flex flex-row justify-between items-center'>
                    <div className='flex space-x-1 items-center'>
                        <div className="w-6 h-6 flex items-center px-1 justify-center rounded-md bg-blue-600 text-white"><MdGroups size={34}/></div>
                        <p className='text-xs'>All Members in workspace</p>
                    </div>
                    <div  onClick={handleToggle} className={`w-8 relative h-5 flex items-center bg-gray-700 rounded-full  cursor-pointer transition-all duration-300 ${isSwitchOn ? "bg-green-500" : "bg-[#323642]"}`}>
                        <div className={` absolute w-4 h-4 bg-white rounded-full shadow-md transform transition-all duration-300 ${isSwitchOn ? "translate-x-4" : ""}`}
                        ></div>
                    
                    </div>
                </div>
            <div className="border-t border-gray-700 my-2 w-full"></div>
            </div>
            <div className='flex flex-col justify-start space-y-2 w-full'>
                <h1 className='text-[15px]'>All Members</h1>
                <div className='flex flex-col justify-start items-start space-y-2 w-full'>
                    {peoples && peoples.map((user)=>(
                        <div key={user.user_id} className='flex justify-between w-full'>
                            <div className='flex space-x-2'>
                                <img className="w-6 h-6 rounded-md object-cover" src={`${api}/uploads/${user.imagename}`}/>
                                <div className='flex flex-col space-y-1 justify-start'>
                                    <p className='text-[10px]'>{user.user_name}</p>
                                    <p className={`text-[10px] rounded-sm px-1 ${getRoleColor(user.type)}`}>{user.type}</p>
                                </div>
                            </div>
                            <input className={`w-4 h-4 border border-gray-500 rounded-sm appearance-none cursor-pointer relative ${selectedId.includes(user.user_id) ? "bg-yellow-400" : "bg-transparent"} checked:before:content-['✔'] checked:before:absolute checked:before:text-black checked:before:font-bold checked:before:left-[2px] checked:before:top-[-2px]`} type="checkbox" checked={selectedId.includes(user.user_id)} onChange={()=>handleChange(user.user_id)}/>
                        </div>
                    ))}
                </div>
                
            </div>

        </div>}

        {isDropDownOpen && <button onClick={()=>setIsDropDownOpen(false)} className='text-black text-xs w-full bg-yellow-400 border border-transparent rounded-md font-semibold py-2'>Next</button>}

        {!isDropDownOpen && selectedId.length>0 && <div className='w-full flex flex-col justify-center items-start space-y-3'>
            <div className='flex space-x-1 items-center'>
                <div className="w-6 h-6 flex items-center px-1 justify-center rounded-lg bg-[#007AFF] text-white"><MdGroups/></div>
                <p className='text-xs'>Team Members</p>
            </div>
            <div className='flex flex-wrap gap-[10px] '>
             {selectedMembers.map((item)=>(
                <div key={item.id} className=' bg-[#0F2645]  flex space-x-1 border border-transparent rounded-md items-center '>
                    <img className="w-6 h-6 border border-transparent rounded-tl-md rounded-bl-md" src={`${api}/uploads/${item.imagename}`}/>
                    <p className='text-xs'>{item.user_name}</p>
                    <IoClose onClick={()=> handleChange(item.user_id)}  className="cursor-pointer" size={24}/>
                </div>
             ))}
            </div>
        </div>}
        

       

        {!isDropDownOpen && <button onClick={handleCreateTeam} className='text-black text-xs w-full bg-yellow-400 border border-transparent rounded-md font-semibold py-2'>Create Team</button>}

        </div>
    </div>

    
  )
}

export default CreateTeam