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
                name = 'J';
                value = 10;
                break;
            case 10:
                name = 'Q';
                value = 10;
                break;
            case 11:
                name = 'K';
                value = 10;
                break;
            case 12:
                name = 'A';
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

function Card({text}) {
    return (
        <div className="pcard">
            {text}
        </div>
    )
}

function ActionBtn({ text, action }) {
    return (
        <button id="btn_start" className="btn-action" onClick={action}>{ text }</button>        
    );
}

function calculateScore(cards) {
    if (cards.length === 0) return 0;
    else {
        let score = 0;
        cards.forEach(card=>{
            score += card.points;
        })        
        const aces_n = (cards.filter(card => { return card.name==="A" })).length;
        if (score > 21 && aces_n > 0) {            
            score -= 10*aces_n;
        }        
        return score;
    }
}

export default function Game() {
    let [inGame, setInGame] = useState(true);
    let [player_wins, setPlayerWins] = useState(true);

    let initialstate = {};
    initialstate.cards = [new Card_t(), new Card_t()];
    initialstate.score = calculateScore(initialstate.cards);
    let [player, setPlayer] = useState(initialstate)

    let initialdealer = {};
    initialdealer.cards = [new Card_t(), new Card_t()]
    initialdealer.score = calculateScore(initialdealer.cards);
    let [dealer, setDealer] = useState(initialdealer);

    function start() {
        let newstate = {};
        newstate.cards = [new Card_t(), new Card_t()];
        newstate.score = calculateScore(newstate.cards);
        setPlayer(newstate);

        initialdealer = {};
        initialdealer.cards = [new Card_t(), new Card_t()]
        initialdealer.score = calculateScore(initialdealer.cards);
        setDealer(initialdealer);

        setInGame(true);
    }

    function hit() {
        let newstate = {};
        newstate.cards = [...player.cards, new Card_t()];
        newstate.score = calculateScore(newstate.cards);
        setPlayer(newstate);
        
        setTimeout(()=>{
            if (newstate.score >= 21) {                
                setPlayerWins(newstate.score === 21); 
                setInGame(false);               
            }
        }, 200);        
    }

    function stand() {
        console.log('player cards', player.cards);
        
        if (player.score === 21) {
            setPlayerWins(true);
        } else if (player.score > 21) {
            setPlayerWins(false);
        } else {
            dealerhits();
        }        
        setInGame(false);
    }
    
    function dealerhits() {
        let dealer_score = dealer.score;
        const dealer_cards = [...dealer.cards];
        while (dealer_score < 17) {
            let taken_card = new Card_t();
            dealer_cards.push(taken_card);
            dealer_score = calculateScore(dealer_cards);
        }        
        const newdealer = {}
        newdealer.cards = dealer_cards;
        newdealer.score = dealer_score;
        setDealer(newdealer)
        
        if (dealer_score > 21) {
            setPlayerWins(true);
        } else {
            if (dealer_score === player.score) {
                console.log('TIE')
            } else if (dealer_score < player.score) {
                setPlayerWins(true);
            } else {
                setPlayerWins(false);
            }
        }
    }

    // Generate cards
    function cardsOnBoard(cards) {
        const cardsBoard = [];
        let i=0;
        cards.forEach(card=>{
            cardsBoard.push(
                <Card key={i} text={card.name}/>
            )
            i++;
        })
        return cardsBoard;
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
                                    {cardsOnBoard(player.cards)}
                                </div>
                                <div>
                                    Your score: {player.score}
                                </div>
                                <div className="actions">
                                    {inGame ? (
                                        <>
                                        <ActionBtn text={"Hit"} action={hit}/>
                                        <ActionBtn text={"Stand"} action={stand}/>
                                        </>
                                    ) : (
                                        <ActionBtn text={"Start over"} action={start}/>
                                    )}      
                                </div>
                            </td>

                            <td className="deals" id="dealer-deals">
                                <div className="cards">
                                    {inGame ? (
                                        <>
                                        {cardsOnBoard([dealer.cards[0]])}
                                        <div className="pcard pcard-cover"></div>
                                        </>
                                    ) : (<>
                                        {cardsOnBoard(dealer.cards)}
                                        
                                        <div>
                                            {dealer.score}
                                        </div>
                                        </>
                                    )}
                                </div>
                            </td>
                        </tr>        
                        <tr>
                            <td colSpan="2">
                                {inGame ? (
                                    <>
                                    Hit or stand?
                                    </>
                                ) : (
                                    <>
                                    {!player_wins ? (<h2 className='colored colored-lost'>LOST</h2>):(<h2 className='colored colored-win'>WIN</h2>)}
                                    </>
                                )}
                                
                            </td>
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