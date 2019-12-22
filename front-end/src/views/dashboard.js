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
import axios from 'axios';
import Cookies from 'js-cookie'



export default class Dashboard extends React.Component {
    constructor(props){
        super(props);
        this.state={
            popup:false,
            loggedin:false,
            username:'',
            email:'',
            icon:''
        }
    }
    componentDidMount(){
        document.title="Dashboard"
        this.reload();
        
    }
    async reload(){
        const {data}= await axios('http://127.0.0.1:5000/api/user',{headers:{ Authorization: 'Bearer ' + Cookies.get('token')}});
        console.log("reloaddata"+JSON.stringify(data));
        this.setState({
            loggedin:data.loggedin,
            username:data.username,
            email:data.email,
            score:data.score,
            icon:data.icon,
            rank:data.rank
        })
    }
    reload2(){
        fetch('http://127.0.0.1:5000/api/user',{
            method: 'GET',
            headers:{ Authorization: 'Bearer ' + Cookies.get('token')}}).then((response) =>
                {return response.json()})
        .then((data)=> {
            this.setState({
                loggedin:data.loggedin,
                username:data.username,
                email:data.email,
                score:data.score,
                icon:data.icon,
                rank:data.rank
            })
        })
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
                return <Home {...this.state} />
            case 'profile':
                return <Profile {...this.state} onChangeEmail={this.onChangeEmail}/>
            case 'resetpw':
                return <Resetpw {...this.state}/>
            case 'game':
                return <Game {...this.state}/>
            case 'rank':
                return <Rank {...this.state}/>
            case 'contact':
                return <Contact {...this.state}/>
            default :
                return <Home {...this.state}/>
        }
    }
    onChangeEmail = (event) =>{
        this.setState({email:event.target.value});
    }
    logout=()=>{
        Cookies.remove('token');
        this.props.history.push('/');
    }
    render(){
        return(
            
            <div >
                {this.state.loggedin==true?
                    <div class="container">
                        {this.state.popup==true?<Sidebar switchpage={this.switchpage} logout={this.logout}/>: null}
                        <div class="content">
                            <Topbar openmenu={this.openmenu} {...this.state}/>                  
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