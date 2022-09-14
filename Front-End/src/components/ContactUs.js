import { useNavigate } from "react-router-dom";
import {useState, useEffect } from "react";
import axios from "axios";
import { Formik } from "formik";
import OutlinedInput from '@mui/material/OutlinedInput'
import { Button } from 'react-bootstrap'


// function for contactus page

export function Contactus() {

    // Navigate function for navigation through pages
  
    const Navigate = useNavigate();

    // useEffect used to clear history to avoid browser back button
  
    useEffect(() => {
      window.history.pushState(null, document.title, window.location.href);
      window.addEventListener('popstate', function (event) {
        window.history.pushState(null, document.title, window.location.href);
      })
    }, []);
  
    // formik initial value
  
    const [formvalue, setformvalue] = useState({
      Username: '',
      UserContactNo: '',
      questionenquiry: ''
    })
  
    // formik validate function
  
    const validate = (formData) => {
      var errors = {};
      if (formData.Username == '') errors.Username = 'User Name is Required';
      if (formData.UserContactNo == '') errors.UserContactNo = 'User Contact No is Required';
      if (formData.questionenquiry == '') errors.questionenquiry = 'Question Enquiry is Required';
      return errors;
    };
  
    // formik submit function
  
    const submit = async (formData) => {
      //on submit posting datas to database - Create
      var post = await axios.post('http://localhost:3002/postcontactus', {
        Username: formData.Username,
        UserContactNo: formData.UserContactNo,
        questionenquiry: formData.questionenquiry
      })
  
    if(post){
      alert("Query sent successfully")
    }
   
  
      await setformvalue({ Username : '', UserContactNo : '', questionenquiry : '' })
    }
  
    return (
      <>
  
        {/* Home Buttton */}
  
        <div class='container bgcolor '>
          <div class="row mt-3">
            <div class="col-12 text-end mt-3">
              <button class="btn btn-outline-light" onClick={() => Navigate('/')} >  Log out </button>
            </div>
          </div>
  
  
          {/* Top Gird */}
  
          <div class="row rowht mt-3" style={{ backgroundColor: "rgb(61, 3, 61)", color: "white" }}>
            <div class="col-lg-4 col-md-4 col-sm-6 mt-sm-3 mt-lg-0 mt-md-0 text-start align-self-center">
              <span >Contact Us For Any Product Related Queries</span>
            </div>
            <div class="col-lg-4 col-md-4 col-sm-12 mt-sm-3 mt-lg-0 mt-md-0 text-start text-lg-center text-md-center text-sm-start align-self-center" >
              <span >Contact No:+91-9999999999</span>
            </div>
            <div class="col-lg-4 col-md-4 col-sm-12 mt-sm-3 mt-lg-0 mt-md-0 text-start text-lg-end text-md-end text-sm-start align-self-center">
              <span >Contact Mail - XXXXXXX@gmail.com </span>
            </div>
          </div>
  
          {/* Formik */}
  
          <Formik
            enableReinitialize
            initialValues={formvalue}
            validate={(formData) => validate(formData)}
            onSubmit={(formData) => submit(formData)}
          >
            {({
              values,
              errors,
              touched,
              handleChange,
              handleBlur,
              handleSubmit,
              isSubmitting,
            }) => (
              <form className='form' onSubmit={handleSubmit}>
  
                {/* User Name */}
  
                <div class="row mt-3 errorrowht ">
                  <div class="col-lg-6 col-md-6 col-sm-12 mt-3 text-center text-lg-end text-md-end text-sm-end align-self-center" >
                    <label>User Name</label>
                  </div>
                  <div class="col-lg-6 col-md-6 col-sm-12 mt-3 text-center text-lg-start text-md-start text-sm-start align-self-center" style={{ display: 'inline-block' }}>
                    <OutlinedInput placeholder="Please enter Username" type="text"
                      name="Username"
                      value={values.Username}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      className='input1 light' style={{ color: "white" }} />
                  </div>
                </div>
                <div class="row mt-1 errorrowht">
                  <div className=' col-12 text-center align-self-center' style={{ color: 'red' }}>
                    {touched.Username && errors.Username}
                  </div>
                </div>
  
                <br></br>
  
                {/* User Contact No. */}
  
                <div class="row mt-3 errorrowht ">
                  <div class="col-lg-6 col-md-6 col-sm-12 mt-3 text-center text-lg-end text-md-end text-sm-end align-self-center" >
                    <label>User Contact No.</label>
                  </div>
                  <div class="col-lg-6 col-md-6 col-sm-12 mt-3 text-center text-lg-start text-md-start text-sm-start align-self-center" style={{ display: 'inline-block' }}>
                    <OutlinedInput placeholder="Please enter UserContactNo" type="number"
                      name="UserContactNo"
                      value={values.UserContactNo}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      className='input2' style={{ color: "white" }} />
                  </div>
                </div>
                <div class="row mt-1 errorrowht">
                  <div className=' col-12 text-center align-self-center' style={{ color: 'red' }}>
                    {touched.UserContactNo && errors.UserContactNo}
                  </div>
                </div>
                <br></br>
  
                {/* Question for enquiry */}
  
                <div class="row mt-3 errorrowht">
                  <div class="col-lg-6 col-md-6 col-sm-12 mt-3 text-center text-lg-end text-md-end text-sm-end align-self-center" >
                    <label>Question for enquiry</label> &nbsp;
                  </div>
                  <div class="col-lg-6 col-md-6 col-sm-12 mt-3 text-center text-lg-start text-md-start text-sm-start align-self-center" style={{ display: 'inline-block' }}>
                    <OutlinedInput placeholder="Please enter questionenquiry" type="text"
                      name="questionenquiry"
                      value={values.questionenquiry}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      className='input3' style={{ color: "white" }} />
                  </div>
                </div>
  
                <div class="row mt-1 errorrowht">
                  <div className=' col-12 text-center align-self-center' style={{ color: 'red' }}>
                    {touched.questionenquiry && errors.questionenquiry}
                  </div>
                </div>
                <br></br>
  
                {/*Submit button */}
  
                <div class="row mt-1 errorrowht">
                  <div class="col-12 mt-3 text-center">
                    <Button type="submit" variant="light" style={{ backgroundColor: "rgb(61, 3, 61)", color: "white" }} disabled={isSubmitting} >submit</Button> &nbsp;
                  </div>
                </div>
                <br></br>
              </form>
            )}
          </Formik>
        </div>
      </>
    )
  }