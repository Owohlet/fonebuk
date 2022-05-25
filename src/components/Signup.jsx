import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import React, {useRef, useState} from 'react'

export default function Signup() {
    const fullnameRef = useRef();
    const usernameRef = useRef();
    const emailRef = useRef();
    const passwordRef = useRef();
    const confirmPasswordRef = useRef();

    const [ apiError, setApiError ] = useState(null)
    const navigate = useNavigate();

    const handleSubmit =(e)=>{
        e.preventDefault()
        const data = {
            fullname: fullnameRef.current.value,
            username: usernameRef.current.value,
            email: emailRef.current.value,
            password: passwordRef.current.value,
            password_confirmation: confirmPasswordRef.current.value
        }
        const headers = {
            "Content-Type": "application/json"
        }
        // console.log(data)
        axios.post("users", data,{
            headers: headers
        }).then(
            res => {
                navigate("/login");
            }
        ).catch(
            err => {
                setApiError(err.response.data.errors)
                console.log(err.response.data.errors)
            }
        )
    }
    
  return (
    <div>
        
        <form className='content' onSubmit={handleSubmit}>
            <div className="sign-up-text">
                Sign up
            </div>
            {(apiError) ? 
            apiError.map((error)=>(
                <p key={error["detail"]} className='api-errors'>{error["detail"]}</p>  
            )) 
            : ""}
            <div className="field">
                <span className='fa fa-user'></span>
                <input type="text" placeholder='Fullname' ref={fullnameRef} required/>
                
            </div>
            <div className="field">
                <span className='fa fa-user'></span>
                <input type="text" placeholder='Username' ref={usernameRef} required/>
                
            </div>
            <div className="field">
                <span className='fa fa-user'></span>
                <input type="email" placeholder='Email' ref={emailRef} required/>
                
            </div>
            <div className="field">
                <span className="fa fa-lock"></span>
                <input type="password" placeholder='Password' ref={passwordRef} required />
                
            </div>
            <div className="field">
                <span className="fa fa-lock"></span>
                <input type="password" placeholder='Confirm Password' ref={confirmPasswordRef} required />
                
            </div>
            <button type='submit'>Sign Up</button>
            
            <p className='extra-actions'>Already have an account? <Link to={'/login'}> Log In</Link></p>
        </form> 
    </div>
  )
}
