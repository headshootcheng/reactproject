import React from "react";
import "../stylesheets/account.css";

export default class Register extends React.Component {
  constructor(props){
    super(props);
    this.state={
       username:'petercheng',
       email:'456@gmail.com',
       password1:'1234',
       password2:'1234'
    }
  }

  componentDidMount() {
    document.title = "Sign Up";
  }
  onchangeusername = (value) =>{
    this.setState({username:value})
  }

  submituserdata(){
    //console.log(this.state.email);
    fetch('http://127.0.0.1:5000/api/register', {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        username:'petercheng7788',
        email:'test@gmail.com'
      })
      
    }).then((response) => {
      return response.json()
      }).then((myJson)=>{
      console.log(myJson)
  })
    
    /*fetch('http://127.0.0.1:5000/api/register')
    .then(res => res.json())
    .then(list => console.log(list))*/
  }
  

  render() {
    return (
      <div>
        <div class="register-left"/>
        <div class="register-right">
          <h1 class="accounttext">Sign Up</h1>
          Please fill in this form to create an account !!!
          <br />
            <div class="signup">
              <hr />
              <span class="accounttext">Username:</span>
              <br />
              <div class="required">
                <input
                  type="name"
                  name="username"
                  id="username"
                  class="inputbox"
                  placeholder="Your Username"
                  pattern="^.{1,10}$"
                  oninvalid="InvalidMsg1(this);"
                  oninput="InvalidMsg1(this);"
                 
                  required
                />
              </div>
              <br />
              <span class="accounttext">Email:</span>
              <br />
              <div class="required">
                <input
                  type="text"
                  name="email"
                  id="email"
                  class="inputbox"
                  placeholder="Your Email"
                  pattern="^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$"
                  oninvalid="InvalidMsg2(this);"
                  oninput="InvalidMsg2(this);"
                 
                  required
                />
              </div>
              <br />
              <span class="accounttext">Password:</span>
              <br />
              <div class="required">
                <input
                  type="password"
                  id="password1"
                  name="password1"
                  class="inputbox"
                  placeholder="Your Password"
                  pattern="^.{1,10}$"
                  oninvalid="InvalidMsg3(this);"
                  oninput="InvalidMsg3(this);"
                  required
                />
              </div>
              <br />
              <span class="accounttext">Repeat Password:</span>
              <br />
              <div class="required">
                <input
                  type="password"
                  id="password2"
                  name="password2"
                  class="inputbox"
                  placeholder="Repeat Your Password"
                  pattern="^.{1,10}$"
                  oninvalid="InvalidMsg4(this);"
                  oninput="InvalidMsg4(this);"
                  required
                />
              </div>
              <br />
              <br />
              <button class="submit" onClick={this.submituserdata}>Sign up</button>
              <br />
            </div>
          <br/>
          <a href="/">
            <button class="backlogin">Back</button>
            <br />
          </a>
        </div>
      </div>
    );
  }
}
