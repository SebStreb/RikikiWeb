export default class Rikiki {

    DECK_SIZE = 55;

    players;
    points;
    options;
    
    roundNumber = 1;
    handSize = 1;
    maxHandSizeReached = false;

    startingPlayerIndex;

    constructor(players, options) {
        this.players = players;

        this.points = {};
        for (const player of players) this.points[player] = 0;

        this.options = options;

        this.startingPlayerIndex = Math.floor(Math.random() * players.length);
    }

    computePoints(bets, tricks) {
        for (const player of this.players) {
            if (bets[player] === tricks[player]) this.points[player] += this.options.winPoints + bets[player] * this.options.trickPoints;
            else this.points[player] -= Math.abs(tricks[player] - bets[player]) * this.options.trickPoints;
        }
    }

    /**
     * Mutates the game state to go to next round.
     * @returns true if the game is finished, false otherwise.
     */
    nextRound() {
        this.roundNumber++;
        
        if (!this.maxHandSizeReached && this.handSize == this.maxHandSize) this.maxHandSizeReached = true;
        
        if (this.options.shouldDescend && this.maxHandSizeReached) this.handSize--;
        else this.handSize++;

        if (this.handSize == 0 || this.handSize > this.maxHandSize) return true;

        this.startingPlayerIndex = (this.startingPlayerIndex + 1) % this.players.length;

        return false;
    }

    get startingPlayer() {
        return this.players[this.startingPlayerIndex];
    }

    get orderedPlayers() {
        const tab = [];
        
        for (let i = 0; i < this.players.length; i++) {
            const index = (this.startingPlayerIndex + i) % this.players.length;
            const element = this.players[index];
            tab.push(element)            
        }

        return tab;
    }

    get maxHandSize() {
        if (!isNaN(this.options.maxHandSize)) return this.options.maxHandSize;
        else return Math.floor((this.DECK_SIZE - 1) / this.players.length);
    }

    get maxRounds() {
        if (this.options.shouldDescend) return this.maxHandSize * 2 - 1;
        else return this.maxHandSize;
    }

}