import { useNavigate } from "react-router-dom";

export default function SignUp() {
  const navigate = useNavigate();
  return (
    <div className="signUp-container">
      <div className="signUp-page item-01">
        <button onClick={() => navigate("/login")} className="signUp-backButton">
          Go Back
        </button>
        <h1>Sign Up</h1>
        <br></br>
        <br></br>
        <h2>Create an account with us.</h2>
      </div>
      <form action="#" method="post" className="signUp-form item-02">
        <input type="email" name="email" placeholder="Email" className="signUp-input" required />
        <input type="password" name="password" placeholder="Password" className="signUp-input" required />
        <input type="submit" value="Sign Up" className="signUp-button" />
      </form>
    </div>
  );
}
