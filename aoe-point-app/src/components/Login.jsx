
// needed for login/logout
import { GoogleLogin, googleLogout } from "@react-oauth/google";

// needed to transport to different page
import { useNavigate, useLocation } from "react-router-dom";



function Login() {
  const navigate = useNavigate(); // needed for changing locaiton in app
  const location = useLocation(); // needed to get current location in app

  return (
    <>
      <GoogleLogin

        // forces a rerender of google log in if user logs out
        key={location.key} 


        onSuccess={async (credentialResponse) => {
          
          // google token
          const googleToken = credentialResponse.credential;

          // send google token to backend
          const response = await fetch("http://localhost:4000/api/auth/google", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              token: googleToken
            })
          });

          const data = await response.json();
          console.log("\n data.authorized = " + data.authorized);
          if (data.authorized) {
            console.log("Navigating to Home");
            localStorage.setItem("authed", "true");
            navigate("/Home");
          } else {
            googleLogout();
            navigate("/Login");
          }

          
          
        }}
        onError={() => console.log("login failed")}
      />
    </>
  );
}

export default Login;
