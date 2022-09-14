import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";
import { Formik } from "formik";
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import OutlinedInput from '@mui/material/OutlinedInput'
import { useAuth } from "../auth";

// function used for User verification log-in

export function Userlogin() {

    const Navigate = useNavigate();

    const [formvalue, setformvalue] = useState({
        E_mail: "",
        Password:""

    })

    // function for protected routed

    const [user, setUser] = useState("")
   
    const auth = useAuth()

    // useEffect used to clear history to avoid browser back button

    useEffect(() => {
        window.history.pushState(null, document.title, window.location.href);
        window.addEventListener('popstate', function (event) {
            window.history.pushState(null, document.title, window.location.href);
        })
    }, []);

    // Formik error validation

    const validate = (formData) => {
        var errors = {};
        if (formData.E_mail == "") errors.E_mail = "E_mail is Required";
        if (formData.Role == "") errors.Role = "Role is Required";
        if (formData.Password == "") errors.Password = "Password is Required";

        return errors;
    }

    // On Submit Function

    const Login = async (formData) => {
        var response = await axios.post("http://localhost:3002/login", {
            Role:"user",
            email: formData.E_mail,
            password:formData.Password
        })

        if (response.data.message == "UserLoggedin") {
            auth.login(user)
            await localStorage.setItem("username", response.data.user.first_name)
            document.cookie = "token=" + response.data.user.token

            alert("User - Verification Success")
            Navigate('/Quizstart', { replace: true })
        }

      else  if (response.data === "Invalid") {
            alert("Invalid creditional")
        }
    }

    return (
        <>
            {/* Top Grid */}

            <div class="container-fluid">
                <div class="row">
                    <div class="col-md-12 text-center mt-5 mt-lg-5 mt-md-5 mt-sm-5 align-self-center ">
                        <Box sx={{ flexGrow: 1 }}>
                            <AppBar position="static">
                                <Toolbar style={{ minHeight: "12vw" }} className="color">
                                    <Typography variant="h6" component="div" sx={{ flexGrow: 1 }} >
                                        <div className="fontstyle1">
                                            User - Log In
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
                    onSubmit={(formData) => Login(formData)}
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

                            {/* E-mail Input */}

                            <div class="row rowht mt-5">
                                <div class="col-lg-12 col-md-12 col-sm-12 text-center mt-lg-0 mt-md-5 mt-sm-5">
                                    <label for="email" > E-mail Id </label> &nbsp;&nbsp;&nbsp;
                                    <OutlinedInput
                                        placeholder="Enter Your Email-Id"
                                        type="email"
                                        name="E_mail"
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                        value={values.E_mail}
                                        onKeyUp={(e) => setUser(e.target.value)}
                                        style={{ color: "white" }}
                                    />    </div>
                            </div>
                            <div class="row errorrowht">
                                <div class="col-lg-12 col-md-12 col-sm-12 text-center mt-lg-0 mt-md-5 mt-sm-5">
                                    <div className="errors ">{errors.E_mail && touched.E_mail && errors.E_mail}</div>
                                </div>
                            </div>
                            <br></br>

                             {/* Password Input */}

                             <div class="row rowht mt-5">
                                <div class="col-lg-12 col-md-12 col-sm-12 text-center mt-lg-0 mt-md-5 mt-sm-5">
                                    <label for="Password" > Password </label> &nbsp;&nbsp;&nbsp;
                                    <OutlinedInput
                                        placeholder="Enter Your Password"
                                        type="password"
                                        name="Password"
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                        value={values.Password}
                                        onKeyUp={(e) => setUser(e.target.value)}
                                        style={{ color: "white" }}
                                    />    </div>
                            </div>
                            <div class="row errorrowht">
                                <div class="col-lg-12 col-md-12 col-sm-12 text-center mt-lg-0 mt-md-5 mt-sm-5">
                                    <div className="errors ">{errors.Password && touched.Password && errors.Password}</div>
                                </div>
                            </div>
                            <br></br>

                            {/* Home & Login Button */}

                            <div class="row rowheight mt-5">
                                <div class="col-lg-4 col-md-4 col-sm-12 align-self-center text-center  mt-lg-0 mt-md-3 mt-sm-5 ">
                                    <button class="btn btn-outline-light " style={{ backgroundColor: "rgb(79, 6, 79)" }} type="button" onClick={() => Navigate("/")} disabled={isSubmitting}>
                                        Home
                                    </button>
                                </div> <br></br>
                                <div class="col-lg-4 col-md-4 col-sm-12  align-self-center text-center mt-4 mt-lg-0 mt-md-3 mt-sm-5 ">
                                    <button class="btn btn-outline-light  " style={{ backgroundColor: "rgb(79, 6, 79)" }} type="submit" disabled={isSubmitting}>
                                        Log In
                                    </button>
                                </div> <br></br>
                                <div class="col-lg-4 col-md-4 col-sm-12 align-self-center text-center  mt-lg-0 mt-md-3 mt-sm-5 ">
                                        <button class="btn btn-outline-light  " style={{ backgroundColor: "rgb(79, 6, 79)" }} type="button" onClick={() => Navigate('/forgotpass', { replace: true })}>
                                            Forgot password
                                        </button>
                                    </div>
                            </div>
                        </form>
                    )}
                </Formik>
            </div>
        </>
    )
}