import { getMaxHandSize, getNumberOfRounds } from "../Rikiki";
import { Game } from "./Game";

const Welcome = () => {
    const main = document.querySelector("#content");

    let options = {
        jokerCount: 3,
        winPoints: 5,
        trickPoints: 2,
        overrideMaxHandSize: NaN,
        shouldDescend: true,
    }

    main.innerHTML = `
        <h1 class="text-center">Welcome to this Rikiki game!</h1>
        <p class="h5 text-muted text-center mb-4">This app will help you manage your game of Rikiki with your friends.</p>

        <h4 mb-3>Game options</h4>

        <form class="form-horizontal mb-4">
            <div class="form-group row mb-3">
                <label class="control-label col-sm-4" for="jokerCount">Number of jokers</label>
                <div class="col-sm-8">
                    <input id="jokerCount" value="${options.jokerCount}" inputmode="numeric" pattern="[0-9]*" type="number" class="form-control">
                </div>
            </div>
            <div class="form-group row mb-3">
                <label class="control-label col-sm-4" for="winPoints">Points for winning a bet</label>
                <div class="col-sm-8">
                    <input id="winPoints" value="${options.winPoints}" inputmode="numeric" pattern="[0-9]*" type="number" class="form-control">
                </div>
            </div>
            <div class="form-group row mb-3">
                <label class="control-label col-sm-4" for="trickPoints">Point value of a trick</label>
                <div class="col-sm-8">
                <input id="trickPoints" value="${options.trickPoints}" inputmode="numeric" pattern="[0-9]*" type="number" class="form-control">
                </div>
            </div>
            <div class="form-group row mb-3">
                <label class="control-label col-sm-4" for="overrideMaxHandSize">Maximum hand size</label>
                <div class="col-sm-8">
                    <input id="overrideMaxHandSize" inputmode="numeric" pattern="[0-9]*" type="number" placeholder="Leave blank for default: maximum depending on the number of players" class="form-control">
                </div>
            </div>
            <div class="form-group row">
                <label class="control-label col-sm-4" for="shouldDescend">Finish with the descend</label>
                <div class="col-sm-8">
                    <input id="shouldDescend" ${options.shouldDescend ? "checked": ""} type="checkbox">
                </div>
            </div>
        </form>

        <h4 m-3>Enter the players</h4>

        <p><form>
            <div class="input-group">
                <input type="text" class="form-control" placeholder="Player name" aria-label="Player name" id="playerName" />
                <div class="input-group-append">
                    <button class="btn btn-secondary" type="submit" id="addPlayer">Add player</button>
                </div>
            </div>
        </form></p>

        <p><ul id="players"></ul></p>

        <p> <div class="text-center">Playing for <span id="rounds">Infinity</span> rounds</div></p>
        <p>
            <div class="row mb-2">
                <div class="col-sm-4"></div>
                <button class="btn btn-primary col-sm-4" id="play">Start playing</button>
                <div class="col-sm-4"></div>
            </div>
            <div id="error" class="text-danger text-center"></div>
        </p>
    `;

    const list = [];

    const jokerCount = document.querySelector("#jokerCount");
    const winPoints = document.querySelector("#winPoints");
    const trickPoints = document.querySelector("#trickPoints");
    const overrideMaxHandSize = document.querySelector("#overrideMaxHandSize");
    const shouldDescend = document.querySelector("#shouldDescend");

    const rounds = document.querySelector("#rounds");
    const playerName = document.querySelector("#playerName");
    const addPlayer = document.querySelector("#addPlayer");
    const error = document.querySelector("#error");
    const players = document.querySelector("#players");
    const play = document.querySelector("#play");

    const updateRounds = () => {
        const max = getMaxHandSize(options.overrideMaxHandSize, options.jokerCount, list.length);
        rounds.innerHTML = getNumberOfRounds(max, options.shouldDescend);
    }

    jokerCount.addEventListener("input", (event) => {
        const value = parseInt(event.target.value);

        if (isNaN(value) || value < 0) {
            event.target.classList.add("is-invalid");
            return;
        } else event.target.classList.remove("is-invalid");

        options.jokerCount = value;
        updateRounds();
    });

    winPoints.addEventListener("input", (event) => {
        const value = parseInt(event.target.value);

        if (isNaN(value) || value < 0) {
            event.target.classList.add("is-invalid");
            return;
        } else event.target.classList.remove("is-invalid");

        options.winPoints = value;
    });

    trickPoints.addEventListener("input", (event) => {
        const value = parseInt(event.target.value);

        if (isNaN(value) || value < 0) {
            event.target.classList.add("is-invalid");
            return;
        } else event.target.classList.remove("is-invalid");

        options.trickPoints = value;
    });

    overrideMaxHandSize.addEventListener("input", (event) => {
        if (event.target.value === "") {
            options.overrideMaxHandSize = NaN;
            updateRounds();
            return;
        }

        const value = parseInt(event.target.value);

        if (isNaN(value) || value <= 0) {
            event.target.classList.add("is-invalid");
            return;
        } else event.target.classList.remove("is-invalid");

        options.overrideMaxHandSize = value;
        updateRounds();
    });

    shouldDescend.addEventListener("input", (event) => {
        options.shouldDescend = event.target.checked;
        updateRounds();
    });

    addPlayer.addEventListener("click", (event) => {
        event.preventDefault();

        const name = playerName.value;
        if (!name || name === "") return error.innerHTML = "Name can't be empty.";
        if (list.includes(name)) return error.innerHTML = "A player already exists with this name.";
        
        list.push(name);
        updateRounds();

        playerName.value = "";
        error.innerHTML = "";

        const li = document.createElement("li");
        li.innerHTML = name;
        
        players.appendChild(li);
    });

    play.addEventListener("click", () => {
        if (list.length < 2) return error.innerHTML = "Enter at least two players."
        Game(list, options);
    });
};

export default Welcome;