object RikikiIO {

    fun getValue(prompt: String, max: Int, ban: Int = -1): Int {
        while (true) {
            print(prompt)
            val bet = readLine()?.toIntOrNull()
            if (bet != null && bet >= 0 && bet <= max && bet != ban) return bet
            println("Valeur non valide…")
        }
    }

    fun getPlayerNames(): List<String> {
        val players = mutableListOf<String>()
    
        print("Entrez le nom du premier joueur : ")
        while (true) {
            val name = readLine()!!

            if (name == "stop") {
                if (players.size >= 2) break
                else println("Entrez au moins deux joueurs…")
            } else players += name

            print("Entrez le nom du joueur suivant (stop pour arrêter) : ")
        }

        println()
        return players
    }

    fun getBet(player: String, max: Int, ban: Int = -1) = getValue("Entrez l'annonce du joueur $player : ", max, ban)
    fun announceBan(ban: Int) = println("Impossible de parier $ban!")

    fun getResult(player: String, max: Int) = getValue("Entrez le nombre de plis fait par le joueur $player : ", max)


    fun showHello() {
        println("Bienvenue dans ce jeu de Rikiki!")
        println()
    }

    fun showNewRound(startingPlayer: String, handSize: Int) {
        println("C'est au tour de $startingPlayer de commencer,")
        println("$handSize plis sont en jeu.")
        println()
    }

    fun recapBets(bets: Map<String, Int>) {
        println()
        println("Les jeux sont fait!")
        for ((player, bet) in bets) println("- $player a parié $bet plis")
        println("Bon jeu!")
        println()
    }

    fun recapPoints(points: Map<String, Int>) {
        println()
        println("Fin du tour, voici les points actuels :")
        for ((nom, point) in points) println("- $nom a $point points")
        println()
    }

    fun showResults(points: Map<String, Int>, winner: String) {
        println()
        println("Le jeu est terminé, voici les résultats finaux :")
        for ((nom, point) in points) println("- $nom a $point points")
        println("Le gagnant est $winner, félicitations !!")
        println("Merci à tous d'avoir participé.")
    }
    
}