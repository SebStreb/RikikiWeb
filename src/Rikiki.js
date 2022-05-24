export default class Rikiki {

    DECK_SIZE = 55;

    WIN_POINTS = 5;
    PER_PLY_POINTS = 2;
    PER_DIFF_POINTS = 2;

    players;
    points;
    
    roundNumber = 1;
    handSize = 1;
    maxHandSizeReached = false;

    startingPlayerIndex;

    constructor(players) {
        this.players = players;

        this.points = {};
        for (const player of players) this.points[player] = 0;

        this.startingPlayerIndex = Math.floor(Math.random() * players.length);
    }

    computePoints(bets, tricks) {
        for (const player of this.players) {
            if (bets[player] === tricks[player]) this.points[player] += this.WIN_POINTS + bets[player] * this.PER_PLY_POINTS;
            else this.points[player] -= Math.abs(tricks[player] - bets[player]) * this.PER_DIFF_POINTS;
        }
    }

    /**
     * Mutates the game state to go to next round.
     * @returns true if the game is finished, false otherwise.
     */
    nextRound() {
        this.roundNumber++;
        
        if (!this.maxHandSizeReached && this.handSize == this.maxHandSize) this.maxHandSizeReached = true;
        
        if (this.maxHandSizeReached) this.handSize--; 
        else this.handSize++;

        if (this.maxHandSizeReached && this.handSize == 0) return true;

        this.startingPlayerIndex = (this.startingPlayerIndex + 1) % this.players.length;

        return false;
    }

    get startingPlayer() {
        return this.players[this.startingPlayerIndex];
    }

    get maxHandSize() {
        return Math.floor((this.DECK_SIZE - 1) / this.players.length);
    }

}