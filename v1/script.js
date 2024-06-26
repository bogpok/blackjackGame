class Player {
    constructor() {
        this.points = 0;
        this.cardName = "";
    }
}

let status_text;
const user1 = new Player();
const dealer = new Player();


window.onload = () => {   
    document.getElementById("btn_start").onclick = start;
    document.getElementById("btn_take").onclick = changePoint;
    document.getElementById("btn_endgame").onclick = quit;
    start();
}

function dealerLogic() {        
    let card_id;
    let value;
    let cardNameDealer = ['0', '0'];
    for (let i = 0; i < 2; i++) {
        card_id = randint(0, 12);
        switch(card_id){
            case 0:
            case 1:
            case 2:
            case 3:
            case 4:
            case 5:
            case 6:
            case 7:
            case 8:
                cardNameDealer [i] = card_id + 2;
                value = card_id + 2;
                break;
            case 9:
                cardNameDealer [i] = 'Jack';
                value = 10;
                break;
            case 10:
                cardNameDealer [i] = 'Queen';
                value = 10;
                break;
            case 11:
                cardNameDealer [i] = 'King';
                value = 10;
                break;
            case 12:
                cardNameDealer [i] = 'Ace';
                if (user1.points + 11 > 21) {
                    value = 1;
                } else {
                    value = 11; 
                }
                break;              
        }
        dealer.points += value;    
    }
    document.getElementById("dealer1").innerHTML = cardNameDealer[0];
    document.getElementById("dealer2").innerHTML = 'facedown';
    document.getElementById("dealer3").innerHTML = dealer.cardName;
    dealer.cardName = cardNameDealer[1];
}

function start() {
    user1.points = 0;
    user1.cardName = 'Nothing';   

    dealer.points = 0;
    dealer.cardName = 'Nothing';

    status_text = 'Playing';

    document.getElementById("points").innerHTML = user1.points;
    document.getElementById("cardName").innerHTML = user1.cardName;
    document.getElementById("stat").innerHTML = status_text;
    dealerLogic()
}

function quit() {
    document.getElementById("dealer2").innerHTML = dealer.cardName;
    
    if (user1.points > dealer.points && user1.points <= 21) {        
        status_text = 'You win! Game is over';
    } else if (user1.points < dealer.points || user1.points > 21){        
        status_text = 'You lose ... paying to dealer';
    } else {        
        status_text = 'TIE. Maybe it\'s a good idea to go home?';
    }
    document.getElementById("stat").innerHTML = status_text;
}



function giveCard(player) {    
    /* 2, 3, ..., 10, Jack, Queen, King, Ace
    zero for 2 and 12 for Ace */
    let card_id = randint(0, 12);
    let value;       	 
    switch(card_id) {
        case 0:
        case 1:
        case 2:
        case 3:
        case 4:
        case 5:
        case 6:
        case 7:
        case 8:
            player.cardName = card_id + 2;
            value = card_id + 2;
            break;
        case 9:
            player.cardName = 'Jack'
            value = 10
            break;
        case 10:
            player.cardName = 'Queen'
            value = 10
            break;
        case 11:
            player.cardName = 'King'
            value = 10
            break;
        case 12:
            player.cardName = 'Ace'
            if (player.points + 11 > 21) {
                value = 1;
            } else {
                value = 11; 
            }
            break;    
    }    
    player.points += value
}

function changePoint() {
    giveCard(user1)
    document.getElementById("points").innerHTML = user1.points;
    document.getElementById("cardName").innerHTML = user1.cardName;

    if (status_text != 'Playing') {
        alert("Damn, boy\nStop taking cards and start a new game!"); 
    } else {
        if (user1.points >= 21) {
            quit()
        }
    }
}
