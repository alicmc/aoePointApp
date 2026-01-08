import "./Home.css";
import { googleLogout } from "@react-oauth/google";
import { useNavigate } from "react-router-dom";
import { UploadButton } from "./UploadButton";
import { useState } from "react";
import { PointTable } from "../util/emailTemplates";
import { sendMidsemester } from "../util/email";
import { sendEndSemester } from "../util/email";
import { StatusTables } from "./StatusTables";
import { metRequirements } from "../util/miscUtil";

function Home() {
  const [isDisabled, setIsDisabled] = useState(false);
  const [students, setStudents] = useState([]);
  const [checked, setChecked] = useState([]);
  const navigate = useNavigate();

  // handle change for each student checkbox
  const handleCheck = (event, index) => {
    setChecked((prev) => {
      const next = [...prev];
      next[index] = event.target.checked;
      return next;
    });
  };

  // handle change for the select all checkbox
  const handleSelectAll = (event) => {
    let newChecked = new Array(checked.length);
    newChecked.fill(event.target.checked);
    setChecked(newChecked);
    // console.log(newChecked);
  };

  function handleLogout() {
    googleLogout();
    localStorage.setItem("authed", "false");
    navigate("/Login");
    console.log("clicked");
  }

  // Timeout send emails button to avoid spamming inboxes
  async function handleEmails() {
    if (!isDisabled) {
      console.log("I am not disabled");
      // send mid sem emails
      setIsDisabled(true);
      console.log("I am disbaled");

      // wait for 3 seconds then reset button
      setTimeout(() => {
        setIsDisabled(false);
      }, 3000);
    }
  }

  async function handleMidSem() {
    handleEmails();
    //console.log(students);
    students.forEach((student, index) => {
      if (checked[index]) {
        sendMidsemester(student);
      }
    });
  }

  async function handleEndSem() {
    handleEmails();
    // console.log(students);
    students.forEach((student, index) => {
      if (checked[index]) {
        sendEndSemester(student);
      }
    });
  }

  return (
    <>
      <h1>Home Page</h1>
      <div className="wrapper">
        <UploadButton setStudents={setStudents} setChecked={setChecked} />

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
      <StatusTables students={students} />

      {/* checkbox to select/deselect all */}
      <div className = "select-all">
        <label>
          <input
            type="checkbox"
            defaultChecked
            onChange={(event) => handleSelectAll(event)}
          />
          Select all
        </label>
      </div>
      

      {/* tables with each sisters individual points */}
      <div className="point-tables">
        {students.length > 0 &&
          students.map((student, index) => (
            <div key={index}>
              <h3>
                {student["Student"]} has {!metRequirements(student) && "not"}{" "}
                met requirements
              </h3>
              <label>
                <input
                  type="checkbox"
                  checked={checked[index]}
                  onChange={(event) => handleCheck(event, index)}
                />
                Include in emails
              </label>
              <h3></h3>
              <PointTable student={student} />
            </div>
          ))}
      </div>
    </>
  );
}

export default Home;
