import kermit from './casino_kermit.jpg';
import {useState} from 'react';
import {randint} from './util.js';

class Card_t {
    constructor() {
        this.points = 0;
        this.name = "";
        this.rand();
    }
    rand() {
        /* 2, 3, ..., 10, Jack, Queen, King, Ace
        zero for 2 and 12 for Ace */
        let card_id = randint(0, 12);
        let value;       	 
        let name;
        switch(card_id) {            
            case 9:
                name = 'Jack';
                value = 10;
                break;
            case 10:
                name = 'Queen';
                value = 10;
                break;
            case 11:
                name = 'King';
                value = 10;
                break;
            case 12:
                name = 'Ace';
                value = 11;
                break;    
            default:
                name = card_id + 2;
                value = card_id + 2;
                break;
        }    
        this.points = value;
        this.name = name;
    }
}

function Card() {
    return (
        <div className="pcard">
            A
        </div>
    )
}

function ActionBtn({ text, action }) {
    return (
        <button id="btn_start" className="btn-action" onClick={action}>{ text }</button>        
    );
}



export default function Game() {
    let [player, setPlayer] = useState({
        score: 0,
        cardName: "",
    })

    function start() {

    }

    return (
        <div>
            <header>
                <h3>BLACKJACK CARD GAME</h3>
            </header>
            <div id='kermitPic'>
                <img src={kermit} alt="kermit here"/>
            </div>
            <div className="playing-mat">
                <table>     
                    <tbody>               
                        <tr>
                            <th>Player</th>
                            <th>Dealer</th>
                        </tr>                    
                        <tr>
                            <td className="deals" id="player-deals">
                                <div className="cards">
                                    <Card />
                                    <Card />
                                </div>
                                <div>
                                    Your score: 25
                                </div>
                                <div className="actions">
                                    <ActionBtn text={"Start over"}/>
                                    <ActionBtn text={"Hit"}/>
                                    <ActionBtn text={"Stand"}/>
                                </div>
                            </td>
                            <td className="deals" id="dealer-deals">
                                <div className="cards">
                                    <Card />
                                    <Card />
                                </div>
                            </td>
                        </tr>        
                        <tr>
                            <td colSpan="2">Stats: blah blah blah</td>
                        </tr>    
                    </tbody>         
                </table>
            </div>
            <div className="rules">
                <i>Rules:</i>
                <p>Input a bet and press 'place the bet'</p>
                <p>The dealer will give you and himself two cards each, but you can't see his second card. 
                    Natural blackjack = 10 card + Ace. If player has it (and dealer hasn't), he wins 1.5x . 
                    Otherwise it's a tie. You can ask for another card (Hit) or leave as is (Stand). </p>
                <p>Aces rule: if in current hand you have ace and ask for more cards, 
                    if the draw creates a bust by counting Ace as 11 - count the Ace as 1.</p>
                <p>Dealer: after you stand, the dealer shows you his second card. 
                    If his totals is 17 or more - it will stand. Otherwise the dealer will take more cards until he reaches 17 or more.</p>
                <p>Bust: if you go more then 21 you're busted and lost your wager. 
                    If dealer goes over 21 or less then player, it pays the player 1x. </p>
            </div>
            <footer className="code">
                <p>BJ card game by Bogdan Pokrepin</p>
            </footer>
        </div>        

    );
}