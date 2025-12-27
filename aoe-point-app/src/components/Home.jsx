import "./Home.css";
import { googleLogout } from "@react-oauth/google";
import { useNavigate } from "react-router-dom";
import UploadButton from "./UploadButton";
import { useState } from "react";
import { metRequirements } from "../util/miscUtil";
import { PointTable } from "../util/emailTemplates";
import { sendMidsemester } from "../util/email";
import { sendEndSemester } from "../util/email";

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

  async function handleMidSem() {
    handleEmails();
    console.log(students);
    students.map((student, index) => (
      sendMidsemester(student)
    ))
  }

  async function handleEndSem() {
    handleEmails();
    console.log(students);
    students.map((student, index) => (
      sendEndSemester(student)
    ))
  }

  return (
    <>
      <h1>Home Page</h1>

      <div className="wrapper">
        <UploadButton setStudents={setStudents} />

        {/* button below will use the sendMidsemesterCheckin(student)
        function from emails.jsx */}
        <button disabled={isDisabled} onClick={handleMidSem}>
          Send Mid Semester Emails
        </button>
        <button disabled={isDisabled} onClick={handleEndSem}>
          Send End Semester Emails
        </button>
      </div>

      <div className="logout-button">
        <button onClick={handleLogout}>Logout</button>
      </div>

    {/* tables with sister statuses */}
    <div className = "status-table">
      <h3>Sister Status</h3>

      <div className="wrapper" id="status-wrapper">

        {/* table listing active sisters */}
        <table>
          <thead>
            <tr>
              <th>Active Status</th>
            </tr>
          </thead>

          <tbody>
          {students
            .filter(student => metRequirements(student))
            .map((student, index) => (
              <tr key={index}>
                <td>{student.Student}</td>
              </tr>
            ))}
          </tbody>
        </table>

        {/* table listing passive restricted sisters */}
        <table>
          <thead>
            <tr>
              <th>Passive Restricted Status</th>
            </tr>
          </thead>
          <tbody>
            {students
              .filter(student => !metRequirements(student))
              .map((student, index) => (
                <tr key={index}>
                  <td>{student.Student}</td>
                </tr>
              ))}
          </tbody>
        </table>
      </div>
    </div>

    {/* tables with each sisters individual points */}
    <div className="point-tables">
      {students.length > 0 &&
        students.map((student, index) => (
          <div>
            <h3>
              {student["Student"]} has {!metRequirements(student) && "not"}{" "}
              met requirements
            </h3>
            <h3></h3>
            <PointTable key={index} student={student} />
          </div>
        ))}
    </div>
    </>
  );
}

export default Home;
