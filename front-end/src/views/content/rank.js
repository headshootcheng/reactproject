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
                    
                    {
                        this.props.rank.map(eachrank=>{
                            return(
                                <tr>
                                    {eachrank.number==1?
                                        <td class="number"><i class="fa fa-trophy"></i><span class="best">{eachrank.number}</span></td>:
                                        <td class="number">{eachrank.number}</td>
                                    }
                                    <td class="usericon"><img src={eachrank.icon} class="iconarea"/></td>
                                    <td class="username">{eachrank.username}</td>
                                <td class="userscore">{eachrank.score}</td>
                                </tr>
                            )
                        })
                    }
                   
                </table>
             </div>
        )
    }
}