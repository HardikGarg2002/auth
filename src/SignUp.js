import React from 'react';
import './SignUp.css';
import {
  MDBBtn,
  MDBContainer,
  MDBCard,
  MDBCardBody,
  MDBInput,
  MDBCheckbox
  
}
from 'mdb-react-ui-kit';

function SignUp() {
  return (
    <form method = "post" action = "http://localhost:5000/signup">
    <MDBContainer fluid className='d-flex align-items-center justify-content-center bg-image' style={{backgroundImage: 'url(https://mdbcdn.b-cdn.net/img/Photos/new-templates/search-box/img4.webp)'}}>
      <div className='mask gradient-custom-3'></div>
      <MDBCard className='m-5' style={{maxWidth: '600px'}}>
        <MDBCardBody className='px-5'>
          <h2 className="text-uppercase text-center mb-5">Create a new account</h2>
          <MDBInput wrapperClass='mb-4' label='Your Name' size='lg' id='form1' name="name" type='text'/>
          <MDBInput wrapperClass='mb-4' label='Your Email' size='lg' id='form2' name="email" type='email'/>
          <MDBInput wrapperClass='mb-4' label='Password' size='lg' id='form3' name="password" type='password'/>
          <MDBInput wrapperClass='mb-4' label='Repeat your password' size='lg' id='form4' type='verifypassword'/>
          <div className='d-flex flex-row justify-content-center mb-4'>
            <MDBCheckbox name='flexCheck' id='flexCheckDefault' label='I agree all statements in Terms of service' />
          </div>
          <MDBBtn className='mb-4 w-100 gradient-custom-4' size='lg'>Register</MDBBtn>
        </MDBCardBody>
      </MDBCard>
    </MDBContainer>
    </form>
  );
}

export default SignUp;