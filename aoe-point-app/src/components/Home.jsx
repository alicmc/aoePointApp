import { googleLogout } from "@react-oauth/google";
import { useNavigate } from "react-router-dom";

function Home() {
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
            <button onClick={handleLogout} >
                Logout
            </button>
        </>
    )
}

export default Home