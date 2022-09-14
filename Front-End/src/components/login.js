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
                        <div class="col-lg-6 col-md-6 col-sm-12 text-center    ">
                            <img src={small} class="img-fluid"></img>
                        </div>

                        {/*Admin Login, User Login, New User Button */}

                        <div class="col-lg-6 col-md-6 col-sm-12 text-center align-self-center">

                            <div class="row justify-content-center">
                                <div  >
                                    <button class="btn btn-info  text-wrap " onClick={() => Navigate("/adminlogin", { replace: true })}>Admin Login</button>
                                </div>
                            </div> <br></br>
                            <div class="row justify-content-center">
                                <div>
                                    <button class="button1  text-wrap " onClick={() => Navigate("/userlogin", { replace: true })}>User Login!</button>
                                </div>
                            </div> <br></br>
                            <div class="row justify-content-center">
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