import React, { useEffect, useState } from 'react'
import Header from '../component/Header'
// import { Link } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons'
import ProjectCard from '../component/ProjectCard'
import { allProjectApi } from '../services/allApi'
import { Link } from 'react-router-dom'

function Project() {
    const [allproject, setAllProject] = useState([])
    const [token, setToken] = useState("")
    const [searchkey, setSearchKey] = useState("")

    const getAllProject = async () => {
        if (sessionStorage.getItem("token")) {
            const token = sessionStorage.getItem("token")
            const reqHeader = {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token}`
            }
            const result = await allProjectApi(searchkey ,reqHeader)
            setAllProject(result.data);
        }

    }
    console.log(allproject);

    console.log(token);

    console.log(searchkey);
    

    useEffect(() => {
        getAllProject()
    },[searchkey])


    useEffect(() => {

        if (sessionStorage.getItem("token")) {
            setToken(sessionStorage.getItem("token"))
        }
    }, [])


    return (
        <>
            <Header />
            <div className='my-5'>
                <h3 className='text-center'> All project</h3>

                {!token ?
                    <div className='container-fluid'>
                        <div className='row'>
                            <div className='col-md-3'></div>
                            <div className='col-md-6 d-flex justify-content center align-item-center flex-column'>
                                <img src="https://www.techmeet360.com/wp-content/uploads/2022/08/login-animate.gif" alt="no image" />
                                <h4 className='text-danger mt-5'>please <Link to={'/login'}>Login</Link> to see more project</h4>

                            </div>
                            <div className='col-md-3'></div>
                        </div>
                    </div>

                    :

                    <div className='mt-5'>
                        <div className='container'>
                            <div className='row'>
                                <div className='col-md-4'></div>
                                <div className='col-md-4 d-flex'>
                                    <input type="text" placeholder='Technologies' className='form-control shadow' onChange={(e)=>setSearchKey(e.target.value)} /><FontAwesomeIcon icon={faMagnifyingGlass} style={{ color: 'lightgray', marginTop: '11.5px', marginLeft: '30px' }}  />

                                </div>
                                <div className='col-md-4'></div>
                            </div>
                        </div>

                        <div className='container-fluid p-5 mt-5'>
                            <div className='row'>
                                {allproject?.map((item) => (
                                    <div className="col-md-3">
                                        <ProjectCard project={item} />
                                    </div>

                                ))}

                            </div>
                        </div>
                    </div>}



            </div>

        </>
    )
}

export default Project