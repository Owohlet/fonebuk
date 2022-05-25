import { useNavigate, useSearchParams } from 'react-router-dom';
import React, { useState,useEffect} from 'react';
import { Table,TableContainer, TableBody, TableHead, TableRow } from '@mui/material';
import axios from 'axios';
import History from './History';

function Show() {

    const [ contact, setContact ] = useState(null)
    const [ id, setId ] = useState(null)
    const [ histories, setHistories ] = useState(null)
    const navigate = useNavigate();

    let [searchParams, setSearchParams] = useSearchParams();

    useEffect(()=>{
        console.log("The id is: "+searchParams.get("id"))
        axios.get("contacts/"+ searchParams.get("id"))
        .then(
            res => {
                res = JSON.parse(JSON.stringify(res))
                console.log(res.data.included);
                setContact(res.data.data["attributes"]);
                setId(res.data.data["id"]);
                setHistories(res.data.included)
                
                
            }
        ).catch(
            err => {       
                console.log(err)
            }
        )    
    },[]);




  return (
    <TableContainer>
        {(contact) ? 
            <div className='header-title'>
                <div className='contactCard'>
                    <h3>First Name: <span className='contact-attribute'>{contact["first-name"]}</span> </h3>
                    <h3>Last Name: <span className='contact-attribute'>{contact["last-name"]}</span> </h3>
                    <h3>Email: <span className='contact-attribute'>{contact["email"]}</span> </h3>
                    <h3>Phone Number: <span className='contact-attribute'>{contact["phone-number"]}</span> </h3>
                </div>



                <button onClick={() => navigate('/contacts') } className='show-back'>Back</button>
                <button onClick={() => navigate('/contact/edit/?id=' + id) } className='new-contact'>Update</button>
            </div>
            :""
        }
            <h2 className='history-header'>Contact update history</h2>
            <Table>
                <TableHead>
                    <TableRow>
                    <th>First Name</th>
                    <th>Last Name</th>
                    <th>Email</th>
                    <th>Phone Number</th>
                    <th>Updated by</th>
                    <th>Date</th>
                    </TableRow>
                </TableHead>
                <TableBody>

                    { (histories) ? 
                        histories.map((history)=>(
                            <History 
                            first_name={history["attributes"]["first-name"]}
                            last_name={history["attributes"]["last-name"]}
                            email={history["attributes"]["email"]}
                            phone_number={history["attributes"]["phone-number"]}
                            updated_by={history["attributes"]["updated-by"]}
                            date={history["attributes"]["created-at"]}
                            id={history["id"]}
                            key={history["id"]}
                            />
                        )) : ""
                    }
                </TableBody>
            </Table>              
        </TableContainer>
  )
}

export default Show