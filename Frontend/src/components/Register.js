import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";
import { Formik } from "formik";
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import OutlinedInput from '@mui/material/OutlinedInput'

// Function for new user registration

export function Register() {

    const Navigate = useNavigate();

    useEffect(() => {
        window.history.pushState(null, document.title, window.location.href);
        window.addEventListener('popstate', function (event) {
            window.history.pushState(null, document.title, window.location.href);
        })
    }, []);

    const [formvalue, setformvalue] = useState({
        First_Name: "",
        Last_Name: "",
        E_mail: "",
        Role: ""

    })

    // Formik Error Validation

    const validate = (formData) => {
        var errors = {};
        if (formData.Role == "") errors.Role = "Role is Required";
        if (formData.First_Name == "") errors.First_Name = "First Name is Required";
        if (formData.Last_Name == "") errors.Last_Name = "Last Name is Required";
        if (formData.E_mail == "") errors.E_mail = "E_mail is Required";

        return errors;
    }

    // On Submit Function

    var Register = async (formData) => {
        var response = await axios.post("http://localhost:3002/register", {
            firstName: formData.First_Name,
            lastName: formData.Last_Name,
            email: formData.E_mail,

        })

        await setformvalue({ First_Name: "", Last_Name: "", E_mail: "", Password: "" })

        if (response.statusText === "Created") {
            alert("Registered Successfully")
            Navigate('/', { replace: true })
        }

        else if (response.data === "User Already Exist. Please Login") {
            alert("User Already Exist. Please Login")
            setformvalue({ First_Name: "", Last_Name: "", E_mail: "", Password: "" })
        }
    }

    return (
        <>

            {/* Top Grid */}
            <section>
                <div class="container-fluid mt-5">
                    <div class="row">
                        <div class="col-12 align-self-center">
                            <Box sx={{ flexGrow: 1 }}>
                                <AppBar position="static">
                                    <Toolbar style={{ minHeight: "12vw" }} className="color">
                                        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }} >
                                            <div className="fontstyle1">
                                                Register Your Details
                                            </div>
                                        </Typography>
                                    </Toolbar>
                                </AppBar>
                            </Box>
                        </div>
                    </div>

                    <Formik
                        initialValues={formvalue}
                        validate={(formData) => validate(formData)}
                        onSubmit={(formData) => Register(formData)}
                    >
                        {({
                            values,
                            errors,
                            touched,
                            handleChange,
                            handleBlur,
                            handleSubmit,
                            isSubmitting,
                            /* and other goodies */
                        }) => (
                            <form onSubmit={handleSubmit}>

                                {/* select button */}

                                <div class="row mt-5 rowht ">
                                    <div class="col-lg-6 col-md-6 col-sm-12 text-center text-lg-end text-md-end text-sm-center align-self-center  ">
                                        <label for="Role" > Role </label> &nbsp; &nbsp;
                                    </div>
                                    <div class="col-lg-2 col-md-2 col-sm-12 text-center text-lg-start text-md-start text-sm-center align-self-center  ">
                                        <select class="form-select" name="Role" onChange={handleChange}
                                            onBlur={handleBlur}
                                            value={values.Role} aria-label="Default select example">
                                            <option selected>Open this select menu</option>
                                            <option value="Admin">Admin</option>
                                            <option value="User">User</option>
                                        </select>
                                    </div>
                                </div>
                                <div class="row  errorrowht">
                                    <div class=" col-12 text-center     ">
                                        <div className="errors text-center">{errors.Role && touched.Role && errors.Role}</div>
                                    </div>
                                </div>

                                {/* First_Name Input */}

                                <div class="row mt-4 rowht ">
                                    <div class="col-lg-6 col-md-6 col-sm-12 text-center text-lg-end text-md-end text-sm-center align-self-center  ">
                                        <label for="First_Name" > First_Name </label> &nbsp; &nbsp;
                                    </div>
                                    <div class="col-lg-6 col-md-6 col-sm-12 text-center text-lg-start text-md-start text-sm-center align-self-center  ">
                                        <OutlinedInput
                                            placeholder="Enter Your First_Name"
                                            type="text"
                                            name="First_Name"
                                            onChange={handleChange}
                                            onBlur={handleBlur}
                                            value={values.First_Name}
                                            style={{ color: "white" }}
                                        />
                                    </div>
                                </div>
                                <div class="row  errorrowht">
                                    <div class=" col-12 text-center     ">
                                        <div className="errors text-center">{errors.First_Name && touched.First_Name && errors.First_Name}</div>
                                    </div>
                                </div>

                                {/* Last_Name Input */}

                                <div class="row mt-4 rowht">
                                    <div class="col-lg-6 col-md-6 col-sm-12 text-center text-lg-end text-md-end text-sm-center align-self-center  ">
                                        <label for="Last_Name" > Last_Name </label>

                                    </div>
                                    <div class="col-lg-6 col-md-6 col-sm-12 text-center text-lg-start text-md-start text-sm-center  align-self-center  ">
                                        <OutlinedInput
                                            placeholder="Enter Your Last_Name"
                                            type="text"
                                            name="Last_Name"
                                            onChange={handleChange}
                                            onBlur={handleBlur}
                                            value={values.Last_Name}
                                            style={{ color: "white" }}
                                        />
                                    </div>
                                </div>
                                <div class="row  errorrowht">
                                    <div class=" col-12 text-center   ">
                                        <div className="errors text-center">  {errors.Last_Name && touched.Last_Name && errors.Last_Name}</div>
                                    </div>
                                </div>

                                {/* Email Input */}

                                <div class="row mt-4 rowht">
                                    <div class="col-lg-6 col-md-6 col-sm-12 text-center text-lg-end text-md-end text-sm-center align-self-center   ">
                                        <label for="email" > E_mail </label>
                                    </div>
                                    <div class="col-lg-6 col-md-6 col-sm-12 text-center text-lg-start text-md-start text-sm-center align-self-center  ">
                                        <OutlinedInput
                                            placeholder="Enter Your E_mail"
                                            type="email"
                                            name="E_mail"
                                            onChange={handleChange}
                                            onBlur={handleBlur}
                                            value={values.E_mail}
                                            style={{ color: "white" }}
                                        />
                                    </div>
                                </div>
                                <div class="row errorrowht">
                                    <div class="col-12 text-center   ">
                                        <div className="errors">  {errors.E_mail && touched.E_mail && errors.E_mail}</div>
                                    </div>
                                </div>

                                {/* Home & Register Button */}

                                <div class="row mt-3">
                                    <div class="col-lg-6 col-md-6 col-sm-12 text-center text-lg-end text-md-center text-sm-center">
                                        <button class="btn btn-outline-light" style={{ backgroundColor: "rgb(79, 6, 79)" }} type="button" onClick={() => Navigate("/")} disabled={isSubmitting}>
                                            Home
                                        </button>
                                    </div>
                                    <div class="col-lg-6 col-md-6 col-sm-12 text-center mb-4 mt-3 mt-lg-0 mt-md-0 mt-sm-3  text-lg-start text-md-center text-sm-center">
                                        <button class="btn btn-outline-light" style={{ backgroundColor: "rgb(79, 6, 79)" }} type="submit" disabled={isSubmitting}>
                                            Register
                                        </button>
                                    </div>
                                </div>
                            </form>
                        )}
                    </Formik>
                </div>
            </section>
        </>
    )
}