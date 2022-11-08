import sys


PLAYERS = [ "Edouard", "Flavio", "Sébastien", "Marie-Sophie", "Cécile" ]

WIN_POINTS = 5
PER_BET_POINTS = 2
PER_FAIL_POINTS = 2

MAX_HAND_SIZE = int(11 / len(PLAYERS))


def next(player):
	return 0 if player+1 == len(PLAYERS) else player + 1

def isint(val):
	try:
		int(val)
		return True
	except ValueError:
		return False

def get_input(prompt, max, banned = -1):
	while True:
		val = input(prompt)
		if isint(val) and int(val) >= 0 and int(val) <= max and int(val) != banned:
			return int(val)
		print("Value entered not valid, try again")


if __name__ == "__main__":
	
	print("Welcome yo this Rikiki game")
	print("The players are:")
	for player in PLAYERS:
		print(f"- {player}")
	print()

	
	turn = 0
	first_turn = True
	points = [ 0 for _ in range(len(PLAYERS)) ]

	for hand_size in [i for i in range(1, MAX_HAND_SIZE + 1)] + [j for j in range(MAX_HAND_SIZE - 1, 0, -1)]:
		
		print(f"It's {PLAYERS[turn]}'s turn to start")
		print(f"Playing with {hand_size} cards")


		player = turn
		bets = [ 0 for _ in range(len(PLAYERS)) ]
		for _ in range(len(PLAYERS) - 1):
			bets[player] = get_input(f"Enter {PLAYERS[player]}'s bet: ", hand_size)
			player = next(player)
			
		ban = hand_size - sum(bets)
		if ban >= 0:
			print(f"Can't bet {ban}")
		bets[player] = get_input(f"Enter {PLAYERS[player]}'s bet: ", hand_size, ban)


		print()
		print("Everyone has bet, recap:")
		for i in range(len(PLAYERS)):
			print(f"- {PLAYERS[i]}'s bet is {bets[i]}")
		print("Good game!")
		print()


		player = turn
		for _ in range(len(PLAYERS)):
			result = get_input(f"Enter {PLAYERS[player]}'s result: ", hand_size)

			if result == bets[player]:
				points[player] += WIN_POINTS + PER_BET_POINTS * bets[player]
			else:
				points[player] -= PER_FAIL_POINTS * abs(result - bets[player])

			player = next(player)


		print()
		if first_turn or hand_size > 1:
			print("End of this turn, recap of points:")
			for i in range(len(PLAYERS)):
				print(f"- {PLAYERS[i]} has {points[i]} points")
			print("Next turn!")
			print()


		turn = next(turn)
		first_turn = False

		
	print("Game is over, thanks for playing!")
	print("Final results:")
	winner = None
	max = -sys.maxsize-1
	for i in range(len(PLAYERS)):
		print(f"- {PLAYERS[i]} has {points[i]} points")
		if max < points[i]:
			max = points[i]
			winner = PLAYERS[i]
	print(f"The winner is {winner}! Congratulations")