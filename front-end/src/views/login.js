import React from "react";
import "../stylesheets/account.css";
import titleimg from '../images/title.jpg'
import axios from 'axios'
import Cookies from 'js-cookie'
axios.defaults.withCredentials=true;
export default class Login extends React.Component {

  constructor(props){
    super(props);
    this.state={
       username:'',
       password:'',
       error:null,
    }
  }

  componentDidMount() {
    document.title = "Login";
  }
  onchangeusername = (event) =>{
    this.setState({username:event.target.value})
  }
  onchangepassword= (event) =>{
    this.setState({password:event.target.value})
  }

   submituserdata = async(event)=>{
    event.preventDefault();
    
    const {data} = await axios.post('http://127.0.0.1:5000/api/login', {
        username:this.state.username,
        password:this.state.password
    },{withCredentials:'include'})
    if(data.message){
      this.setState({error:data.message})
    }
    else{
      //localStorage.setItem('token', data.token)
      Cookies.set('token',data.token);
      this.props.history.push({
        pathname:'/dashboard'
      });
    }    
  }
  render() {
    return (
      <div class="container">
        <div class="login-left">

            <h1 class="accounttext">Login</h1>
            {this.props.location.state?
              <div class="successarea">
                  <div class="msgrow">
                      <i class="fas fa-check-circle"></i>&emsp;
                      {this.props.location.state.success}
                  </div>
              </div>:
              null
            }

            {this.state.error!=null?      
              <div class="errorarea">
                  <div class="msgrow">
                    <i class="fas fa-exclamation-circle"></i>&emsp;
                      {this.state.error}
                  </div>
              </div>
            :
            null
            }
            <form onSubmit={this.submituserdata}>
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
                  onChange={this.onchangeusername}
                  required
                />
                <br/><br/>
                <span class="accounttext">Password: </span>
                <input
                  type="password"
                  class="inputbox"
                  name="password"
                  placeholder="Password"
                  onChange={this.onchangepassword}
                  required
                /><br/><br/>
                <input
                  type="submit"
                  class="submit"
                  value="Sign in"
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
