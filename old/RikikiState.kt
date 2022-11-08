class RikikiState(val players: List<String>) {

    val WIN_POINTS = 5
    val PER_BET_POINTS = 2
    val PER_FAIL_POINTS = -2 

    val size = players.size

    val points: MutableList<Int>
    var bets: MutableList<Int>

    var startingPlayer: Int
    var actualPlayer: Int

    init {
        points = MutableList(players.size) { 0 }
        bets = MutableList(players.size) { 0 }

        startingPlayer = players.indices.random()
        actualPlayer = startingPlayer
    }

    val playerName get() = players[actualPlayer]
    val pointsMap get() = players.mapIndexed { i, player -> player to points[i] }.toMap()
    val betsMap get() = players.mapIndexed { i, player -> player to bets[i] }.toMap()

    fun nextPlayer() { 
        actualPlayer = if (actualPlayer+1 == size) 0 else actualPlayer + 1
    }

    fun nextRound() {
        bets = MutableList(players.size) { 0 }

        startingPlayer = if (startingPlayer+1 == size) 0 else startingPlayer + 1
        actualPlayer = startingPlayer
    }

    fun setResult(result: Int) {
        points[actualPlayer] += 
            if (bets[actualPlayer] == result) WIN_POINTS + PER_BET_POINTS * result 
            else PER_FAIL_POINTS * (Math.abs(result - bets[actualPlayer]))
    }

    fun setBet(bet: Int) {
        bets[actualPlayer] = bet
    }

}