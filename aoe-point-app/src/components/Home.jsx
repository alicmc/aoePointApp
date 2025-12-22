import "./Home.css";
import { googleLogout } from "@react-oauth/google";
import { useNavigate } from "react-router-dom";
import UploadButton from "./UploadButton";
import React, { useState } from "react";
import { isAlphaNumeric } from "../util/miscUtil";
import { PointTable } from "../util/emailTemplates";
import { sendMidsemester } from "../util/email";

function Home() {
  const [isDisabled, setIsDisabled] = useState(false);
  const [students, setStudents] = useState([]);
  const navigate = useNavigate();

  function handleLogout() {
    googleLogout();
    localStorage.setItem("authed", "false");
    navigate("/Login");
    console.log("clicked");
  }

  // Timeout send emails button to avoid spamming inboxes
  async function handleEmails() {
    if (!isDisabled) {
      console.log("I am not disbaled");
      // send mid sem emails
      setIsDisabled(true);
      console.log("I am disbaled");

      // wait for 3 seconds then reset button
      setTimeout(() => {
        setIsDisabled(false);
      }, 3000);
    }

    // this works!
    // i need to set up the email template for the endsemester ones
    // for (const student of students) {
    //   await sendMidsemester(student);
    //   await new Promise((r) => setTimeout(r, 1200)); // 1–2s delay
    // }
  }

  return (
    <>
      <h1>Home Page</h1>

      <div className="wrapper">
        <UploadButton setStudents={setStudents} />

        {/* button below will use the sendMidsemesterCheckin(student)
        function from emails.jsx */}
        <button disabled={isDisabled} onClick={handleEmails}>
          Send Mid Semester Emails
        </button>
        <button disabled={isDisabled} onClick={handleEmails}>
          Send End Semester Emails
        </button>
      </div>

      <div className="logout-button">
        <button onClick={handleLogout}>Logout</button>
      </div>

      <div className="wrapper">
        {students.length > 0 &&
          students.map((student, index) => (
            <div>
              <h3>{student["Student"]}</h3>
              <PointTable key={index} student={student} />
            </div>
          ))}
      </div>
    </>
  );
}

export default Home;
