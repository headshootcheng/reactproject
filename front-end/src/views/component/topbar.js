import React from "react";
import "../../stylesheets/dashboard.css";
export default class Topbar extends React.Component{
    render(){
        return(
            <div class="topbar">
                <i class="glyphicon glyphicon-th-list" onClick={this.props.openmenu}></i>
                <span class="dashboardtext" >Hi ! User!</span>
            </div>
        )
    }
}