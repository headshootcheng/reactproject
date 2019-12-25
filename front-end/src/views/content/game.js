import React from "react";
import "../../stylesheets/content.css"
import moleimg from '../../images/blackmole.png'
import whackimg from '../../images/whack.png'
import {StartGame,GameReset,Hit} from '../../function/molegame'
export default class Game extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            hit:[false,false,false,false,false,false,false,false,false],       
        };
    }

    Gameblock =() =>{
        this.hit1=true;
        return(
        <div id="gameblocks" class="gameblocks">
            <div id="area1">
                {this.state.hit[1-1]==true?
                    <img src={whackimg} class="blockimg"/>:
                    <div id="block1" class="block" onClick={()=>Hit(1)}><img src={moleimg} class="blockimg"/></div>
                }
            </div>
            <div id="area2">
                {this.state.hit[2-1]==true?
                    <img src={whackimg} class="blockimg"></img>:
                    <div id="block2" class="block" onClick={()=>Hit(2)}><img src={moleimg} class="blockimg"/></div>
                }
            </div>
            <div id="area3">
                {this.state.hit[3-1]==true?
                    <img src={whackimg} class="blockimg"></img>:
                    <div id="block3" class="block" onClick={()=>Hit(3)}><img src={moleimg} class="blockimg"/></div>
                }
            </div>
            <div id="area4">
                {this.state.hit[4-1]==true?
                    <img src={whackimg} class="blockimg"></img>:
                    <div id="block4" class="block" onClick={()=>Hit(4)}><img src={moleimg} class="blockimg"/></div>
                }
            </div>
            <div id="area5">
                {this.state.hit[5-1]==true?
                    <img src={whackimg} class="blockimg"></img>:
                    <div id="block5" class="block" onClick={()=>Hit(5)}><img src={moleimg} class="blockimg"/></div>
                }
            </div>
            <div id="area6">
                {this.state.hit[6-1]==true?
                    <img src={whackimg} class="blockimg"></img>:
                    <div id="block6" class="block" onClick={()=>Hit(6)}><img src={moleimg} class="blockimg"/></div>
                }
            </div>
            <div id="area7">
                {this.state.hit[7-1]==true?
                    <img src={whackimg} class="blockimg"></img>:
                    <div id="block7" class="block" onClick={()=>Hit(7)}><img src={moleimg} class="blockimg"/></div>
                }
            </div>
            <div id="area8">
                {this.state.hit[8-1]==true?
                    <img src={whackimg} class="blockimg"></img>:
                    <div id="block8" class="block" onClick={()=>Hit(8)}><img src={moleimg} class="blockimg"/></div>
                }
            </div>
            <div id="area9">
                {this.state.hit[9-1]==true?
                    <img src={whackimg} class="blockimg"></img>:
                    <div id="block9" class="block" onClick={()=>Hit(9)}><img src={moleimg} class="blockimg"/></div>
                }
            </div>
        </div>)
    }

   

    render(){
     
        return(
            <div class="gamearea">
                
                <div class="gameleft">
                    Score:<div class="score" name="score" id="score">0</div>
                    
                    Time:<div class="time" name="time" id="time">60</div>
                    
                    Highest Score: <div class="score" name="highestscore" id="highestscore">0</div>
                    <div class="buttonarea">
                        <button class="gamestart"  onClick={StartGame} id="gamestart">Start</button>
                        <button class="gamereset"  id="gamereset" onClick={GameReset}>Reset</button>
                    </div>
                </div>

                <div class="gameright">
                   {this.Gameblock()}
                </div>
            </div>
        )
    }
}