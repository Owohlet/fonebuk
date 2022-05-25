import React from "react";
import { useState, useEffect } from "react";
import './App.css';


import Signup from "./components/Signup";
import LogIn from "./components/Login";
import Contacts from "./components/Contacts";
import {Link, Routes, Route, useNavigate } from "react-router-dom";
import NewContact from "./components/NewContact";
import Edit from "./components/Edit";
import Show from "./components/Show";
import Delete from "./components/Delete";



const App=()=> {
    
    // autheticate if there's a logged in user
        //  set the current user variable
        //  send him to contacts
    // if false send him to sign in
    const navigate = useNavigate();
    
    const [user, setUser] = useState([]);

    

    useEffect(()=>{
    
        if (localStorage.getItem('token')){
            
            // console.log(localStorage.getItem('token'));
            setUser(localStorage.getItem('username'))
            navigate("/contacts")
           
        }else{
            setUser(false);
            navigate("/login")
           
        }
    
        
    },[]);

    const handle_signout = () =>{
        console.log("signout")
        localStorage.setItem('token', "")
        localStorage.setItem('username',"")
        navigate("/login")
    }
    


    return (
        
            <div className="app">
                <h1>FoneBuk</h1>
                <br></br>
                {(user) ?
                    <div className="sign-actions">
                    <p className="signed-in-user">Welcome, {user}</p> 
                    <a className="sign-out-user" onClick={handle_signout} >Sign out</a>
                    </div>
                : ""}
                <p></p>
                <Routes>
                    <Route path="contacts" element={<Contacts/>} />  
                    <Route path="signup" element={<Signup/>} />  
                    <Route path="login" element={<LogIn/>} />  
                    <Route path="contacts/new-contact" element={<NewContact/>} />
                    <Route path="contact/edit/" element={<Edit/>} />
                    <Route path="contact/delete/" element={<Delete/>} />
                    <Route path="contact/" element={<Show/>} />
                </Routes>
                
            </div>
    )
 
}

export default App;