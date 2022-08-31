import { useNavigate } from "react-router-dom";
import { useEffect } from "react";


// function used for login page

export function Login() {

    const Navigate = useNavigate()

    const small = 'quiztime.jpg';

    // useEffect used to clear history to avoid browser back button

    useEffect(() => {
        window.history.pushState(null, document.title, window.location.href);
        window.addEventListener('popstate', function (event) {
            window.history.pushState(null, document.title, window.location.href);
        })
    }, []);

    return (
        <>
            {/* Top-Grid */}

            <div class="landingpage" >
                <div class="container-fluid  " >
                    <div class="row">
                        <div class="col-lg-6 col-md-6 col-sm-12 text-center  d-md-table mx-auto my-auto  ">
                            <img src={small} srcSet={`${small} 300w, ${small} 768w, ${small} 1450w`}></img>
                        </div>

                        {/*Admin Login, User Login, New User Button */}

                        <div class="col-lg-3 col-md-3 col-sm-12  offset-lg-3 offset-md-3  text-center   
            d-md-table mx-auto my-auto ">

                            <div class="row">
                                <div >
                                    <button class="btn btn-info  text-wrap" onClick={() => Navigate("/adminlogin", { replace: true })}>Admin Login</button>
                                </div>
                            </div> <br></br>
                            <div class="row">
                                <div>
                                    <button class="button1  text-wrap " onClick={() => Navigate("/userlogin", { replace: true })}>User Login!</button>
                                </div>
                            </div> <br></br>
                            <div class="row">
                                <div>
                                    <button class="btn btn-info  text-wrap " onClick={() => Navigate("/register", { replace: true })}>New User </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}