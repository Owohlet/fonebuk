import { useNavigate, useSearchParams } from 'react-router-dom';
import React, { useState,useEffect} from 'react';
import axios from 'axios';


function Delete() {

    const [ contact, setContact ] = useState(null)
    const [ id, setId ] = useState(null)
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
                
                
                
            }
        ).catch(
            err => {       
                console.log(err)
            }
        )    
    },[]);

    const handle_delete =()=>{
        console.log("here")
        axios.delete("contacts/"+ id)
        .then(
            res => {    
                navigate("/contacts"); 
            }
        ).catch(
            err => {       
                console.log(err.response.data.errors)
                if (err.response.data.errors==="Signature has expired"){
                    localStorage.setItem('token', "")
                    localStorage.setItem('username',"")
                    navigate("/login")
                }
            }
        )
    }

  return (
    <div className='delete-container'>
        <h2 className='delete-header'>Are you sure you want to delete contact?</h2>
        {
            (contact) ? 
            <>
            <h3 className='delete-contact'>{contact["first-name"] + " " + contact["last-name"]}</h3>

            <div className='delete-actions'>
                <button onClick={() => navigate('/contacts' ) } className='delete new-contact'>Cancel</button>
                <button onClick={ handle_delete } className='delete show-back'>Delete</button>
            </div>
            </>
            : "" 
        }
    </div>
  )
}

export default Delete