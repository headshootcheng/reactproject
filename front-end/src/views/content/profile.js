import React from "react";
import "../../stylesheets/content.css"
import axios from 'axios'
import Cookies from 'js-cookie'
export default class Profile extends React.Component{
   constructor(props){
       super(props);
       this.state={
           email:'normal',
           icon:'normal',
           file:{},
           error:null
       }
   }
   
   selecticon=()=>{
       document.getElementById('files').click();
   }
   showiconname=(event)=>{
        document.getElementById('iconname').innerHTML= event.target.value;
        //console.log(event.target.files[0]);
        this.setState({file:event.target.files[0]},()=>console.log(this.state.file));
   }
   submiticon=async(event) =>{
        event.preventDefault();
        console.log("file info:"+this.state.file);
        const icon = new FormData();
        icon.append('file',this.state.file);
        const {data}= await axios.post('http://127.0.0.1:5000/service/icon',icon,{headers:{ Authorization: 'Bearer ' + Cookies.get('token')}});
       if(data.msg=='success'){
           this.setState({icon:'normal'});
           window.location.reload();
       }
   }
   submitemail=async(event)=>{
    event.preventDefault();
    const {data}= await axios.post('http://127.0.0.1:5000/service/email',{
        email:this.props.email
     }
    ,{
        headers:{ Authorization: 'Bearer ' + Cookies.get('token')}
    });
    console.log('data',data);  
    if(data.error){
        this.setState({error:data.error})
    }
    if(data.msg=='success'){
        this.setState({email:'normal'});
        window.location.reload();
    }
   }

   iconarea=()=>{
       switch(this.state.icon){
           case 'normal':
               return (
                    <div id="iconarea">
                        <img src={this.props.icon} class="iconview"/> <span class="edit"></span>
                        <span class="edit" onClick={()=>{this.setState({icon:'edit'})}}>
                            <i class="glyphicon glyphicon-pencil"></i>  
                        </span>
                    </div>
               )
            case 'edit':
                return(
                    <div> 
                        <button class="submitprofile" onClick={this.selecticon}>Select</button>
                        <form onSubmit={this.submiticon}> 
                            <center>
                                <input name="usericon" id="files" class="iconinputarea" type="file" onChange={this.showiconname}/>
                                <span id="iconname"></span><br/>
                                <input type="submit" class="submitprofile" value="Upload" />
                            </center>
                        </form>
                        <button class="cancelprofile" onClick={()=>{this.setState({icon:'normal'})}}>Cancel</button> 
                    </div>
                )
       }
   }

   emailarea=()=>{
       switch(this.state.email){
       case "normal":
           return (
               <div>
                   <div id="emailarea">
                       <span id="email">
                           {this.props.email}
                       </span> 
                        <span class="edit" onClick={()=>this.setState({email:'edit'})}>
                            <i class="glyphicon glyphicon-pencil"></i>
                        </span>
                    </div>
               </div>
           )
        case "edit":
            return (
                <form  onSubmit={this.submitemail}>
                    <input class="inputprofile" name="email"   onChange={this.props.onChangeEmail} pattern="^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$" value={this.props.email} required/>
                    <input type="submit" class="submitprofile" value="Update"/>
                </form>
            )
        }
   }
    render(){
      
        return(
            <div class="profilearea">
                <h1 class="titletext">{this.props.username}'s Profile</h1><br/>
               
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
                 
                <table>
                    <tr>
                        <td class="type">Username</td>
                        <td class="data"> {this.props.username}</td>
                    </tr>
                    <tr>
                        <td class="type">Email</td>
                        <td class="data">
                            {this.emailarea()}
                        </td>
                    </tr>
                    <tr>
                        <td class="type">Icon</td>
                        <td class="data">
                            {this.iconarea()}
                        </td>
                    </tr>
                </table>
               
            </div>
        )
    }
}