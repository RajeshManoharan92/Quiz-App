import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import { Table } from 'react-bootstrap'

//Function for Enquiry Details

export function Enquirydetails() {
    const Navigate = useNavigate()

    const [array, setarray] = useState({ Product: [] })

    // using useEffect hooks to load data on page load

    useEffect(
        () => {
            result();
        }, [])

    var result = async () => {
        var response = await axios.get('http://localhost:3002/getcontactus')
        setarray({ Product: response.data })
    }

    // useEffect used to clear history to avoid browser back button

    useEffect(() => {
        window.history.pushState(null, document.title, window.location.href);
        window.addEventListener('popstate', function (event) {
            window.history.pushState(null, document.title, window.location.href);
        })
    }, []);

    //  function for delete

    const Delete = (_id) => {
        var result = window.confirm("Are you sure to delete?");
        if (result) {
            //Deleting data from table
            var response = axios.delete(`http://localhost:3002/deletecontactus/${_id}`)
            var Product = array.Product.filter((row) => row._id !== _id)
            setarray({ Product })
        }
    }

    return (
        <>

            {/* Admin Page Button */}

            <div class="container-fluid">
                <div class="row mt-3">
                    <div class="col-12 text-end">
                        <button class="btn btn-outline-light" onClick={() => Navigate('/admin')} >  Admin Page </button>
                    </div>
                </div>

                {/* Top Gird */}

                <div class="row mt-3">
                    <div class="col-12">
                        <Box sx={{ flexGrow: 1 }}>
                            <AppBar position="static">
                                <Toolbar style={{ minHeight: "200px" }} className="color">
                                    <Typography variant="h6" component="div" sx={{ flexGrow: 1 }} >
                                        <div className="fontstyle1">
                                            Customer Enquiry Details
                                        </div>
                                    </Typography>
                                </Toolbar>
                            </AppBar>
                        </Box>
                    </div>
                </div>
                <br></br>

                {/* Table */}

                <div class="row mt-2">
                    <div class="col-12 table-responsive text-center">
                        <Table striped bordered hover variant="light" border='1'>
                            <thead>
                                <tr>
                                    <th>Id</th>
                                    <th> User Name </th>
                                    <th> User Contact no. </th>
                                    <th> Question for Enquiry </th>
                                    <th> Actions </th>
                                </tr>
                            </thead>
                            <tbody>
                                {array.Product.map((row) => (
                                    <tr key={row.id}>
                                        <td></td>
                                        <td> {row.Username} </td>
                                        <td> {row.UserContactNo} </td>
                                        <td> {row.questionenquiry} </td>
                                        <td>
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