import Bets from "./Bets";
import GameOver from "./GameOver";
import { updateTable } from "./Game";

const Results = (rikiki, bets) => {
    const stage = document.querySelector("#roundStage");

    let html = `
    <div class="mb-3 d-flex justify-content-between">
            <h4>Enter the results</h4>
            <h5>Current number of tricks: <span class="text-danger" id="sum">0</span></h5>
        </div>
    <p><form>
    `;
    for (const player of rikiki.orderedPlayers) {
        html += `
            <div class="form-group row">
                <label for="${player}" class="col-3 col-form-label">${player}</label>
                <label for="${player}" class="col-3 col-form-label">bet: ${bets[player]}</label>
                <div class="col-6">
                    <input inputmode="numeric" pattern="[0-9]*" type="number" class="form-control" id="${player}" value="0" placeholder="Player result" aria-label="player result">   
                </div>
            </div>
        `;
    }
    html += `
        <p>
            <div class="row mb-2">
                <button type="submit" class="btn btn-danger col-sm-2" id="changeBets">Change Bets</button>
                <div class="col-sm-2"></div>
                <button type="submit" class="btn btn-primary col-sm-4" id="confirm">Confirm</button>
                <div class="col-sm-4"></div>
            </div>
            <div id="error" class="text-danger text-center"></div>
        </p>
        </form></p>
    `;

    stage.innerHTML = html;

    const results = rikiki.players.reduce((map, value) => {
        map[value] = 0;
        return map;
    }, {});

    for (const player of rikiki.players) {
        document.querySelector(`#${player}`).addEventListener("input", (event) => {
            const result = parseInt(event.target.value);

            if (isNaN(result) || result < 0 || result > rikiki.handSize) {
                results[player] = NaN;
                event.target.classList.add("is-invalid");
                return;
            } else event.target.classList.remove("is-invalid");

            results[player] = result;

            const sum = document.querySelector("#sum");

            let total = 0;
            for (const player in results) total += results[player];
            sum.innerHTML = total;
 
            if (total === rikiki.handSize) sum.classList.remove("text-danger");
            else sum.classList.add("text-danger");
        });
    }

    document.querySelector("#changeBets").addEventListener("click", (event) => {
        event.preventDefault();
        Bets(rikiki);
    })

    
    document.querySelector("#confirm").addEventListener("click", (event) => {
        event.preventDefault();

        let total = 0;
        for (const player in results) total += results[player];

        const error = document.querySelector("#error");
        
        if (isNaN(total)) {
            error.innerHTML = "Some results are invalid.";
        } else if (total !== rikiki.handSize) {
            error.innerHTML = "The number of tricks must be equal to the hand size."
        } else {
            rikiki.computePoints(bets, results);
            const isOver = rikiki.nextRound();

            if (isOver) GameOver(rikiki.points);
            else {
                updateTable(rikiki);
                Bets(rikiki);
            }
        }
    });
};

export default Results;