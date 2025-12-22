import './Home.css';
import { googleLogout } from "@react-oauth/google";
import { useNavigate } from "react-router-dom";
import UploadButton from "./UploadButton";
import React, { useState } from 'react'



function Home() {
  const [isDisabled, setIsDisabled] = useState(false)
  const navigate = useNavigate();

  function handleLogout() {
    googleLogout();
    localStorage.setItem("authed", "false");
    navigate("/Login");
    console.log("clicked");
  }

  // Timeout send emails button to avoid spamming inboxes
  function handleEmails() {
      if (!isDisabled) {
        console.log("I am not disbaled");
        // send mid sem emails
        setIsDisabled(true);
        console.log("I am disbaled");

        // wait for 3 seconds then reset button
        setTimeout( ()=>{
          setIsDisabled(false);
        }, 3000);
      }
  }


  return (
    <>
      <h1>Home Page</h1>
      
      <div className = "wrapper">
        <UploadButton />

        {/* button below will use the sendMidsemesterCheckin(student)
        function from emails.jsx */}
        <button disabled = {isDisabled} onClick = {handleEmails} >Send Mid Semester Emails</button>
        <button disabled = {isDisabled} onClick = {handleEmails} >Send End Semester Emails</button>
      </div>

      <div className = "logout-button">
        <button onClick={handleLogout}>Logout</button>
      </div>
      
      
    </>
  );
}

export default Home;
