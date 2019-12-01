import React from "react";
import "../stylesheets/dashboard.css";
import Topbar from './component/topbar';
import Sidebar from './component/sidebar';
import Home from './content/home';
import Profile from './content/profile';
import Resetpw from './content/resetpw';
import Game from './content/game';
import Rank from './content/rank'
import Contact from './content/contact';
import Error   from './content/error';
import axios from 'axios'
export default class Dashboard extends React.Component {
    constructor(props){
        super(props);
        this.state={
            popup:false,
            current:'home',
            loggedin:false,
            username:'',
            email:'',
        }
    }
    componentDidMount() {
        document.title = "Error";
       if(this.props.location.state){
           document.title="Dashboard";
           this.setState({
               loggedin:this.props.location.state.loggedin,
               username:this.props.location.state.username,
               email:this.props.location.state.email
            })
       }
    }
    openmenu=()=>{
        if(this.state.popup==false){
            this.setState({popup:true})
        }
        else{
            this.setState({popup:false});
        }
    }
    switchpage=(page)=>{
        this.setState({current:page})
    }
    contentpage =()=>{
        switch (this.state.current) {
            case 'home':
                return <Home/>
            case 'profile':
                return <Profile/>
            case 'resetpw':
                return <Resetpw/>
            case 'game':
                return <Game/>
            case 'rank':
                return <Rank/>
            case 'contact':
                return <Contact/>
        }
    }
    render(){
        return(
            
            <div >
                {this.state.loggedin==true?
                    <div class="container">
                        {this.state.popup==true?<Sidebar switchpage={this.switchpage}/>: null}
                        <div class="content">
                            <Topbar openmenu={this.openmenu}/>                  
                            {this.contentpage()}  
                        </div>
                    </div>
                    :
                    <Error/>
                }
                
            </div>
        )
    }

}