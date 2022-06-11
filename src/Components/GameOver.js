import Welcome from "./Welcome";

const GameOver = (points) => {
    const main = document.querySelector("#content");

    let html = `
        <h1 class="text-center">The game is over!</h1>
        <p class="h5 text-muted text-center mb-4">Here are the results of the game:</p>
    `;

    let bestPlayer = [];
    let bestPoints = null;

    html += `
        <div class="mb-5">
        <table class="table table-striped"><thead><tr>
            <th scope="col">Player name</th>
            <th scope="col">Points</th>
        </tr></thead><tbody>
    `;
    for (const player in points) {
        html += `
            <tr>
                <th scope="row">${player}</th>
                <td>${points[player]}</td>
            </tr>
        `;

        if (bestPoints === null || bestPoints < points[player]) {
            bestPlayer = [player];
            bestPoints = points[player];
        } else if (bestPoints === points[player]) bestPlayer.push(player);
    }
    html += "</tobdy></table></div>";

    html += `<p class="h5 text-muted text-center mb-4">`;
    if (bestPlayer.length === 1) html += `The winner is <strong>${bestPlayer[0]}</strong>.</p>`;
    else html += `The winners are <strong>${bestPlayer.join(", ")}</strong>.</p>`;

    html += `
        <div class="col-md-12 text-center">
            <button class="btn btn-primary col-md-4" id="playAgain">Start a new game</button>
        </div>
    `;

    main.innerHTML = html;

    document.querySelector("#playAgain").addEventListener("click", () => {
        Welcome();
    });
};

export default GameOver;