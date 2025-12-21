import './Login.css';
// needed for login/logout
import { GoogleLogin, googleLogout } from "@react-oauth/google";

// needed to transport to different page
import { useNavigate, useLocation } from "react-router-dom";



function Login() {
  const navigate = useNavigate(); // needed for changing locaiton in app
  const location = useLocation(); // needed to get current location in app

  return (
    <>
    <style>
      @import url('https://fonts.googleapis.com/css2?family=Dancing+Script:wght@400..700&family=Raleway:ital,wght@0,100..900;1,100..900&display=swap');
    </style>

    <div className= "body">
      <h1>Hi Miss Secretary</h1>
      <h2>AOE Point Calculator</h2>
      <div className = "google-container">
        <h3>Login Here</h3>
        <GoogleLogin

          theme = "filled_blue"
          size = "large"

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
      </div>

        {/* Below was created with https://www.shapedivider.app/ */}
        <div class="custom-shape-divider-bottom-1766276173">
          <svg data-name="Layer 1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 120" preserveAspectRatio="none">
              <path d="M321.39,56.44c58-10.79,114.16-30.13,172-41.86,82.39-16.72,168.19-17.73,250.45-.39C823.78,31,906.67,72,985.66,92.83c70.05,18.48,146.53,26.09,214.34,3V0H0V27.35A600.21,600.21,0,0,0,321.39,56.44Z" class="shape-fill"></path>
          </svg>
        </div>
      </div>
    </>
  );
}

export default Login;
