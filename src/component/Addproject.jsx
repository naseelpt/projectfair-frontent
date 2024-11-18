import React, { useContext, useEffect } from 'react'
import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { addProjectApi } from '../services/allApi';
import { addResponseContext } from '../context/Contextshare';

function Addproject() {
    const [show, setShow] = useState(false);

    const {setAddResponse} = useContext(addResponseContext)

    const [projectdetails,setProjectdeails] = useState({
     title:"",
     language:"",
     github:"",
     website:"",
     overview:"",
     projectimage:""

    })
    const [preiwe,setPreiwe] = useState("")
    const [token,setToken] = useState("")
    const [key,setKey] = useState(1)

    console.log(projectdetails);
    console.log(preiwe);
    console.log(token);
    
    
    const handlefile = (e)=>{
      setProjectdeails({...projectdetails , projectimage:e.target.files[0]})

    }

    

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const handleCancel = ()=>{
    setProjectdeails({
      title:"",
      language:"",
      github:"",
      website:"",
      overview:"",
      projectimage:""
    })
    setPreiwe("")
    if(key==1){
      setKey(0)
    }
    else{
      setKey(1)
    }
  }

  const handleAdd =async ()=>{
    const {title,language,github,website,overview,projectimage} = projectdetails
    if(!title || !language || !github || !website || !overview || !projectimage){
      toast.info('please fill the form complete')

    }
    else{
      // reqbody = if the requast contain uploaded content the requast body should be with the help of append methode in formData class - inshort requast body should a formdata
      const reqBody = new FormData()
      reqBody.append("title",title)
      reqBody.append("language",language)
      reqBody.append("github",github)
      reqBody.append("website",website)
      reqBody.append("overview",overview)
      reqBody.append("projectimage",projectimage)

     if(token){
      const reqHeader = {
        "Content-Type":"multipart/form-data",
        "Authorization":`Bearer ${token}`
        
      }

      const result = await addProjectApi(reqBody,reqHeader)
      console.log(result);

      if (result.status == 200) {
        toast.success("project added Successfully")
       setTimeout(()=>{
        handleClose()
       },2000)
       setAddResponse(result)

    }else if(result.status==406){
        toast.warning(result.response.data)
        handleCancel()


    }else{
        toast.error("something went wrong")
        handleClose()
    }
      
     }
     else{
      toast.warning('please login')
     }
      

    }
  }

  
  
  useEffect(()=>{
    if(projectdetails.projectimage){
      setPreiwe(URL.createObjectURL(projectdetails.projectimage))
    }

  },[projectdetails.projectimage])

  useEffect(()=>{
    if(sessionStorage.getItem("token")){
      setToken(sessionStorage.getItem("token"))
    }
  },[])


  return (
    <>
    <button className='btn btn-success rounded-0'  onClick={handleShow}>Add Project</button>
    <Modal show={show} onHide={handleClose} size='lg'>
        <Modal.Header closeButton>
          <Modal.Title>Add Project Details</Modal.Title>
        </Modal.Header>
        <Modal.Body>
            <div className='container-fluid'>
                <div className='row'>
                    <div className='col-md-6'>
                         <label htmlFor="projectimage">
                            <input id='projectimage' type="file"  style={{display:'none'}} key={key} onChange={(e)=>handlefile(e)}/>
                            <img src={preiwe?preiwe:"https://icon-library.com/images/icon-web-design/icon-web-design-9.jpg" }alt="no image " className='w-100'/>
                         </label>
                    </div>
                    <div className='col-md-6'>
                        <div className="mb-3">
                            <input type="text" value={projectdetails.title} placeholder='Title' className='form-control' onChange={(e)=>setProjectdeails({...projectdetails,title:e.target.value})} />
                        </div>
                        <div className="mb-3">
                        <input type="text" value={projectdetails.language} placeholder='Language' className='form-control' onChange={(e)=>setProjectdeails({...projectdetails,language:e.target.value})} />
                        </div>
                        <div className="mb-3">
                        <input type="text" value={projectdetails.github} placeholder='Github' className='form-control' onChange={(e)=>setProjectdeails({...projectdetails,github:e.target.value})} />
                        </div>
                        <div className="mb-3">
                        <input type="text" value={projectdetails.website} placeholder='Website' className='form-control' onChange={(e)=>setProjectdeails({...projectdetails,website:e.target.value})} />
                        </div>
                        <div className="mb-3">
                            <textarea cols={10} value={projectdetails.overview} rows={5} className='w-100' placeholder='overview' onChange={(e)=>setProjectdeails({...projectdetails,overview:e.target.value})}></textarea>
                        </div>
                    </div>
                </div>
            </div>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="warning" onClick={handleCancel}>
            Cancel
          </Button>
          <Button variant="success" onClick={handleAdd}>
            Add
          </Button>
        </Modal.Footer>
        <ToastContainer theme='colored' position='top-center' autoClose={2000}  />
      </Modal>
    
   
    
    </>
  )
}

export default Addproject