import React from "react";
import { useNavigate } from "react-router-dom";
import * as Components from "./SignUpComponents";
import "./SignUpstyles.css";
import axios from "axios";

function SignUp({ onLogin }) {  // Add onLogin prop
  const [signIn, toggle] = React.useState(true); // Default is sign-in form
  const [name, setName] = React.useState(""); // Name state (used for signup)
  const [email, setEmail] = React.useState(""); // Email state
  const [password, setPassword] = React.useState(""); // Password state
  const navigate = useNavigate(); // To navigate after successful login/signup

  // Handle SignUp (POST request to the unified signup route)
  const handleSubmit = (e) => {
    e.preventDefault();

    const data = { email, password };

    // Add `name` only if it's a signup (when 'signIn' is false)
    if (!signIn) {
      data.name = name;
    }

    axios
      .post("https://danieldavid.me/backend/api/user", data) // Unified route for both login and signup
      .then((result) => {
        console.log(result);

        // If it's a signup, toggle to signin form
        if (!signIn) {
          toggle(true);
        } else {
          // If it's a login and successful, navigate to home and trigger login state
          if (result.data.success) {
            onLogin();  // Update the login state in App
            navigate("/home");  // Navigate to home page
          } else {
            alert("Invalid credentials or user not found!");
          }
        }
      })
      .catch((err) => {
        console.error(err);
        alert("An error occurred. Please try again.");
      });
  };

  return (
    <Components.Container>
      {/* Signup Form */}
      <Components.SignUpContainer signingIn={signIn}>
        <Components.Form onSubmit={handleSubmit}>
          <Components.Title>{signIn ? "Sign In" : "Create Account"}</Components.Title>

          {!signIn && (
            <Components.Input
              type="text"
              placeholder="Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          )}

          <Components.Input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />

          <Components.Input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

          <Components.Button type="submit">{signIn ? "Sign In" : "Sign Up"}</Components.Button>
        </Components.Form>
      </Components.SignUpContainer>

      {/* Signin Form */}
      <Components.SignInContainer signingIn={signIn}>
        <Components.Form onSubmit={handleSubmit}>
          <Components.Title>Sign In</Components.Title>
          <Components.Input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <Components.Input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <Components.Button>Sign In</Components.Button>
        </Components.Form>
      </Components.SignInContainer>

      {/* Overlay - toggling between SignUp and SignIn */}
      <Components.OverlayContainer signingIn={signIn}>
        <Components.Overlay signingIn={signIn}>
          <Components.LeftOverlayPanel signingIn={signIn}>
            <Components.Title>Welcome Back!</Components.Title>
            <Components.Paragraph>Chat ReciPT</Components.Paragraph>
            <Components.GhostButton onClick={() => toggle(true)}>
              Sign In
            </Components.GhostButton>
          </Components.LeftOverlayPanel>
          <Components.RightOverlayPanel signingIn={signIn}>
            <Components.Title>Hello There!</Components.Title>
            <Components.Paragraph>Welcome to Chat ReciPT</Components.Paragraph>
            <Components.GhostButton onClick={() => toggle(false)}>
              Sign Up
            </Components.GhostButton>
          </Components.RightOverlayPanel>
        </Components.Overlay>
      </Components.OverlayContainer>
    </Components.Container>
  );
}

export default SignUp;
