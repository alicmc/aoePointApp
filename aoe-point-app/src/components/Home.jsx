import { googleLogout } from "@react-oauth/google";
import { useNavigate } from "react-router-dom";
import UploadButton from "./UploadButton";
import { useState } from "react";

function Home() {
  const [students, setStudents] = useState([]);
  const navigate = useNavigate();

  function handleLogout() {
    googleLogout();
    localStorage.setItem("authed", "false");
    navigate("/Login");
    console.log("clicked");
  }

  return (
    <>
      <p>Home Page</p>
      <button onClick={handleLogout}>Logout</button>
      <UploadButton setStudents={setStudents} />
    </>
  );
}

export default Home;
