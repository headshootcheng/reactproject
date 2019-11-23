import React from "react";
import "../stylesheets/account.css";

export default class Register extends React.Component {
  constructor(props){
    super(props);
    this.state={
       username:'',
       email:'',
       password1:'',
       password2:'',
       error:''
    }
  }

  componentDidMount() {
    document.title = "Sign Up";
  }
  onchangeusername = (event) =>{
    this.setState({username:event.target.value})
  }

  onchangeemail = (event) =>{
    this.setState({email:event.target.value})
  }

  onchangepassword1 = (event) =>{
    this.setState({password1:event.target.value})
  }

  onchangepassword2 = (event) =>{
    this.setState({password2:event.target.value})
  }

  submituserdata=(event)=>{
    event.preventDefault();
    fetch('http://127.0.0.1:5000/api/register', {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        username:this.state.username,
        email:this.state.email,
        password1:this.state.password1,
        password2:this.state.password2
      })    
    }).then((response) => {
      return response.json()
      }).then((myJson)=>{
     if(myJson.errormsg){
       this.setState({error:myJson.errormsg});
     }
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
          <hr/>
          {this.state.error!=''?
            <center>
            <div class="errorarea">
              <i class="fas fa-exclamation-circle"></i>&emsp;
              {this.state.error}
            </div>
            </center>
          :null}
            <form class="signup" onSubmit={this.submituserdata}>
  
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
                  onChange={this.onchangeusername}
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
                  onChange={this.onchangeemail}
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
                  onChange={this.onchangepassword1}
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
                  onChange={this.onchangepassword2}
                  required
                />
              </div>
              <br />
              <br />
              <input class="submit" value="Sign Up" type="submit"/>
              <br />
            </form>
            <button class="submit" onClick={this.submituserdata} > test</button>
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
