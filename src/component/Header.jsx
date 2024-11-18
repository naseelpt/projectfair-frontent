import { faStackOverflow } from '@fortawesome/free-brands-svg-icons';
import { faPowerOff } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { useContext, useEffect, useState } from 'react'
import Navbar from 'react-bootstrap/Navbar';
import { Link, useNavigate } from 'react-router-dom';
import { loginResponseContext } from '../context/Contextshare';

function Header() {
  const [token,setToken] = useState("")
  const navigate = useNavigate()
  const {setLoginResponse} = useContext(loginResponseContext)

  useEffect(()=>{
    if(sessionStorage.getItem("token")){
      setToken(sessionStorage.getItem("token"))
    }
  },[])

  const handlelogout = ()=>{
    sessionStorage.removeItem("existingUser")
    sessionStorage.removeItem("token")
    setLoginResponse(false)
    navigate
  }
  return (
    <>
     <Navbar className="bg-success d-flex align-item-center">
     
       <Link to={'/'} style={{textDecoration:'none'}}>
            <Navbar.Brand className='text-light'><span className='fs-3 ms-5'><FontAwesomeIcon icon={faStackOverflow} /></span>Project Fair </Navbar.Brand>
            </Link>
            {token &&
              <button onClick={handlelogout} className='btn btn-warning ms-auto me-5'><FontAwesomeIcon icon={faPowerOff} />Logout</button>}
            
      
     
    </Navbar>
    
    
    
    </>
  )
}

export default Header