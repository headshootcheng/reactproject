import React from "react";
import "../../stylesheets/content.css"
import moleimg from '../../images/blackmole.png'
export default class Game extends React.Component{
    render(){
        return(
            <div class="gamearea">
                <div class="gameleft">
                    Score:<div class="score" name="score" id="score">0</div>
                    
                    Time:<div class="time" name="time" id="time">60</div>
                    
                    Highest Score: <div class="score" name="highestscore" id="highestscore">0</div>
                    <div class="buttonarea">
                        <button class="gamestart" onclick="startfunction()" id="gamestart">Start</button>
                        <button class="gamereset" onclick="resetfunction()" id="gamereset">Reset</button>
                    </div>
                </div>

                <div class="gameright">
                
                <div id="gameblocks" class="gameblocks">
                    <div id="area1">
                        <div id="block1" onclick="molefunction(area1)" class="block"><img src={moleimg}
                                class="blockimg"/></div>
                    </div>
                    <div id="area2">
                        <div id="block2" onclick="molefunction(area2)" class="block"><img src={moleimg}
                                class="blockimg"/></div>
                    </div>
                    <div id="area3">
                        <div id="block3" onclick="molefunction(area3)" class="block"><img src={moleimg}
                                class="blockimg"/></div>
                    </div>
                    <div id="area4">
                        <div id="block4" onclick="molefunction(area4)" class="block"><img src={moleimg}
                                class="blockimg"/></div>
                    </div>
                    <div id="area5">
                        <div id="block5" onclick="molefunction(area5)" class="block"><img src={moleimg}
                                class="blockimg"/></div>
                    </div>
                    <div id="area6">
                        <div id="block6" onclick="molefunction(area6)" class="block"><img src={moleimg}
                                class="blockimg"/></div>
                    </div>
                    <div id="area7">
                        <div id="block7" onclick="molefunction(area7)" class="block"><img src={moleimg}
                                class="blockimg"/></div>
                    </div>
                    <div id="area8">
                        <div id="block8" onclick="molefunction(area8)" class="block"><img src={moleimg}
                                class="blockimg"/></div>
                    </div>
                    <div id="area9">
                        <div id="block9" onclick="molefunction(area9)" class="block"><img src={moleimg}
                                class="blockimg"/></div>
                    </div>
                </div>
            </div>
            </div>
        )
    }
}