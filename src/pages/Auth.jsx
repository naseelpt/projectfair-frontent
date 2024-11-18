
    import { faStackOverflow } from '@fortawesome/free-brands-svg-icons'
import { faBackward } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import React, { useContext, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { loginApi, registerApi } from '../services/allApi'
import { loginResponseContext } from '../context/Contextshare';

function Auth({ register }) {
  const {setLoginResponse} = useContext(loginResponseContext)
 const navigate = useNavigate()
  const [userdetails,setuserDetails] = useState({
    username:"",
    email:"",
    password:""

  })
  console.log(userdetails);

  const handleRegister =async ()=>{
    const {username,email,password} = userdetails
    if(!username || !email || !password){
      toast.info('please fill the form completely')
    }
    else{
      const result =  await registerApi({username,email,password})
      console.log(result );
      if(result.status==200){
        toast.success('Registration successfull')
        setuserDetails({  
          username:"",
          email:"",
          password:""

        })
        navigate('/login')
      }
      else if(result.status==406){
        toast.warning(result.response.data)
      }
      else{
        toast.error('something went wrong')
      }
      
    }
  }

  const handlelogin = async()=>{
    const {email,password} = userdetails
    if(!email || !password){
      toast.info('please fill the from completely')
    }
    else{
      const result = await loginApi({email,password})
      console.log(result);
      if(result.status==200){
        toast.success('Login successfull')
        setLoginResponse(true)
        sessionStorage.setItem("existingUser",JSON.stringify(result.data.existingUser))
        sessionStorage.setItem("token",result.data.token)

        setuserDetails({
          username:"",
          email:"",
          password:""
        })
        navigate('/')
      }
      else if(result.status==406){
        toast.warning(result.response.data)
        setuserDetails({
          username:"",
          email:"",
          password:""
        })
        
      }
      else{
        toast.error('something went wrong')
        setuserDetails({
          username:"",
          email:"",
          password:""
        })
      }
      
    }
  }
  




  return (
    <>

      <div className='container my-5'>
        <Link to={'/'} className='text-decoration-none'>  <h5 className='text-warning'> <FontAwesomeIcon icon={faBackward} /> Back to Home</h5></Link>
        <div className='row bg-success rounded ' style={{ height: '700px' }} >
          <div className="col-md-6 d-flex align-items-center justify-content-center ">
            <img src="https://thumbs.dreamstime.com/z/login-icon-button-vector-illustration-isolated-white-background-126999474.jpg" alt="" style={{height:'500px'}} />
          </div>
          <div className="col-md-6  d-flex flex-column align-items-center justify-content-center text-white">
            <div className='d-flex fs-5 '>
              <h1 > <FontAwesomeIcon icon={faStackOverflow} className='me-2' />
                Project Fair</h1>
            </div>
            {!register ? <h5 className='my-3'>Sign In to Your Account </h5>
              : <h5 className='my-3'>Sign Up to Your Account </h5>}


            {register &&
             <input type="text" className='form-control w-75' value={userdetails.username} placeholder='UserName' style={{ height: '3rem' }} required onChange={(e)=>setuserDetails({...userdetails , username:e.target.value})} />}
            <input type="text" className='form-control w-75 mt-3' value={userdetails.email} placeholder='E-mail ID' style={{ height: '3rem' }} required onChange={(e)=>setuserDetails({...userdetails , email:e.target.value})} />
            <input type="text" className='form-control w-75 mt-3' value={userdetails.password} placeholder='Password' style={{ height: '3rem' }} required onChange={(e)=>setuserDetails({...userdetails , password:e.target.value})} />

            {!register ?
              <div>
                <button onClick={handlelogin}  className='btn btn-warning w-100 mt-4' style={{ height: '3rem' }}>Login</button>
                <h5 className='mt-3'>New User? Click Here to <Link to={'/register'} className='text-danger' >Register</Link></h5>
              </div>
              :
              <div>
                <button onClick={handleRegister} className='btn btn-warning w-100 mt-4' style={{ height: '3rem' }}>Register</button>
                <h5 className='mt-3'>Already a User?Click Here to  <Link to={'/login'} className='text-danger ' >Login</Link></h5>
              </div>
            }

          </div>

        </div>

      </div>

      <ToastContainer theme='colored' position='top-center' autoClose={2000}  />

    </>
  )
}

export default Auth