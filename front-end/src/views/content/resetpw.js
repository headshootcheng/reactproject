import React from "react";
import "../../stylesheets/content.css"
import axios from 'axios'
import Cookies from 'js-cookie'
import { withRouter } from 'react-router-dom';
class Resetpw extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            oldpassword:'',
            newpassword:'',
            confirmedpassword:'',
            error:null
        }
    }
    onChangeOldpassword = (event) =>{
        this.setState({oldpassword:event.target.value})
    }
    onChangeNewpassword = (event) =>{
        this.setState({newpassword:event.target.value})
    }
    onChangeConfirmedpassword=(event)=>{
        this.setState({confirmedpassword:event.target.value});
    }
    submitResetpw = async(event) =>{
        event.preventDefault();
        const {data} = await axios.post('http://127.0.0.1:5000/service/resetpw',{
            oldpassword:this.state.oldpassword,
            newpassword:this.state.newpassword,
            confirmedpassword:this.state.confirmedpassword
        },{headers:{ Authorization: 'Bearer ' + Cookies.get('token')}});
        if(data.success){
            Cookies.remove('token');
            this.props.history.push({
                pathname:'/',
                state:{success:data.success}
              });
        }
        if(data.error){
            this.setState({error:data.error});
        }
    }
    render(){
        return(
            <div class="resetarea">
                <h1 class="titletext">Reset Password</h1>
                {this.state.error!=null?
                    <div class="errorarea">
                        {this.state.error.map((eacherror)=>{
                            return(
                                <div class="msgrow">
                                    <i class="fas fa-exclamation-circle"></i>&emsp;
                                    {eacherror.msg}
                                </div>
                            )})
                        }
                    </div>
                :null}
                <form class="resetform" onSubmit={this.submitResetpw}>
                    <div class="eachrow">
                        Your password:
                        <input type="password" class="inputbox2"  placeholder="Your Password" onChange={this.onChangeOldpassword} required />  
                    </div>
                    <br/>                   
                    <div class="eachrow">
                        New password:
                        <input type="password" class="inputbox2"  placeholder="New Password" onChange={this.onChangeNewpassword} required />
                    </div>
                    <br/>
                    <div class="eachrow">
                        Confirmed password:
                        <input type="password" class="inputbox2" placeholder="Enter new Password again" onChange={this.onChangeConfirmedpassword} required />
                    </div>
                    <br/>
                    <input type="submit" class="submitpw" value="Submit" />
                    <br/>
                </form>
            </div>
        )
    }
}
export default withRouter(Resetpw);