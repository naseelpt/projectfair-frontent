import React from 'react'
import Header from '../component/Header'
import { Col, Container, Row } from 'react-bootstrap'
import Myproject from '../component/Myproject'
import Profile from '../component/Profile'

function Dashboard() {
  return (
    <>
    <Header/>
    <div className='p-4'>
      <h3>Welcome <span className='text-warning'>User</span></h3>
      <Container>
        <Row>
          <Col sm={12} md={8}>
          <Myproject/>
          </Col>
          
          <Col sm={12} md={4}>
          <Profile/>
          </Col>
          
        </Row>
      </Container>

    </div>
    
    </>
  )
}

export default Dashboard