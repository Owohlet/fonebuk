import { Link, useNavigate, useSearchParams } from 'react-router-dom';
import React, {useRef, useState,useEffect} from 'react';
import axios from 'axios';
import { FilledInput } from '@mui/material';

const Edit =()=> {

    const firstnameRef = useRef();
    const lastnameRef = useRef();
    const emailRef = useRef();
    const phonenoRef = useRef();
    const idRef = useRef();
    

    const [ apiError, setApiError ] = useState(null)
    const [ contact, setContact ] = useState([])
    // const[firdtName, setFirstNA]= useState(null)
    const navigate = useNavigate();

    let [searchParams, setSearchParams] = useSearchParams();
    
    

    const getContact = async () => {
        const requestOptions = {
            method: 'GET',
            headers: {authorization: localStorage.getItem('token')},
            redirect: 'follow'
        };
        
        await fetch("https://fonebuk.herokuapp.com/contacts/" +searchParams.get("id"), requestOptions)
            .then(response => response.json())
            .then(result => {
                console.log(result)
                console.log(result.data.attributes["first-name"])

                // setContact(state => [...state, result])
                setContact(result.data);
                console.log(contact.attributes["first-name"]);
                // console.log(contact["attributes"]["first-name"]);
            })
            .catch(error => console.log('error', error));
    }


    useEffect(()=>{

        getContact()
          
    },[]);

    const handleChange=(event)=> {
        this.setState({value: event.target.value});
    }

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
        // console.log(idRef)
        axios.put("contacts/"+ idRef.current.value, data,{
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
        <form className='content' onSubmit={handleSubmit}>
            <div className="sign-up-text">
                Update Contact
            </div>
            {(apiError) ? 
            apiError.map((error)=>(
                <p key={error} className='api-errors'>{error}</p>  
            )) 
            : ""}
            

            {(contact.attributes) ? 
            <>
            <div className="field">
                <span className='fa fa-user'></span>
                <input type="text" defaultValue={contact.attributes["first-name"]}  placeholder='First Name' ref={firstnameRef} required/>
                
            </div>
            <div className="field">
                <span className='fa fa-user'></span>
                <input type="text" defaultValue={contact.attributes["last-name"]} placeholder='Last Name' ref={lastnameRef} required/>
                
            </div>
            <div className="field">
                <span className='fa fa-user'></span>
                <input type="email" defaultValue={contact.attributes["email"]} placeholder='Email' ref={emailRef} required/>
                
            </div>
            <div className="field">
                <span className="fa fa-lock"></span>
                <input type="text" defaultValue={contact.attributes["phone-number"]} placeholder='Phone Number' ref={phonenoRef} required />
                
            </div>
            <input type="text" defaultValue={contact.id} hidden ref={idRef} />
            </> : ""
            }
            
            <button type='submit'>Update Contact</button>
            <p className='extra-actions'> <Link to={'/contacts'} reloadDocument={false} > Back</Link></p>
        </form>
    )
}

export default Edit