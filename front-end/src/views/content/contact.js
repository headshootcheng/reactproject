import React from "react";
import "../../stylesheets/content.css"
export default class Contact extends React.Component{
    render(){
        return(
            <div class="contactarea">
                <h1 class="titletext">Contact</h1>
                <table>
                    <tr>
                        <td class="type"><i class="fa fa-envelope"></i>Email</td>
                        <td class="data">petercheng7788@gmail.com</td>
                    </tr>
                    <tr>
                        <td class="type"><i class="fab fa-whatsapp"></i>Whatsapp</td>
                        <td class="data">66042244</td>
                    </tr>
                </table>
                <br/>
                Thanks for your support! {this.props.username}!
            </div>
        )
    }
}