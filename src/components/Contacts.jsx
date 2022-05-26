import React,{useEffect,useState} from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { Table,TableContainer, TableBody, TableHead, TableRow } from '@mui/material';
import Person from './Person'


function Contacts() {

    const navigate = useNavigate();
    const [contacts, setContacts] = useState([]);
    const getNewContact = ()=>{
        navigate("/contacts/new-contact");
    }

    useEffect(()=>{
        
        axios.get("contacts")
        .then(
            res => {
                console.log(res.data.data);
                setContacts(res.data.data);
            }
        ).catch(
            err => {       
                console.log(err)
            }
        )    
    },[]);

    return (
        <TableContainer>
            <div className='header-title'>
                <h2 className='title'>Konohagakure Contact list</h2>
                <button onClick={getNewContact} className='new-contact'>Add New contact</button>
            </div>
            <Table>
                <TableHead>
                    <TableRow>
                    <th>First Name</th>
                    <th>Last Name</th>
                    <th>Email</th>
                    <th>Phone Number</th>
                    <th>Created by</th>
                    <th colSpan={3}></th>
                    </TableRow>
                </TableHead>
                <TableBody>

                    { (contacts) ? 
                    contacts.map((contact)=>(
                        <Person 
                        first_name={contact["attributes"]["first-name"]}
                        last_name={contact["attributes"]["last-name"]}
                        email={contact["attributes"]["email"]}
                        phone_number={contact["attributes"]["phone-number"]}
                        created_by={contact["attributes"]["created-by"]}
                        id={contact["id"]}
                        key={contact["id"]}
                        />
                    ))
                    : ""
                
                }
                </TableBody>
            </Table>              
        </TableContainer>
    )
}

export default Contacts