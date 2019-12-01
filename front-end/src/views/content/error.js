import React from "react";
import "../../stylesheets/content.css";
export default class Home extends React.Component{
    render(){
        return(
            <center>
                <div class="errorarea2">
                    <span>Please Login!!!</span>
                  
                    <a href="/"> <button class="errorlogin">Login</button></a>
                 </div>
            </center>
            
        )
    }
}