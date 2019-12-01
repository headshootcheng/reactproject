import React from "react";
import "../stylesheets/account.css";
import axios from 'axios'
export default class Register extends React.Component {
  constructor(props){
    super(props);
    this.state={
       username:'',
       email:'',
       password1:'',
       password2:'',
       error:null,
       success:null
    }
  }

  componentWillMount() {
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

  submituserdata= async(event) => {
    event.preventDefault();
    
    const {data} = await axios.post('http://127.0.0.1:5000/api/register', {
      
        username:this.state.username,
        email:this.state.email,
        password1:this.state.password1,
        password2:this.state.password2
      
    })
    if(data.error){
      this.setState({error:data.error})
    }
     if(data.success){
      this.setState({success:data.success},()=>{
        this.props.history.push({
          pathname:'/',
          state:{success:this.state.success}
        }); })
    }    
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
          {this.state.error!=null?
           
              <div class="errorarea">
                {this.state.error.map((eacherror)=>{
                  return(
                  <div class="msgrow">
                    <i class="fas fa-exclamation-circle"></i>&emsp;
                      {eacherror.msg}
                  </div>)
                })}
              </div>
            :
            null
          }
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
