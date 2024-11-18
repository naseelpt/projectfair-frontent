import { faAngleDown, faAngleUp } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React, { useEffect, useState } from 'react'
import { serverUrl } from '../services/serverUrl'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { updateuserprofileApi } from '../services/allApi';
import { Collapse } from 'react-bootstrap';



function Profile() {
    const [open, setOpen] = useState(false);
    const [userdetails,setUserDetails] = useState({
        
        username:"",
        email:"",
        password:"",
        profile:"",
        github:"",
        linkedin:"",
    })
    const [existingimg,setExistingImg] = useState("")
    const [preview,setPreview] = useState("")
    const[updatestatus,setUpdateStatus] = useState({})
    console.log(userdetails);

    const handlefile = (e)=>{
     setUserDetails({...userdetails,profile:e.target.files[0]})
    }

    useEffect(()=>{
        if(userdetails.profile){
            setPreview(URL.createObjectURL(userdetails.profile))
        }
    },[userdetails.profile])

    // console.log(preview);
    
    const handleupdate = async()=>{
        

        const {username,email,password,profile,github,linkedin} = userdetails
        if(!github || !linkedin){
            toast.info('please add github and linkedin')
        }
        else{
            const reqBody = new FormData()
            reqBody.append("username",username)
            reqBody.append("email",email)
            reqBody.append("password",password)
            reqBody.append("github",github)
            reqBody.append("linkedin",linkedin)
            preview?reqBody.append("profile",profile):reqBody.append("profile",existingimg)

            const token = sessionStorage.getItem("token")
            if(preview){
                const reqHeader = {
                    "Content-Type":"multipart/form-data",
                    "Authorization":`Bearer ${token}`
                    
                  }
                  const result = await updateuserprofileApi(reqBody,reqHeader)
                  console.log(result);
                  if(result.status==200){
                    toast.success('update successfully')
                    sessionStorage.setItem("existingUser",JSON.stringify(result.data))
                    setUpdateStatus(result)
                  }
                  else{
                    toast.error('something went wrong')
                  }
                  
            }
            else{
                const reqHeader = {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${token}`
                  }
                  const result = await updateuserprofileApi(reqBody,reqHeader)
                  console.log(result);
                  if(result.status==200){
                    toast.success('update successfully')
                    sessionStorage.setItem("existingUser",JSON.stringify(result.data))
                    setUpdateStatus(result)
                  }
                  else{
                    toast.error('something went wrong')
                  }
            }

        }

    }


    useEffect(()=>{
        if(sessionStorage.getItem("existingUser")){
            const user = JSON.parse(sessionStorage.getItem("existingUser"))
            console.log(user);
            setUserDetails({...userdetails,username:user.username,email:user.email,password:user.password,github:user.github,linkedin:user.linkedin})
            setExistingImg(user.profile)
            
        }

    },[updatestatus])
    
  return (
    <>
    <div className='p-4 shadow'>
        <div className='d-flex justify-content-between'>
            <h3 style={{color:'blue'}}>profile</h3>
           <button   onClick={() => setOpen(!open)} className='btn ' style={{borderColor:'black'}}> {open==true?<FontAwesomeIcon icon={faAngleUp} />:<FontAwesomeIcon icon={faAngleDown} />}</button>
          
        </div>
       
          <Collapse in={open}>
          
             <div>
                    <div className='d-flex justify-content-center align-item-center flex-column'>
                        <label htmlFor="profileimage" className='mb-4 d-flex justify-content-center align-item-center'>
                            <input id='profileimage' type="file" style={{display:'none'}} onChange={(e)=>handlefile(e)} />
                         {existingimg==""?
                            <img src={preview?preview:"https://static.vecteezy.com/system/resources/previews/019/465/366/original/3d-user-icon-on-transparent-background-free-png.png"} alt="no image"  style={{height:"200px",width:"200px",borderRadius:"50%"}}/>
                        :
                            <img src={preview?preview:`${serverUrl}/upload/${existingimg}`} alt="no image"  style={{height:"200px",width:"200px"}} />
                            }
            
                        </label>
            
                        <div className='w-100'>
                            <div className='mb-3'>
                                <input type="text" placeholder='Github' className='form-control' value={userdetails?.github} onChange={(e)=>setUserDetails({...userdetails,github:e.target.value})}/>
                            </div>
                            <div className='mb-3'>
                                <input type="text" placeholder='Linkedin' className='form-control' value={userdetails?.linkedin} onChange={(e)=>setUserDetails({...userdetails,linkedin:e.target.value})}/>
                            </div>
                            <div className='mb-3'>
                                <button className=' btn btn-success w-100' onClick={handleupdate}>Update</button>
                            </div>
                        </div>
                    
                    </div>
             </div>

          </Collapse>
       
        <ToastContainer theme='colored' position='top-center' autoClose={2000}  />
    </div>
    
    
    
    
    </>
  )
}

export default Profile