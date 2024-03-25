import { useNavigate } from "react-router-dom";

export default function Login() {
  const navigate = useNavigate();

  return (
    <div className="login-container">
      <button onClick={() => navigate("/")} className="showButton">
        Go Back
      </button>
      <h2>Login</h2>
      <form action="#" method="post">
        <input type="text" name="username" placeholder="Username" required />
        <input type="password" name="password" placeholder="Password" required />
        <input type="submit" value="Login" />
        <button className="NoAccountButton" onClick={() => navigate("/signup")}>
          Sign up
        </button>
      </form>
    </div>
  );
}
