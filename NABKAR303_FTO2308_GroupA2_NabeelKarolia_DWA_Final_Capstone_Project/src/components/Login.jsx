import { useNavigate } from "react-router-dom";
import { supabase } from "../supabaseInit.js";

export default function Login() {
  const navigate = useNavigate();

  async function handleLogin(event) {
    event.preventDefault();
    const { email, password } = event.target.elements;

    let { error } = await supabase.auth.signInWithPassword({
      email: email.value,
      password: password.value,
    });

    if (error) {
      console.error("Error signing in:", error.message);
    } else {
      let user = (await supabase.auth.getUser()).data.user; // get the user data from the session
      console.log("Success! Signed in:", user);
      localStorage.setItem("user", JSON.stringify(user)); // store user data in local storage
      navigate("/");
    }
  }

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
      <form onSubmit={handleLogin} className="login-form item-02">
        <br></br>
        <input type="email" name="email" placeholder="Email" className="login-input" required />
        <br></br>
        <input type="password" name="password" placeholder="Password" className="login-input" required />
        <br></br>
        <input type="submit" value="Login" className="login-button" />
      </form>
    </div>
  );
}
