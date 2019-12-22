import React from "react";
import "../../stylesheets/dashboard.css";
import { withRouter } from 'react-router-dom';
 class Sidebar extends React.Component {
  render() {
    return (
      <div id="mySidenav" class="sidenav">
        <div>
        <div class="menuitem" onClick={()=>this.props.switchpage('home')}>
          <i class="glyphicon glyphicon-home"></i>&emsp;<span class="dashboardtext">Home</span>
        </div>

        <div class="user">
          <i class="glyphicon glyphicon-user"></i>&emsp;<span class="dashboardtext2">User</span>
          <i class="glyphicon glyphicon-chevron-down"></i>
          <div class="dropdown" id="dropdown">
            <div class="dropdownitem"  onClick={()=>this.props.switchpage('profile')}>
              <span class="dashboardtext">Profile</span>
            </div>
              <div class="dropdownitem"  onClick={()=>this.props.switchpage('resetpw')}>
                <span class="dashboardtext">Reset Password</span>
              </div>
          </div>
        </div>

        <div  class="menuitem"  onClick={()=>this.props.switchpage('game')}>
          <i class="fas fa-gamepad"></i>&emsp;<span class="dashboardtext">Game</span>
        </div>

        <div  class="menuitem"  onClick={()=>this.props.switchpage('rank')}>
          <i class="fa fa-trophy" aria-hidden="true"></i>&emsp;<span class="dashboardtext">Rank</span>
        </div>

        <div class="menuitem"  onClick={()=>this.props.switchpage('contact')}>
          <i class="glyphicon glyphicon-earphone"></i>&emsp;<span class="dashboardtext">Contact</span>
        </div>
        </div>
        <div  class="menuitem" onClick={this.props.logout}>
          <i class="glyphicon glyphicon-log-out"></i>&emsp;<span class="dashboardtext">Logout</span>
        </div>
      </div>
    );
  }
}

export default withRouter(Sidebar);