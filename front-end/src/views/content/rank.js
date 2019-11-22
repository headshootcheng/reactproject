import React from "react";
import "../../stylesheets/content.css"
export default class Rank extends React.Component{
    render(){
        return(
            <div class="rankarea">
                <table>
                    <tr>
                        <td class="number">Rank</td>
                        <td class="usericon">Icon</td>
                        <td class="username">Username</td>
                        <td class="userscore">Score</td>
                    </tr>
                    <tr>
                        <td class="number"><i class="fa fa-trophy"></i><span class="best">1</span></td>
                        <td class="usericon"><img src='' class="iconarea"/></td>
                        <td class="username">1</td>
                        <td class="userscore">1</td>
                    </tr>
                    <tr>
                        <td class="number">2</td>
                        <td class="usericon"><img src='' class="iconarea"/></td>
                        <td class="username">2</td>
                        <td class="userscore">2</td>
                    </tr>
                    <tr>
                        <td class="number">3</td>
                        <td class="usericon"><img src='' class="iconarea"/></td>
                        <td class="username">3</td>
                        <td class="userscore">3</td>
                    </tr>
                    <tr>
                        <td class="number">4</td>
                        <td class="usericon"><img src='' class="iconarea"/></td>
                        <td class="username">4</td>
                        <td class="userscore">4</td>
                    </tr>
                    <tr>
                        <td class="number">5</td>
                        <td class="usericon"><img src=''class="iconarea"/></td>
                        <td class="username">5</td>
                        <td class="userscore">5</td>
                    </tr>
                    <tr>
                        <td class="number">6</td>
                        <td class="usericon"><img src='' class="iconarea"/></td>
                        <td class="username">6</td>
                        <td class="userscore">6</td>
                    </tr>
                    <tr>
                        <td class="number">7</td>
                        <td class="usericon"><img src='' class="iconarea"/></td>
                        <td class="username">7</td>
                        <td class="userscore">7</td>
                    </tr>
                    <tr>
                        <td class="number">8</td>
                        <td class="usericon"><img src=''class="iconarea"/></td>
                        <td class="username">8</td>
                        <td class="userscore">8</td>
                    </tr>
                    <tr>
                        <td class="number">9</td>
                        <td class="usericon"><img src='' class="iconarea"/></td>
                        <td class="username">9</td>
                        <td class="userscore">9</td>
                    </tr>
                    <tr>
                        <td class="number">10</td>
                        <td class="usericon"><img src='' class="iconarea"/></td>
                        <td class="username">10</td>
                        <td class="userscore">10</td>
                    </tr>
                </table>
             </div>
        )
    }
}