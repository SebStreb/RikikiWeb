import Rikiki from "../Rikiki";
import Bets from "./Bets";

const Game = (players, options) => {
    const main = document.querySelector("#content");

    const rikiki = new Rikiki(players, options);

    main.innerHTML = `
        <h1 class="text-center">Rikiki game</h1>
        <p class="h5 text-muted text-center mb-4">May the best player win!</p>

        <div class="mb-3 d-flex justify-content-between">
            <h4>Round #<span id="roundNumber">0</span>/${rikiki.maxRounds}</h4>
            <h5>Hand size: <span id="handSize">0 card</span></h5>
        </div>

        <div id="playerTable" class="mb-5"></div> 

        <div id="roundStage"></div> 
    `;
    
    updateTable(rikiki);
    Bets(rikiki);
};

const updateTable = (rikiki) => {
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

export { Game, updateTable };