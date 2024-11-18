import React, { useContext, useEffect, useState } from 'react'
import Addproject from './Addproject'
import Edit from './Edit'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faGlobe, faTrashCan } from '@fortawesome/free-solid-svg-icons'
import { faGithub } from '@fortawesome/free-brands-svg-icons'
import { removeUserProjectApi, userProjectApi } from '../services/allApi'
import { Link } from 'react-router-dom'
import { addResponseContext, editResponseContesxt } from '../context/Contextshare'

function Myproject() {
  const [userProject,setUserProject] = useState("")
  const {addresponse} = useContext(addResponseContext)
  const {editresponse} = useContext(editResponseContesxt)
  const [removestatus,setRemoveStatus] = useState("")

  const getUserProject = async()=>{
    if (sessionStorage.getItem("token")){
      const token = sessionStorage.getItem("token")

      const reqHeader = {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}`
      }
      const result = await userProjectApi(reqHeader)
      setUserProject(result.data);
      
      
    }
    
  }
  console.log(userProject);

  const handleDelete = async(id)=>{
    if(sessionStorage.getItem("token")){
    const token = sessionStorage.getItem("token")

       const reqHeader = {
         "Content-Type":"multipart/form-data",
        "Authorization":`Bearer ${token}`
       }
       const result = await removeUserProjectApi(id,reqHeader)
       console.log(result);
       if(result.status==200){
        setRemoveStatus(result)
       }
       else{
        alert('something went wrong')
       }
       
    }
  }
  
  useEffect(()=>{
    getUserProject()
  },[addresponse,removestatus,editresponse])

  return (
    <div className='p-4 shadow w-100'>
      <div className='d-flex mt-4 justify-content-between'>
        <h3 className='text-success'>My Project</h3>
        <Addproject />
      </div>

    
   {userProject?.length>0 ?
   userProject?.map((item)=>(
    <div className='p-3 bg-light d-flex mt-4 rounded justify-content-between '>
        <h4>{item?.title}</h4>
        <div className='d-flex '>
          <Edit projects = {item} />
          <Link to={item?.website}><FontAwesomeIcon icon={faGlobe} className='text-warning mx-3 ' /></Link>
          <Link to={item?.github}><FontAwesomeIcon icon={faGithub} className='text-success mx-3' /></Link>
          <FontAwesomeIcon icon={faTrashCan} className='text-danger mx-3' onClick={()=>handleDelete(item?._id)} />

        </div>
      </div>

   )) 
   
      :
      <h4 className='text-center text-warning mt-5'>No project addedd yet</h4>
}
    </div>
  )
}

export default Myproject