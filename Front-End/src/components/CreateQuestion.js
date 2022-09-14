import { useNavigate } from "react-router-dom";
import { useState, useEffect, useRef } from "react";
import axios from "axios";
import { Formik } from "formik";
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Box from '@mui/material/Box';
import OutlinedInput from '@mui/material/OutlinedInput'
import FormControl from '@mui/material/FormControl';
import { Table } from 'react-bootstrap'

// function for Create question

export function Createquestion() {

    const Navigate = useNavigate()

    //  function to store the datas

    const [array, setarray] = useState({ Product: [] })

    //  function to re render useeffect

    const [counter, setcounter] = useState(0)

    const ele = useRef()

    // function to store formik datas

    const [formvalue, setformvalue] = useState({
        Question: '',
        option1: '',
        option2: '',
        option3: '',
        Answer: '',
        _id: '',
    })

    // useEffect to get datas on page load

    useEffect(
        () => {
            data()
        }, [counter])

    const data = async () => {
        var response = await axios.get('http://localhost:3002/getQuestion')
        setarray({ Product: response.data })
    }

    // useEffect used to clear history to avoid browser back button

    useEffect(() => {
        window.history.pushState(null, document.title, window.location.href);
        window.addEventListener('popstate', function (event) {
            window.history.pushState(null, document.title, window.location.href);
        })
    }, []);

    // formik errors

    const validate = (formData) => {
        var errors = {};
        if (formData.Question == '') errors.Question = 'Question is Required';
        if (formData.option1 == '') errors.option1 = 'option-1 is Required';
        if (formData.option2 == '') errors.option2 = 'option-2 is Required';
        if (formData.option3 == '') errors.option3 = 'option-3 is Required';
        if (formData.Answer == '') errors.Answer = 'Answer is Required';
        return errors;
    };

    //   function for onsubmit 

    const submit = async (formData) => {

        if (formvalue._id) {
            //Update
            var response = await axios.put(`http://localhost:3002/updateQuestion/${formvalue._id}`,
                {
                    Question: formData.Question,
                    option1: formData.option1,
                    option2: formData.option2,
                    option3: formData.option3,
                    Answer: formData.Answer
                })

            var index = array.Product.findIndex((row) => row._id === formvalue._id)
            var Product = [...array.Product]
            Product[index] = response.data
            setarray({ Product })
            setformvalue({ Question: '', option1: '', option2: '', option3: "", Answer: "" })
            setcounter(counter + 1)
            var btn = document.querySelector("#createbtn")
            btn.innerHTML = "Create"
            alert('updated successfully')
        }

        else {
            //Create
            var post = await axios.post('http://localhost:3002/postQuestion', {
                Question: formData.Question,
                option1: formData.option1,
                option2: formData.option2,
                option3: formData.option3,
                Answer: formData.Answer
            })
            var Product = [...array.Product];
            Product.push(post.data);
            setarray({ Product });
           await setformvalue({ Question: '', option1: '', option2: '', option3: "", Answer: "" })
            alert('created successfully')
        }
    }

    //  function for update

    const Update = async (_id) => {
        //Edit Button - Populating Data on Input Field
        var selectedData = await array.Product.filter((row) => row._id == _id)[0]
        await setformvalue({
            Question: selectedData.Question,
            option1: selectedData.option1,
            option2: selectedData.option2,
            option3: selectedData.option3,
            Answer: selectedData.Answer,
            _id: selectedData._id
        })
       
         ele.current.innerHTML = "Update"
    }

    //  function for delete

    const Delete = (_id) => {
        var result = window.confirm("Are you sure to delete?");
        if (result) {
            //Deleting data from table
            var response = axios.delete(`http://localhost:3002/deleteQuestion/${_id}`)
            var Product = array.Product.filter((row) => row._id !== _id)
            setarray({ Product })
        }
    }

    return (
        <>
            {/* Admin Page button */}

            <div class="container bgcolor">
                <div class="row ">
                    <div class="col-12 text-end mt-3">
                        <button class="btn btn-outline-light" onClick={() => Navigate('/admin')} >  Admin Page </button>
                    </div>
                </div>

                {/* Top Grid */}

                <div class="row mt-4">
                    <div class="col-12 " >
                        <Box sx={{ flexGrow: 1 }}>
                            <AppBar position="static">
                                <Toolbar class="text-center" style={{ backgroundColor: "rgb(79, 6, 79)", minHeight: "35px", fontSize: "23px" }} >
                                    Create / Read / Edit / Delete Your Question
                                </Toolbar>
                            </AppBar>
                        </Box>
                    </div>
                </div>

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
                            <div class="row mt-5" style={{ height: "50%" }}>
                                <div class="col-lg-4 col-md-4 col-sm-6 text-center">
                                    <label>Question</label> &nbsp;
                                </div>
                                <div class="col-lg-4 col-md-4 col-sm-6 text-center">
                                    <div className='input1' style={{ display: 'inline-block' }}>
                                        <Box component="form" noValidate autoComplete="off">
                                            <FormControl sx={{ width: '35ch' }}>
                                                <OutlinedInput placeholder="Please enter Question" type="text"
                                                    name="Question"
                                                    value={values.Question}
                                                    onChange={handleChange}
                                                    onBlur={handleBlur}
                                                    className='input1'
                                                    style={{ color: "white" }}
                                                />
                                            </FormControl>
                                        </Box>
                                    </div>
                                </div>

                                <div class="col-lg-4 col-md-4 col-sm-6 text-center">
                                    <span style={{ color: 'red' }}>
                                        {touched.Question && errors.Question}
                                    </span>
                                </div>
                            </div>

                            {/* Option-1 Input */}

                            <div class="row mt-5" style={{ height: "50%" }}>
                                <div class="col-lg-4 col-md-4 col-sm-6 text-center">
                                    <label>option-1</label> &nbsp;
                                </div>
                                <div class="col-lg-4 col-md-4 col-sm-6 text-center">
                                    <div className='input2' style={{ display: 'inline-block' }}>
                                        <Box component="form" noValidate autoComplete="off">
                                            <FormControl sx={{ width: '35ch' }}>
                                                <OutlinedInput placeholder="Please enter option1" type="text"
                                                    name="option1"
                                                    value={values.option1}
                                                    onChange={handleChange}
                                                    onBlur={handleBlur}
                                                    className='input2' style={{ color: "white" }} />
                                            </FormControl>
                                        </Box>
                                    </div>
                                </div>
                                <div class="col-lg-4 col-md-4 col-sm-6 text-center">
                                    <span style={{ color: 'red' }}>
                                        {touched.option1 && errors.option1}
                                    </span>
                                </div>
                            </div>

                            {/* Option-2 Input */}

                            <div class="row mt-5" style={{ height: "50%" }}>
                                <div class="col-lg-4 col-md-4 col-sm-6 text-center">
                                    <label>option-2</label> &nbsp;
                                </div>
                                <div class="col-lg-4 col-md-4 col-sm-6 text-center">
                                    <div className='input3' style={{ display: 'inline-block' }}>
                                        <Box component="form" noValidate autoComplete="off">
                                            <FormControl sx={{ width: '35ch' }}>
                                                <OutlinedInput placeholder="Please enter option2" type="text"
                                                    name="option2"
                                                    value={values.option2}
                                                    onChange={handleChange}
                                                    onBlur={handleBlur}
                                                    className='input3' style={{ color: "white" }} />
                                            </FormControl>
                                        </Box>
                                    </div>
                                </div>
                                <div class="col-lg-4 col-md-4 col-sm-6 text-center">
                                    <span style={{ color: 'red' }}>
                                        {touched.option2 && errors.option2}
                                    </span>
                                </div>
                            </div>

                            {/* Option-3 Input */}

                            <div class="row mt-5" style={{ height: "50%" }}>
                                <div class="col-lg-4 col-md-4 col-sm-6 text-center">
                                    <label>option-3</label> &nbsp;
                                </div>
                                <div class="col-lg-4 col-md-4 col-sm-6 text-center">
                                    <div className='input3' style={{ display: 'inline-block' }}>
                                        <Box component="form" noValidate autoComplete="off">
                                            <FormControl sx={{ width: '35ch' }}>
                                                <OutlinedInput placeholder="Please enter option3" type="text"
                                                    name="option3"
                                                    value={values.option3}
                                                    onChange={handleChange}
                                                    onBlur={handleBlur}
                                                    className='input3' style={{ color: "white" }} />
                                            </FormControl>
                                        </Box>
                                    </div>
                                </div>
                                <div class="col-lg-4 col-md-4 col-sm-6 text-center">
                                    <span style={{ color: 'red' }}>
                                        {touched.option3 && errors.option3}
                                    </span>
                                </div>
                            </div>

                            {/* Answer Input */}

                            <div class="row mt-5" style={{ height: "50%" }}>
                                <div class="col-lg-4 col-md-4 col-sm-6 text-center">
                                    <label>Answer</label> &nbsp;
                                </div>
                                <div class="col-lg-4 col-md-4 col-sm-6 text-center">
                                    <div className='input3' style={{ display: 'inline-block' }}>
                                        <Box component="form" noValidate autoComplete="off">
                                            <FormControl sx={{ width: '35ch' }}>
                                                <OutlinedInput placeholder="Please enter Answer" type="text"
                                                    name="Answer"
                                                    value={values.Answer}
                                                    onChange={handleChange}
                                                    onBlur={handleBlur}
                                                    className='input3' style={{ color: "white" }} />
                                            </FormControl>
                                        </Box>
                                    </div>
                                </div>
                                <div class="col-lg-4 col-md-4 col-sm-6 text-center">
                                    <span style={{ color: 'red' }}>
                                        {touched.Answer && errors.Answer}
                                    </span>
                                </div>
                            </div>

                            {/* create button */}

                            <div class="row mt-5" style={{ height: "50%" }}>
                                <div class="col-12 text-center">
                                    <button type="submit" id="createbtn" ref={ele} class="btn btn-outline-light"
                                        style={{ backgroundColor: "rgb(79, 6, 79)", borderRadius: "5px", color: "white" }} disabled={isSubmitting} >
                                        create</button> &nbsp;
                                </div>
                            </div>
                        </form>
                    )}
                </Formik>

                {/* Table */}

                <div class="row mt-3" style={{ height: "50%" }}>
                    <div class="col-12 text-center table-responsive">
                        <Table striped bordered hover variant="light" border='1'>
                            <thead>
                                <tr>
                                    <th> id </th>
                                    <th> Question </th>
                                    <th> option-1 </th>
                                    <th> option-2 </th>
                                    <th> option-3 </th>
                                    <th> Answer </th>
                                    <th> Actions </th>
                                </tr>
                            </thead>
                            <tbody>
                                {array.Product.map((row) => (
                                    <tr key={row.id}>
                                        <td> </td>
                                        <td> {row.Question} </td>
                                        <td> {row.option1} </td>
                                        <td> {row.option2} </td>
                                        <td> {row.option3} </td>
                                        <td> {row.Answer} </td>
                                        <td> <button class="tablebutton " onClick={() => Update(row._id)} >Edit</button> &nbsp; &nbsp; &nbsp;
                                            <button class="tablebutton " onClick={() => Delete(row._id)} >Delete</button></td>
                                    </tr>
                                ))}
                            </tbody>
                        </Table>
                    </div>
                </div>
            </div>
        </>
    )
}