import { faPenToSquare } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React, { useContext, useEffect } from 'react'
import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { serverUrl } from '../services/serverUrl';
import { ToastContainer, } from 'react-bootstrap';
import 'react-toastify/dist/ReactToastify.css';
import { updateUserProjectApi } from '../services/allApi';
import { editResponseContesxt } from '../context/Contextshare';
import { toast } from 'react-toastify';



function Edit({projects}) {
  const {setEditResponse} = useContext(editResponseContesxt)
  
  const [projectdetails,setProjectDetails] = useState({
    title:projects.title,
    language:projects.language,
    github:projects.github,
    website:projects.website,
    overview:projects.overview,
    projectimage:""
  })
    
    const[preview,setPreview] = useState("")
    const [show, setShow] = useState(false);
    const [key,setKey] = useState(0)

    const handleClose = () => {
      setShow(false);
       handleCancel()
    }
    const handleShow = () => setShow(true);

    const handleFiles =(e)=>{
    setProjectDetails({...projectdetails,projectimage:e.target.files[0]})

    }

    useEffect(()=>{
      if(projectdetails.projectimage){
        setPreview(URL.createObjectURL(projectdetails.projectimage))
      }
      
    },[projectdetails.projectimage])

    const handleCancel = ()=>{
      setProjectDetails({
        title:projects.title,
    language:projects.language,
    github:projects.github,
    website:projects.website,
    overview:projects.overview,
    projectimage:""

      })
      setPreview("")
      if(key==0){
        setKey(1)
      }
      else{
        setKey(0)
      }
    }

    const handleUpdate = async()=>{
      const {title,language,github,website,overview,projectimage} = projectdetails

      if(!title || !language || !github || !website || !overview ){
        toast.info('please fill the form completeely')
      }
      else{
        const reqBody = new FormData()
        reqBody.append("title",title)
        reqBody.append("language",language)
        reqBody.append("github",github)
        reqBody.append("website",website)
        reqBody.append("overview",overview)
        preview?reqBody.append("projectimage",projectimage):reqBody.append("projectimage",projects.projectimage)


        const token = sessionStorage.getItem("token")

        if(preview){
          const reqHeader = {
            "Content-Type":"multipart/form-data",
            "Authorization":`Bearer ${token}`
            
          }
          const result = await updateUserProjectApi(projects._id,reqBody,reqHeader)
          console.log(result);

          if(result.status==200){
            setEditResponse(result)
            toast.success('project uploaded successfully')
            setTimeout(()=>{
              handleClose()
            },2002);
          }
          else{
            handleCancel()
            toast.error('something went wrong')
          }
          

        }
        else{
          const reqHeader = {
            "Content-Type":"application/json",
           "Authorization":`Bearer ${token}`
          }
          const result = await updateUserProjectApi(projects._id,reqBody,reqHeader)
          console.log(result);

          if(result.status==200){
            setEditResponse(result)
            toast.success('project uploaded successfully')
            setTimeout(()=>{
              handleClose()
            },2002);
          }
          else{
            handleCancel()
            toast.error('something went wrong')
          }

        }

      }
    }

  return (
    <>
    <FontAwesomeIcon onClick={handleShow} icon={faPenToSquare} className='mx-3' style={{color:'violet'}}/>
    <Modal show={show} onHide={handleClose} size='lg'>
        <Modal.Header closeButton>
          <Modal.Title>Add Project Details</Modal.Title>
        </Modal.Header>
        <Modal.Body>
            <div className='container-fluid'>
                <div className='row'>
                    <div className='col-md-6'>
                         <label htmlFor="projectimage">
                            <input id='projectimage' type="file"  style={{display:'none'}} key={key}  onChange={(e)=>handleFiles(e)}/>
                            <img src={preview?preview:`${serverUrl}/upload/${projects.projectimage}`} alt="no image " className='w-100'/>
                         </label>
                    </div>
                    <div className='col-md-6'>
                        <div className="mb-3">
                            <input type="text" placeholder='Title' className='form-control' value={projectdetails.title} onChange={(e)=>setProjectDetails({...projectdetails,title:e.target.value})} />
                        </div>
                        <div className="mb-3">
                        <input type="text" placeholder='Language' className='form-control' value={projectdetails.language}  onChange={(e)=>setProjectDetails({...projectdetails,language:e.target.value})} />
                        </div>
                        <div className="mb-3">
                        <input type="text" placeholder='Github' className='form-control' value={projectdetails.github}  onChange={(e)=>setProjectDetails({...projectdetails,github:e.target.value})} />
                        </div>
                        <div className="mb-3">
                        <input type="text" placeholder='Website' className='form-control' value={projectdetails.website}  onChange={(e)=>setProjectDetails({...projectdetails,website:e.target.value})} />
                        </div>
                        <div className="mb-3">
                            <textarea cols={10} rows={5} className='w-100' placeholder='overview' value={projectdetails.overview}  onChange={(e)=>setProjectDetails({...projectdetails,overview:e.target.value})}></textarea>
                        </div>
                    </div>
                </div>
            </div>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="warning" onClick={handleCancel}>
            Cancel
          </Button>
          <Button variant="success" onClick={handleUpdate}>
            Update
          </Button>
        </Modal.Footer>
        <ToastContainer theme='colored' position='top-center' autoClose={2000}  />
      </Modal>
    
    
    </>
  )
}

export default Edit