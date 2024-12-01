// import React from "react";

// const Login = () => {
//   return (
//     <div style={{ display: "flex", flexDirection: "column", alignItems: "center", marginTop: "50px" }}>
//       <button
//         style={{
//           backgroundColor: "green",
//           color: "white",
//           padding: "10px 20px",
//           margin: "10px 0",
//           border: "none",
//           borderRadius: "5px",
//           fontSize: "16px",
//           cursor: "pointer",
//         }}
//         onClick={() => alert("Green button clicked!")}
//       >
//         Green Button
//       </button>
//       <button
//         style={{
//           backgroundColor: "yellow",
//           color: "black",
//           padding: "10px 20px",
//           margin: "10px 0",
//           border: "none",
//           borderRadius: "5px",
//           fontSize: "16px",
//           cursor: "pointer",
//         }}
//         onClick={() => alert("Yellow button clicked!")}
//       >
//         Yellow Button
//       </button>
//     </div>
//   );
// };

// export default Login;

// @ts-ignore
// @ts-nocheck

import React from "react";
import { useNavigate } from "react-router-dom";
import { useOkto } from "okto-sdk-react";
import { GoogleLogin } from "@react-oauth/google";

const Login = ({ setAuthToken, authToken, handleLogout }) => {

  console.log("LoginPage component rendered: ", authToken);
  const navigate = useNavigate();
  const { authenticate } = useOkto();

  const containerStyle = {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    padding: '20px',
    maxWidth: '800px',
    margin: '0 auto',
  };

  const handleGoogleLogin = async (credentialResponse) => {
    console.log("Google login response:", credentialResponse);
    const idToken = credentialResponse.credential;
    console.log("google idtoken: ", idToken);
    authenticate(idToken, async (authResponse, error) => {
      if (authResponse) {
        console.log("Authentication check: ", authResponse);
        setAuthToken(authResponse.auth_token);
        console.log("auth token received", authToken);
        navigate("/home");
      }
      if (error) {
        console.error("Authentication error:", error);
      }
    });
  };

  const onLogoutClick = () => {
    handleLogout(); // Clear the authToken
    navigate('/'); // Navigate back to the login page
  };

  return (
    <div style={containerStyle}>
      <h1>Login</h1>
      {!authToken ? (
        <GoogleLogin
          onSuccess={handleGoogleLogin}
          onError={(error) => {
            console.log("Login Failed", error);
          }}
          useOneTap
          promptMomentNotification={(notification) =>
            console.log("Prompt moment notification:", notification)
          }
        />
      ) : (
        <button onClick={onLogoutClick}>Authenticated, Logout</button>
      )}

    </div>
  );
}
export default Login;
