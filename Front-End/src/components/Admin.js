import { useNavigate } from "react-router-dom";
import { useEffect } from "react";


// Function for Admin Page

export function Admin() {

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
            <div class="adminpage">

                {/* Log Out Button */}

                <div class="container-fluid ">
                    <div class="row mt-4">
                        <div class="col-12 text-end">
                            <button class="btn btn-outline-light" onClick={() => Navigate('/')} >  Log Out </button>
                        </div>
                    </div>

                    {/* Top Grid */}

                    <div class="row mt-4 ">
                        <div class="col-lg-7 col-md-12 col-sm-12 text-lg-start text-md-center text-sm-center text-center ms-lg-5 text-wrap">
                            <div className="fontstyle1">
                                Welcome Admin
                            </div>
                        </div>
                    </div>

                    {/* Create Question, Enquiry Details Buttons */}

                    <div class="row mt-5 ">
                        <div class="col-lg-4 col-md-12 col-sm-12 text-center ms-lg-5 " style={{ marginTop: "2%" }}>
                            <button class="btn btn-info " onClick={() => Navigate("/listofquestion")}  > Create Question </button>
                        </div>
                    </div>
                    <div class="row mt-5 ">
                        <div class="col-lg-4 col-md-12 col-sm-12 text-center ms-lg-5">
                            <button class="btn btn-info " onClick={() => Navigate("/Enquirydetails")}  > Enquiry Details </button>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}