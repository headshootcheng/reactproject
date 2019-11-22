import React from "react";
import "../../stylesheets/content.css"
export default class Resetpw extends React.Component{
    render(){
        return(
            <div class="resetarea">
                <h1 class="titletext">Reset Password</h1>
                <form class="resetform">
                    <div class="eachrow">
                        Your password:
                        <input type="password" class="inputbox2" name="password" id="password" placeholder="Your Password"
                            oninput="InvalidMsg1(this);" oninvalid="InvalidMsg1(this);" required />  
                    </div>
                    <br/>                   
                    <div class="eachrow">
                        New password:
                        <input type="password" class="inputbox2" name="newpassword1" id="newpassword1" placeholder="New Password"
                            oninput="InvalidMsg1(this);" oninvalid="InvalidMsg1(this);" required />
                    </div>
                    <br/>
                    <div class="eachrow">
                        Confirmed password:
                            <input type="password" class="inputbox2" name="newpassword2" id="newpassword2"
                                placeholder="Enter new Password again" oninput="InvalidMsg2(this);" oninvalid="InvalidMsg2(this);"
                                required />
                    </div>
                    <br/>
                    <input type="submit" class="submitpw" value="Submit" onclick="post()"/>
                    <br/>
                </form>
            </div>
        )
    }
}