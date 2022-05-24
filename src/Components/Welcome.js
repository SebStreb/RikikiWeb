import Game from "./Game";

export default function Welcome() {
    const main = document.querySelector("#content");

    main.innerHTML = `
        <h1 class="text-center">Welcome to this Rikiki game!</h1>
        <p class="h5 text-muted text-center mb-4">This app will help you manage your game of Rikiki with your friends.</p>

        <h4 mb-3>Enter the players</h4>

        <p><form>
            <div class="input-group">
                <input type="text" class="form-control" placeholder="Player name" aria-label="Player name" id="playerName" />
                <div class="input-group-append">
                    <button class="btn btn-secondary" type="submit" id="addPlayer">Add player</button>
                </div>
            </div>
        </form></p>

        <p><ul id="players"></ul></p>

        <p>
            <div class="col-md-12 text-center mb-2">
                <button class="btn btn-primary col-md-4" id="play">Start playing</button>
            </div>
            <div id="error" class="text-danger text-center"></div>
        </p>
    `;

    const list = [];
    
    const playerName = document.querySelector("#playerName");
    const addPlayer = document.querySelector("#addPlayer");
    const error = document.querySelector("#error");
    const players = document.querySelector("#players");
    const play = document.querySelector("#play");

    addPlayer.addEventListener("click", (event) => {
        event.preventDefault();

        const name = playerName.value;
        if (!name || name === "") return error.innerHTML = "Name can't be empty.";
        if (list.includes(name)) return error.innerHTML = "A player already exists with this name.";
        
        list.push(name);
        playerName.value = "";
        error.innerHTML = "";

        const li = document.createElement("li");
        li.innerHTML = name;
        
        players.appendChild(li);
    });

    play.addEventListener("click", () => {
        if (list.length < 2) return error.innerHTML = "Enter at least two players."
        Game(list);
    });
};