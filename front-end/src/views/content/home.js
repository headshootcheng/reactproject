import React from "react";
import "../../stylesheets/content.css"
import titleimg from '../../images/title.jpg'
export default class Home extends React.Component{
    render(){
        return(
            
                
                    <div class="homearea">
                        Welcome! {this.props.username}! <br/>
                        <img src={titleimg} class="titleicon"/>
                 </div>
                
                
            
        )
    }
}