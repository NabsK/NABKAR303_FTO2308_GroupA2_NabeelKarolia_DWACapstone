import { useNavigate } from "react-router-dom";
import { supabase } from "../supabaseInit.js";

export default function SignUp() {
  const navigate = useNavigate();

  async function handleSignUp(event) {
    event.preventDefault();
    const { email, password } = event.target.elements;

    if (password.value.length < 6) {
      alert("Password should be at least 6 characters long.");
      return;
    }

    let { user, error } = await supabase.auth.signUp({
      email: email.value,
      password: password.value,
    });
    if (error) {
      console.error("Error signing up:", error.message);
    } else {
      console.log("Success! Signed up:", user);
      window.alert("Check your email to confirm sign up.");
      navigate("/login");
    }
  }

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
      <form onSubmit={handleSignUp} className="signUp-form item-02">
        <input type="email" name="email" placeholder="Email" className="signUp-input" required />
        <input type="password" name="password" placeholder="Password" className="signUp-input" required />
        <input type="submit" value="Sign Up" className="signUp-button" />
      </form>
    </div>
  );
}
