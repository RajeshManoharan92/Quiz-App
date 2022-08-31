import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';



//Function for Quiz Start page

export function Quizstart() {

    const Navigate = useNavigate()

    // useEffect used to clear history to avoid browser back button

    useEffect(() => {
        window.history.pushState(null, document.title, window.location.href);
        window.addEventListener('popstate', function (event) {
            window.history.pushState(null, document.title, window.location.href);
        })
    }, []);

    return (
        <>
            {/* Log Out Button */}

            <div class="container-fluid">
                <div class="row">
                    <div class="col-lg-12 col-md-12 col-sm-12 text-end text-lg-end mt-3 mt-lg-3 mt-md-3 mt-sm-3">
                        <button class="btn btn-outline-light" onClick={() => Navigate('/')} >  Log Out </button>
                    </div>
                </div>

                {/* Top Gird */}

                <div class="row mt-3">
                    <div class="col-12">
                        <Box sx={{ flexGrow: 1 }}>
                            <AppBar position="static">
                                <Toolbar style={{ minHeight: "100px", mWidth: "100%" }} className="color">
                                    <Typography variant="h6" component="div" sx={{ flexGrow: 1 }} >
                                        <div className="fontstyle1">
                                            Instructions
                                        </div>
                                    </Typography>
                                </Toolbar>
                            </AppBar>
                        </Box>
                    </div>
                </div>
                <br></br>

                {/* Instruction card */}

                <div class="row mt-4">
                    <div class="col-lg-4 col-md-6 col-sm-12 offset-lg-4 offset-md-3">
                        <div class="card">
                            <div class="card-body">
                                <p class="card-text">1. You have 5 questions to answer</p>
                                <p class="card-text">2. Each question has 3 options</p>
                                <p class="card-text">3. You have 30 seconds to answer a question</p>
                                <p class="card-text">4. By default after 30 seconds automatically it move to next question</p>
                                <p class="card-text">5. Once you answered a question click on Next button to answer next question</p>
                                <p class="card-text">6. Don't Refresh the page</p>
                                <p class="card-text">7. If you clear with the above Instructions click on start button</p>
                                <div class=" text-center ">
                                    <button class="btn btn-outline-success" onClick={() => Navigate('/dashboard')} >  start </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}