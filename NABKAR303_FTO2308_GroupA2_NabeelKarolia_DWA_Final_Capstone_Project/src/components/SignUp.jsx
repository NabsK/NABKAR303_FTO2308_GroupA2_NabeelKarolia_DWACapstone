import { useNavigate } from "react-router-dom";

export default function SignUp() {
  const navigate = useNavigate();
  return (
    <div className="SignUp-container">
      <button onClick={() => navigate("/login")} className="backToLogin">
        Go Back
      </button>
      <h2>Sign up</h2>
      <form action="#" method="post">
        <input type="text" name="username" placeholder="Username" required />
        <input type="password" name="password" placeholder="Password" required />
        <input type="submit" value="SignUp" />
      </form>
    </div>
  );
}
