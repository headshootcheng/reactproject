import React from "react";
import "../stylesheets/account.css";
import titleimg from '../images/title.jpg'
export default class Login extends React.Component {
  componentDidMount() {
    document.title = "Login";
  }
  render() {
    return (
      <div class="container">
        <div class="login-left">
         
            <h1 class="accounttext">Login</h1>
        
          <form id="form">
            <div class="sign-in">
              <img src={titleimg} />
              <br/>
              <br/>
              <span class="accounttext">Username: </span>
              <input
                type="text"
                class="inputbox"
                name="username"
                placeholder="Username"
                oninput="InvalidMsg1(this);"
                oninvalid="InvalidMsg1(this);"
                required
              />
              <br/><br/>
              <span class="accounttext">Password: </span>
              <input
                type="password"
                class="inputbox"
                name="password"
                placeholder="Password"
                oninput="InvalidMsg2(this);"
                oninvalid="InvalidMsg2(this);"
                required
              /><br/><br/>

              <input
                type="submit"
                class="submit"
                value="Sign in"
                onclick="post()"
              />
            </div>
          </form>
        <br/>
        <a href="/dashboard">
            <span class="accounttext">Forgot Password?</span>
        </a>
         
        </div>

        <div class="login-right">
          <h1 class="accounttext">New memeber?</h1>
          sign up and enjoy the game!!!!!!!!
          <br/>
          <br/>
          <a href="/register">
            <button class="signupbutton">Sign up</button>
          </a>
        </div>
      </div>
    );
  }
}
