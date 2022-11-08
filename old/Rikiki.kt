val NUMBER_OF_CARDS = 55

fun main() {
    RikikiIO.showHello()
    val players = RikikiIO.getPlayerNames()
    val state = RikikiState(players)

    val maxHandSize = (NUMBER_OF_CARDS - 1) / players.size

    for (handSize in ((1 .. maxHandSize) + (maxHandSize-1 downTo 1))) {
        RikikiIO.showNewRound(state.playerName, handSize)

        repeat(players.size - 1) {
            state.setBet(RikikiIO.getBet(state.playerName, handSize))
            state.nextPlayer()
        }
        val ban = handSize - state.bets.sum()
        RikikiIO.announceBan(ban)
        state.setBet(RikikiIO.getBet(state.playerName, handSize, ban))

        RikikiIO.recapBets(state.betsMap)
        state.nextPlayer()
        
        var total = 0
        repeat(players.size) {
            val result = RikikiIO.getResult(state.playerName, handSize - total)
            total += result
            
            state.setResult(result)
            state.nextPlayer()
        }

        RikikiIO.recapPoints(state.pointsMap)
        state.nextRound()
    }

    RikikiIO.showResults(state.pointsMap, state.pointsMap.maxByOrNull { it.value }!!.key)
}