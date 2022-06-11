import Results from "./Results";

const Bets = (rikiki) => {
    const stage = document.querySelector("#roundStage");

    let html = `
        <div class="mb-3 d-flex justify-content-between">
            <h4>Place your bets</h4>
            <h5>Sum of all current bets: <span id="sum">0</span></h5>
        </div>
        <p><form>
    `;
    for (const player of rikiki.orderedPlayers) {
        html += `
            <div class="form-group row">
                <label for="${player}" class="col-6 col-form-label">${player}</label>
                <div class="col-6">
                    <input inputmode="numeric" pattern="[0-9]*" type="number" class="form-control" id="${player}" value="0" placeholder="Player bet" aria-label="player bet">
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

    const bets = rikiki.players.reduce((map, value) => {
        map[value] = 0;
        return map;
    }, {});

    for (const player of rikiki.players) {
        document.querySelector(`#${player}`).addEventListener("input", (event) => {
            const bet = parseInt(event.target.value);

            if (isNaN(bet) || bet < 0 || bet > rikiki.handSize) {
                bets[player] = NaN;
                event.target.classList.add("is-invalid");
                return;
            } else event.target.classList.remove("is-invalid");

            bets[player] = bet;

            const sum = document.querySelector("#sum");

            let total = 0;
            for (const player in bets) total += bets[player];
            sum.innerHTML = total;
 
            if (total === rikiki.handSize) sum.classList.add("text-danger");
            else sum.classList.remove("text-danger");
        });
    }
    
    document.querySelector("#confirm").addEventListener("click", (event) => {
        event.preventDefault();

        let total = 0;
        for (const player in bets) total += bets[player];

        const error = document.querySelector("#error");

        if (isNaN(total)) {
            error.innerHTML = "Some bets are invalid.";
        } else if (total === rikiki.handSize) {
            error.innerHTML = "The sum of all bets can't be equal to the hand size."
        } else {
            Results(rikiki, bets);
        }
    });
};

export default Bets;