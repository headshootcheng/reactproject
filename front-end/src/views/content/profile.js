import React from "react";
import "../../stylesheets/content.css"
export default class Profile extends React.Component{
    render(){
        return(
            <div class="profilearea">
                <h1 class="titletext">User's Profile</h1><br/>
                <table>
                    <tr>
                        <td class="type">Username</td>
                        <td class="data"> User</td>
                    </tr>
                    <tr>
                        <td class="type">Email</td>
                        <td class="data">
                            <div id="emailarea"><span id="email">test</span> <span class="edit"
                                    onclick="editprofileemail()"><i class="glyphicon glyphicon-pencil"></i></span></div>
                        </td>
                    </tr>
                    <tr>
                        <td class="type">Icon</td>
                        <td class="data">
                            <div id="iconarea">
                                <img src='' class="iconview"/> 
                                <span class="edit"onclick="editprofileicon()">
                                    <i class="glyphicon glyphicon-pencil"></i> 
                                </span>
                            </div>
                        </td>
                    </tr>
                </table>
               
            </div>
        )
    }
}