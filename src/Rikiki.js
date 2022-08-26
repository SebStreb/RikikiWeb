const DECK_SIZE = 52;

class Rikiki {

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

    // TODO : find a way to roll back round

    nextRound() {
        this.roundNumber++;
        
        if (!this.maxHandSizeReached && this.handSize == this.maxHandSize) this.maxHandSizeReached = true;
        
        if (this.options.shouldDescend && this.maxHandSizeReached) this.handSize--;
        else this.handSize++;

        if (this.handSize == 0 || this.handSize > this.maxHandSize) return true;

        this.startingPlayerIndex = (this.startingPlayerIndex + 1) % this.players.length;

        return false;
    }

    get dealingPlayer() {
        let index = this.startingPlayerIndex - 1;
        if (index === -1) index = this.players.length - 1;
        return this.players[index];
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
        return getMaxHandSize(this.options.overrideMaxHandSize, this.options.jokerCount, this.players.length);
    }

    get maxRounds() {
        return getNumberOfRounds(this.maxHandSize, this.options.shouldDescend);
    }

}

const getMaxHandSize = (overrideMaxHandSize, jokerCount, numberOfPlayers) => {
    const maxHandSize = Math.floor((DECK_SIZE + jokerCount - 1) / numberOfPlayers);
    if (isNaN(overrideMaxHandSize)) return maxHandSize;
    else if (overrideMaxHandSize > maxHandSize) return maxHandSize;
    else return overrideMaxHandSize;
};

const getNumberOfRounds = (maxHandSize, shouldDescend) => shouldDescend ? maxHandSize * 2 - 1 : maxHandSize;

export { Rikiki, getMaxHandSize, getNumberOfRounds };