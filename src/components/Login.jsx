import { Link, useNavigate } from 'react-router-dom';
import React, {useRef, useState} from 'react'
import axios from 'axios';

export default function LogIn() {
    const emailRef = useRef();
    const passwordRef = useRef();

    const [ apiError, setApiError ] = useState(null);
    const navigate = useNavigate();

    const handleSubmit =(e)=>{
        e.preventDefault()
        const data = {
            email: emailRef.current.value,
            password: passwordRef.current.value,
        }
        const headers = {
            "Content-Type": "application/json"
        }
        // console.log(data)
        axios.post("auth/login", data,{
            headers: headers
        }).then(
            res => {
                
                console.log(res);
                localStorage.setItem('token', res.data.token)
                localStorage.setItem('username',res.data.username)
                navigate("/contacts");
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
                Log In
            </div>
            {(apiError) ? 
            apiError.map((error)=>(
                <p key={error["detail"]} className='api-errors'>{error["detail"]}</p>  
            )) 
            : ""}
            
            <div className="field">
                <span className='fa fa-user'></span>
                <input type="email" placeholder='Email' ref={emailRef} required/>
                
            </div>
            <div className="field">
                <span className="fa fa-lock"></span>
                <input type="password" placeholder='Password' ref={passwordRef} required />
                
            </div>
            
            <button>Log in</button>
            <p className='extra-actions'>Don't have an account? <Link to={'/signup'}> Sign Up </Link></p>
        </form> 
    </div>
  )
}
