import { useNavigate } from "react-router-dom";

export default function Login() {
  const navigate = useNavigate();

  return (
    <div className="login-container">
      <div className="login-page item-01">
        <button onClick={() => navigate("/")} className="login-backButton">
          Back to Home
        </button>
        <h1>Welcome Back</h1>
        <br></br>
        <br></br>
        <p>Dont have an account? Sign up instead</p>
        <button className="noAccountButton" onClick={() => navigate("/signup")}>
          Sign Up
        </button>
      </div>
      <div className="login-form item-02">
        <form action="#" method="post">
          <br></br>
          <input type="text" name="username" placeholder="Username" className="login-input" required />
          <br></br>
          <input type="password" name="password" placeholder="Password" className="login-input" required />
          <br></br>
          <input type="submit" value="Login" className="login-button" />
        </form>
      </div>
    </div>
  );
}
