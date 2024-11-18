import React from 'react'
import Card from 'react-bootstrap/Card';
import projectPhoto from '../assets/facebook.png';
import { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGithub } from '@fortawesome/free-brands-svg-icons';
import { faGlobe } from '@fortawesome/free-solid-svg-icons';
import { Link } from 'react-router-dom';
import  Modal  from 'react-bootstrap/Modal';
import { serverUrl } from '../services/serverUrl';


function ProjectCard({project}) {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  return (
    <>
    <div><Card style={{ width: '100%' }} className=' mt-5 mt-md-0 shadow border-0 rounded-0'>
    <Card.Img variant="top" src={`${serverUrl}/upload/${project.projectimage}`} className=' w-100' onClick={handleShow} />
    <Card.Body>
      <Card.Title>{project.title}</Card.Title>
    </Card.Body>
  </Card></div>

  
<Modal show={show} onHide={handleClose } size='lg'>
<Modal.Header closeButton>
  <Modal.Title>{project?.title}</Modal.Title>
</Modal.Header>
<Modal.Body>
  <div className='container-fluid'>
    <div className='row'>
      <div className="col-md-6">
        <img src={`${serverUrl}/upload/${project.projectimage}`}   alt="no image" className='w-100' /></div>
      <div className="col-md-6">
       <h4>Description</h4>
       <p>{project?.overview}</p>
       <h4>Technologies</h4>
       <p>{project?.language}</p>
      </div>
    </div>
  </div>
</Modal.Body>
<Modal.Footer>
  <div className='d-flex'>
<Link to={project?.github} target='_blank'>  <FontAwesomeIcon icon={faGithub} className='fa-2x me-3' /></Link>
  <Link to={project?.website} target='_blank'><FontAwesomeIcon icon={faGlobe }  className='fa-2x'/></Link>
  </div>
  
</Modal.Footer>
</Modal>


</>

  
  )
}

export default ProjectCard