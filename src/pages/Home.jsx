import { faArrowRight } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React, { useEffect, useState } from 'react'
import photo from '../assets/image.png'
import { Link } from 'react-router-dom'
import ProjectCard from '../component/ProjectCard'
import { homeProjectApi } from '../services/allApi'

function Home() {
  const [isLogin,setisLogin] = useState(false)
  const [homeproject,setHomeProject] = useState([])

const getHomeProject = async()=>{
  const result = await homeProjectApi()
  setHomeProject(result.data)
}


  useEffect(()=>{
    getHomeProject()
    if(sessionStorage.getItem("token")){
      setisLogin(true)
    }
    else{
      setisLogin(false)
    }
  })


  return (
    <>
    <div style={{height:'100vh'}} className='bg-success p-5'>
        <div className='container-fluid'>
            <div className='row'>
                <div className="col-md-6">
                    <h1 style={{fontSize:'70px',color:'white'}} >Project Fair</h1>
                    <p>one stop destination for all software devolepment project</p>
                   {isLogin == false? <Link to={'/login'}><button className='btn text-light p-0 mt-3'>Get start<FontAwesomeIcon icon={faArrowRight} /></button></Link>:
                   <Link to={'/dashboard'}> <button className='btn text-light p-0 mt-3'> Manage Project<FontAwesomeIcon icon={faArrowRight} /></button></Link>}
                </div>
                <div className="col-md-6">
                    <img src={photo} alt="" className='w-50' />
                </div>
            </div>
        </div>
    </div>

    <div>
        <h1 className='text-center my-5'>Explore our Projrct</h1>

        <div className='container'>
            <div className='row'>
               {homeproject?.map((item)=>(
                <div className='col-md-4'>
                <ProjectCard project = {item}/>
              </div>

               )) 
                }
            </div>
        </div>
        <Link to={'/projects' } className='text-danger' ><p className='text-center my-4'>See more Project</p></Link>
    </div>

    </>
  )
}

export default Home