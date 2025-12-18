import { GoogleLogin } from "@react-oauth/google";
import { useNavigate } from "react-router-dom";

function Login() {
  console.log("My Client ID is:", import.meta.env.VITE_CLIENT_ID);
  //localStorage.setItem("authed", "false");
  const navigate = useNavigate();
  return (
    <>
      <GoogleLogin
        onSuccess={(credentialResponse) => {
          console.log(credentialResponse);
          localStorage.setItem("authed", "true");
          navigate("/home");
        }}
        onError={() => console.log("login failed")}
      />
    </>
  );
}

export default Login;
