import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import { useAuth } from "../auth";


// Function used for Result page

export function Result() {

  // calling navigation function for navigation purpose

  const Navigate = useNavigate();

  // array to store fetched datas

  const [array, setarray] = useState([])

  const [user, setuser] = useState([])

  //using useEffect to load datas on page load

  useEffect(() => {
    username()
  }, []);

  const username = async () => {
    var response = await axios.post('http://localhost:3002/getuser', {
      email: auth.user
    })
    setuser(response.data.first_name)
  }

  var auth = useAuth()

  useEffect(
    () => {
      res();
    }, [])

  const res = async () => {
    var response = await axios.get('http://localhost:3002/getAnswerCount');
    setarray(response.data)

  }

  // useEffect used to clear history to avoid browser back button

  useEffect(() => {
    window.history.pushState(null, document.title, window.location.href);
    window.addEventListener('popstate', function (event) {
      window.history.pushState(null, document.title, window.location.href);
    })
  }, []);

  var arr = array.length - 1;

  return (
    <>

      {/* Contact Us, Log out  Button */}

      <div class="container-fluid">
        <div class="row mt-3">
          <div class="col-lg-2 col-md-6 col-sm-12 text-center">
            <button class="btn btn-outline-light" onClick={() => Navigate('/contactus')} >  Contact Us </button>
          </div>
          <div class="col-lg-2 col-md-6 offset-lg-8 col-sm-12 text-lg-end text-center text-md-center text-sm-center mt-sm-3 mt-lg-0 mt-md-0 mt-3">
            <button class="btn btn-outline-light" onClick={() => Navigate('/')} >  Log out </button>
          </div>
        </div>

        {/* Top Grid */}

        <div class="row mt-4">
          <div class="col-12">
            <Box sx={{ flexGrow: 1 }}>
              <AppBar position="static">
                <Toolbar style={{ minHeight: "12vw" }} className="color">
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

        {/* cards */}

        {array[arr] ? <>
          <div class="row  " style={{ marginTop: "5%", height: "125%" }}>
            <div class="col-lg-4 col-md-6 col-sm-12 offset-lg-1 text-center">
              <div class="card" style={{ height: "125%", backgroundColor: "rgb(61, 3, 61)", color: "white", border: "4px solid white" }} >
                <div class="card-body">
                  <h5 class="card-title" style={{ fontWeight: "bold" }}>Number of Answer Correct</h5>
                  <p class="card-text" style={{ fontSize: "450%", marginTop: "10%" }}>{array[arr].correctAnswerCount}</p>

                </div>
              </div>
            </div>
            <div class="col-lg-4 col-md-6 col-sm-12 offset-lg-2 mt-3 mt-md-0 mt-sm-5 mt-lg-0 text-center">
              <div class="card" style={{ height: "125%", backgroundColor: "rgb(61, 3, 61)", color: "white", border: "4px solid white" }}>
                <div class="card-body">
                  <h5 class="card-title" style={{ fontWeight: "bold" }}>Number of Questions You Answered</h5> <br></br><br></br>
                  <h1 class="card-text" style={{ fontSize: "450%" }}>{array[arr].questionAnswered}</h1>

                </div>
              </div>
            </div>
          </div>
        </> : <></>}

        {/* Bottom Grid */}

        <div class="row mt-5">
          <div class="col-12">
            <Box sx={{ flexGrow: 1 }} style={{ marginTop: "6%" }}>
              <AppBar position="static">
                <Toolbar style={{ height: "100px" }} className="color">
                  <Typography variant="h6" component="div" sx={{ flexGrow: 1 }} >
                    <div className="fontstyle3">
                      Copyright © Quiz 2022
                    </div>
                  </Typography>
                </Toolbar>
              </AppBar>
            </Box>
          </div>
        </div>
      </div>
    </>
  );
}
