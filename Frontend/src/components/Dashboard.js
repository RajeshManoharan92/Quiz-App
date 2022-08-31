import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import { useAuth } from "../auth"


// Function used for Dashboard Page

export function Dashboard() {

    const Navigate = useNavigate();
    // to store datas array used

    const [array, setarray] = useState([])

    const [user, setuser] = useState([])

    // to store cartvalue  

    const [selectedvalue, setselectedvalue] = useState("")

    // to store array index value

    const [index, setindex] = useState(0)

    // to store correct answer count

    const [answercount, setanswercount] = useState(0)

    // to store remaining question count

    const [remainingcount, setremainingcount] = useState(5)

    // Timer

    const [seconds, setseconds] = useState(30)
    const [minutes, setminutes] = useState(0)

    // using useEffect to get data on page load

    useEffect(() => {
        username()
    }, []);

    const username = async () => {
        var response = await axios.post('http://localhost:3002/getuser',{
            email:auth.user
        })
        setuser(response.data.first_name)
    }


    useEffect(() => {
        data()
    }, []);

    const data = async () => {
        var response = await axios.get('http://localhost:3002/getQuestion')
        setarray(response.data)
    }

var auth = useAuth()


    var timer;

    // useEffect used to start the timer on page load

    useEffect(
        () => {
            if (array[index]) {
                timer = setInterval(() => {
                    setseconds(seconds - 1)
                    if (seconds == 0) {
                        setindex(index + 1)
                        setseconds(30)
                        setremainingcount(remainingcount - 1)
                    }
                }, 1000);
                return () => clearInterval(timer)
            }
        })

    // useEffect used to clear history to avoid browser back button

    useEffect(() => {
        window.history.pushState(null, document.title, window.location.href);
        window.addEventListener('popstate', function (event) {
            window.history.pushState(null, document.title, window.location.href);
        })
    }, []);

    // function for setting the selected value form radio button

    const handleselect = (value) => {
        setselectedvalue(value)
    }

    // function for comparing the selected value and the answer on clicking next button

    const handlecompare = (ans) => {
        if (ans == selectedvalue) {
            setanswercount(answercount + 1)
            setindex(index + 1)
            setremainingcount(remainingcount - 1)
            setseconds(30)
            document.getElementById('radio').checked = false;
        }
        else {
            setindex(index + 1)
            setremainingcount(remainingcount - 1)
            setseconds(30)
            document.getElementById('radio').checked = false;
        }
    }

    // function for posting the correct answer count and no of question answer in database

    const result = async () => {
        var response = await axios.post("http://localhost:3002/postAnswerCount", {
            correctAnswerCount: answercount,
            questionAnswered: 5 - remainingcount
        })
        Navigate("/cart")
    };

    return (
        <>
            <div class="container-fluid">

                {array[index] ?
                    <>
                        {/* Top Grid */}

                        <div class="row mt-5">
                            <div class="col-12">
                                <Box sx={{ flexGrow: 1 }}>
                                    <AppBar position="static">
                                        <Toolbar style={{ minHeight: "100px" }} className="color">
                                            <Typography variant="h6" component="div" sx={{ flexGrow: 1 }} >
                                                <div className="fontstyle1">
                                                    Welcome {user} <br></br>
                                                </div>
                                                <div className="fontstyle2">
                                                    Check Your Knowledge here...
                                                </div>
                                            </Typography>
                                        </Toolbar>
                                    </AppBar>
                                </Box>
                            </div>
                        </div>

                        <br></br>

                        {/* Time Remaining Card */}

                        <div class="row mt-5">
                            <div class="col-lg-3 col-md-12 col-sm-12 ms-lg-5 text-center align-self-center">
                                <div class="card" style={{ height: "100%", backgroundColor: "rgb(61, 3, 61)", color: "white", border: "2px solid white" }}>
                                    <div class="card-body">
                                        <h5 class="card-title">Time Remaining</h5>
                                        <h1 class="card-text">{minutes < 10 ? "0" + minutes : minutes}:{seconds < 10 ? "0" + seconds : seconds} </h1>
                                    </div>
                                </div>
                            </div>

                            {/* Question Card */}

                            <div class="col-lg-5 col-md-12 col-sm-12  ms-lg-3 ">
                                <div class="card" style={{ height: "100%", backgroundColor: "rgb(165, 161, 165)", border: "10px solid white" }} >
                                    <div class="card-body">
                                        <div className="fontstyle3">
                                            {array[index]?.Question}
                                        </div>
                                        <div class="form-check mt-4 fontstyle4 " onClick={() => handleselect(array[index].option1)}>
                                            <input class="form-check-input " type="radio" name="flexRadioDefault" id="radio" value={array[index]?.option1} />
                                            <label class="form-check-label fontstyle4 " for="flexRadioDefault1">
                                                {array[index]?.option1}
                                            </label>
                                        </div>
                                        <div class="form-check mt-4 fontstyle4" onClick={() => handleselect(array[index].option2)}>
                                            <input class="form-check-input" type="radio" name="flexRadioDefault" id="radio" value={array[index]?.option2} />
                                            <label class="form-check-label fontstyle4" for="flexRadioDefault2">
                                                {array[index]?.option2}
                                            </label>
                                        </div>
                                        <div class="form-check mt-4 fontstyle4" onClick={() => handleselect(array[index].option3)}>
                                            <input class="form-check-input" type="radio" name="flexRadioDefault" id="radio" value={array[index]?.option3} />
                                            <label class="form-check-label fontstyle4" for="flexRadioDefault2">
                                                {array[index]?.option3}
                                            </label>
                                        </div>
                                        {/* Next button */}

                                        <br></br>
                                        <div className="Button mt-4 text-center" >
                                            <button onClick={() => handlecompare(array[index]?.Answer)} id='B1' name="Atomos" class="btn btn-outline-light"  > Next ></button>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Remaining Questions Card */}

                            <div class="col-lg-3 col-md-12 col-sm-12  ms-lg-3 text-center  align-self-center ">
                                <div class="card" style={{ height: "100%", backgroundColor: "rgb(61, 3, 61)", color: "white", border: "2px solid white" }}>
                                    <div class="card-body ">
                                        <h5 class="card-title">Remaining Questions</h5>
                                        <h1 class="card-text " >{remainingcount}</h1>

                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Bottom Grid */}

                        <div class="row " >
                            <div class="col-12">
                                <Box sx={{ flexGrow: 1 }} style={{ marginTop: "5%" }}>
                                    <AppBar position="static">
                                        <Toolbar style={{ height: "100px" }} className="color">
                                            <Typography variant="h6" component="div" sx={{ flexGrow: 1 }} >
                                                <div className="fontstyle2">
                                                    Copyright © Product Rental Website 2022
                                                </div>
                                            </Typography>
                                        </Toolbar>
                                    </AppBar>
                                </Box>
                            </div>
                        </div>
                    </> : <>

                        {/* Top Grid */}

                        <div class="container-fluid">
                            <div class="row mt-5">
                                <div class="col-12">
                                    <Box sx={{ flexGrow: 1 }}>
                                        <AppBar position="static">
                                            <Toolbar style={{ minHeight: "100px" }} className="color">
                                                <Typography variant="h6" component="div" sx={{ flexGrow: 1 }} >
                                                    <div className="fontstyle1">
                                                        Congrats {user}...
                                                    </div>
                                                </Typography>
                                            </Toolbar>
                                        </AppBar>
                                    </Box>
                                </div>
                            </div>
                            <br></br>

                            <div class="row">
                                <div class="col-12 fontstyle1 text-center mt-3">
                                    <span>You Succesfully Completed the Quiz...</span>
                                </div>
                            </div>

                            {/* Click Here to get your result Button */}

                            <div class="row">
                                <div class="col-lg-12 col-md-12 col-sm-12 mt-5 text-center" >
                                    <button class="btn btn-outline-light text-nowrap finishbtn" style={{ marginTop: "5%" }} onClick={() => result()} > Click Here to get your result </button>
                                </div>
                            </div>
                            <br></br>

                            {/* Bottom Grid */}
                            <div class="row mt-5" >
                                <div class="col-12">
                                    <Box sx={{ flexGrow: 1 }} style={{ marginTop: "7%" }}>
                                        <AppBar position="static">
                                            <Toolbar style={{ height: "100px" }} className="color">
                                                <Typography variant="h6" component="div" sx={{ flexGrow: 1 }} >
                                                    <div className="fontstyle2">
                                                        Copyright © Product Rental Website 2022
                                                    </div>
                                                </Typography>
                                            </Toolbar>
                                        </AppBar>
                                    </Box>
                                </div>
                            </div>
                        </div>
                    </>
                }
            </div>
        </>
    );
}