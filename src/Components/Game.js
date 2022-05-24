import Rikiki from "../Rikiki";
import GameOver from "./GameOver";

export default function Game(players) {
    const main = document.querySelector("#content");

    main.innerHTML = `
        <h1 class="text-center">Rikiki game</h1>
        <p class="h5 text-muted text-center mb-4">May the best player win!</p>

        <h4 class="mb-3">Round #<span id="roundNumber">0</span></h4>

        <p>
        Playing with <span id="handSize">0 card</span>
        </p>

        <div id="playerTable" class="mb-5"></div> 

        <div id="roundStage"></div> 
    `;

    const rikiki = new Rikiki(players);
    updateRoundInformations(rikiki);
    betStage(rikiki);
};

const updateRoundInformations = (rikiki) => {
    document.querySelector("#roundNumber").innerHTML = rikiki.roundNumber;
    document.querySelector("#handSize").innerHTML = rikiki.handSize + (rikiki.handSize === 1 ? " card" : " cards");

    const playerTable = document.querySelector("#playerTable");

    let html = `
        <table class="table table-striped"><thead><tr>
            <th scope="col">Player name</th>
            <th scope="col">Points</th>
            <th scope="col">Starting player</th>
        </tr></thead><tbody>
    `;
    for (const player of rikiki.players) {
        html += `
            <tr>
                <th scope="row">${player}</th>
                <td>${rikiki.points[player]}</td>
                <td>${player === rikiki.startingPlayer ? "yes" : ""}</td>
            </tr>
        `;
    }
    html += "</tobdy></table>";

    playerTable.innerHTML = html;
};

const betStage = (rikiki) => {
    const stage = document.querySelector("#roundStage");

    let html = `
        <h4 class="mb-3">Place your bets</h4>
        <p><form>
    `;
    for (const player of rikiki.players) {
        html += `
            <div class="form-group row">
                <label for="${player}" class="col-4 col-form-label">${player}</label>
                <div class="col-8">
                    <input type="text" class="form-control" id="${player}" placeholder="Player bet" aria-label="player bet">
                </div>
            </div>
        `;
    }
    html += `
        <p>
            <div class="col-md-12 text-center mb-2">
                <button type="submit" class="btn btn-primary col-md-4" id="confirm">Confirm</button>
            </div>
            <div id="error" class="text-danger text-center"></div>
        </p>
        </form></p>
    `;

    stage.innerHTML = html;

    const error = document.querySelector("#error");
    document.querySelector("#confirm").addEventListener("click", (event) => {
        event.preventDefault();

    
        const bets = {};
        let total = 0;
        for (const player of rikiki.players) {
            const bet = parseInt(document.querySelector(`#${player}`).value);
            if (isNaN(bet) || bet < 0 || bet > rikiki.handSize) return error.innerHTML = "Bets can only be between 0 and the hand size";
            bets[player] = bet;
            total += bet;
        }
        if (total === rikiki.handSize) return error.innerHTML = "The total of all bets can't be equal to the hand size";
        resultStage(rikiki, bets);
    });
};

const resultStage = (rikiki, bets) => {
    const stage = document.querySelector("#roundStage");

    let html = `
    <h4 class="mb-3">Enter the results</h4>
    <p><form>
    `;
    for (const player of rikiki.players) {
        html += `
            <div class="form-group row">
                <label for="${player}" class="col-2 col-form-label">${player}</label>
                <label for="${player}" class="col-2 col-form-label">bet: ${bets[player]}</label>
                <div class="col-8">
                    <input type="text" class="form-control" id="${player}" placeholder="Player result" aria-label="player result">
                </div>
            </div>
        `;
    }
    html += `
        <p>
            <div class="col-md-12 text-center mb-2">
                <button type="submit" class="btn btn-primary col-md-4" id="confirm">Confirm</button>
            </div>
            <div id="error" class="text-danger text-center"></div>
        </p>
        </form></p>
    `;

    stage.innerHTML = html;

    const error = document.querySelector("#error");
    document.querySelector("#confirm").addEventListener("click", (event) => {
        event.preventDefault();

        const results = {};
        let total = 0;
        for (const player of rikiki.players) {
            const result = parseInt(document.querySelector(`#${player}`).value);
            if (result < 0 || result > rikiki.handSize) return error.innerHTML = "Results can only be between 0 and the hand size";
            results[player] = result;
            total += result;
        }
        if (total !== rikiki.handSize) return error.innerHTML = "The total of all bets must be equal to the hand size";
        
        rikiki.computePoints(bets, results);
        const isOver = rikiki.nextRound();
        
        if (isOver) GameOver(rikiki.points);
        else {
            updateRoundInformations(rikiki);
            betStage(rikiki);
        }
    });
}
