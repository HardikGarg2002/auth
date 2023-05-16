import React from 'react';
import {
  MDBBtn,
  MDBContainer,
  MDBRow,
  MDBCol,
  MDBCard,
  MDBCardBody,
  MDBCardImage,
  MDBInput,
  MDBIcon,
  MDBCheckbox
}
from 'mdb-react-ui-kit';


function SignIn() {
  return (
    <form method = "post" action = "./signin">
    <MDBContainer fluid >

      <MDBCard className='text-black m-5' style={{borderRadius: '25px'}}  >
        <MDBCardBody>
          <MDBRow>
            <MDBCol md='10' lg='6' className='order-2 order-lg-1 d-flex flex-column align-items-center'>

              <p classNAme="text-center h1 fw-bold mb-5 mx-1 mx-md-4 mt-4">Login</p>

                <div className="d-flex flex-row align-items-center mb-4">
                <MDBInput label='Your Email' id='form2' type='email'/>
                <MDBIcon fas icon="envelope me-3" size='lg'/>
                
              </div>

              <div className="d-flex flex-row align-items-center mb-4">
                <MDBInput label='Password' id='form3' type='password'/>   
                <MDBIcon fas icon="lock me-3" size='lg'/>
                
              </div>

            

              <div className='mb-4'>
                <MDBCheckbox name='flexCheck' value='' id='flexCheckDefault' label='Subscribe to our newsletter' />
              </div>

              <MDBBtn className='mb-4' size='lg' type= 'submit' >LOGIN</MDBBtn>

            </MDBCol>

            <MDBCol md='10' lg='6' className='order-1 order-lg-2 d-flex align-items-center'>
              <MDBCardImage src='https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-registration/draw1.webp' fluid/>
            </MDBCol>

          </MDBRow>
        </MDBCardBody>
      </MDBCard>

    </MDBContainer>
    </form >
  ) ;
}

// onClick={registration}

// function registration(){
//     window.location.href = 'http://localhost:5000/signin';
// }

export default SignIn;