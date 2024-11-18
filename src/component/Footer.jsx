import { faFacebook, faInstagram, faLinkedin, faSquareXTwitter } from '@fortawesome/free-brands-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React from 'react'

function Footer() {
  return (
    <div className='container-fluid'>
        <div className='row bg-success mt-5'>
            <div className='col-md-1'></div>
            <div className="col-md-3 text-light mt-2">
                <h2>Projcet Fair</h2> 
                <p>Lorem, ipsum dolor sit amet consectetur adipisicing elit. Quod assumenda id ratione laudantium accusantium totam. Similique placeat, distinctio repellat cumque voluptatum animi maxime commodi hic at suscipit quia. Consequuntur, nobis.</p>
            </div>
            <div className="col-md-2 text-light  mt-2">
                <h1>Links</h1>
                <p>Home</p>
                <p>Project</p>
                <p>Dashboard</p>
            </div>
            <div className="col-md-2 text-light  mt-2">
                <h1>Guides</h1>
                <p>React</p>
                <p>React Bootstrap</p>
                <p>react Bootswatch</p>
            </div>
            <div className="col-md-3 text-light  mt-2">
                <h1>Contact Us</h1>
              <div className='d-flex justify-between'>
                    <input type="text" placeholder='Enter mail id' className='form-control rounded w-50' />
                    <button className='btn bg-warning rounded ms-3 '>Subscribe</button>
              </div>
              <div className='mt-3 '>
                <FontAwesomeIcon icon={faInstagram} style={{color: "#d116d4",}} className='fa-2x ms-2' />
                <FontAwesomeIcon icon={faSquareXTwitter} style={{color: "#d31763",}} className='fa-2x ms-5' />
                <FontAwesomeIcon icon={faFacebook} style={{color: "#020af2",}} className='fa-2x ms-5' />
                <FontAwesomeIcon icon={faLinkedin} style={{color: "#1361e7",}} className='fa-2x ms-5' />
                </div>
            </div>
            <div className='col-md-1'></div>
        </div>
    </div>
  )
}

export default Footer