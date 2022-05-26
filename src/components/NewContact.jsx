import { Link, useNavigate } from 'react-router-dom';
import React, {useRef, useState} from 'react';
import axios from 'axios';

function NewContact() {

    const firstnameRef = useRef();
    const lastnameRef = useRef();
    const emailRef = useRef();
    const phonenoRef = useRef();
    

    const [ apiError, setApiError ] = useState(null)
    const navigate = useNavigate();

    const handleSubmit =(e)=>{
        e.preventDefault()
        const data = {
            first_name: firstnameRef.current.value,
            last_name: lastnameRef.current.value,
            email: emailRef.current.value,
            phone_number: phonenoRef.current.value,
        }
        const headers = {
            "Content-Type": "application/json"
        }
        // console.log(data)
        axios.post("contacts", data,{
            headers: headers
        }).then(
            res => {
                navigate("/contacts");
            }
        ).catch(
            err => {
                setApiError(err.response.data.errors)
                console.log(apiError)
            }
        )
    }


  return (
    <div>
        <form className='content' onSubmit={handleSubmit}>
            <div className="sign-up-text">
                Create New Contact
            </div>
            {(apiError) ? 
            apiError.map((error)=>(
                <p key={error["detail"]} className='api-errors'>{error}</p>  
            )) 
            : ""}
            <div className="field">
                <span className='fa fa-user'></span>
                <input type="text" placeholder='First Name' ref={firstnameRef} required/>
                
            </div>
            <div className="field">
                <span className='fa fa-user'></span>
                <input type="text" placeholder='Last Name' ref={lastnameRef} required/>
                
            </div>
            <div className="field">
                <span className='fa fa-user'></span>
                <input type="email" placeholder='Email' ref={emailRef} required/>
                
            </div>
            <div className="field">
                <span className="fa fa-lock"></span>
                <input type="text" placeholder='Phone Number' ref={phonenoRef} required />
                
            </div>
            
            <button type='submit'>Create Contact</button>
            <p className='extra-actions'> <Link to={'/contacts'} reloadDocument={false} > Back</Link></p>
        </form>
    </div>
  )
}

export default NewContact