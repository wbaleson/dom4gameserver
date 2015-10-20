#!/usr/bin/python

import sqlite3
import re

from ttdatabase import *


### regexes

played = r"(.*?) played this turn"
staled = r"(.*?) didn't play this turn"
isAI = r"(.*?) is computer controlled"

gameName = r"Statistics for game '(.*?)' turn -1"

playedRE = re.compile(played)
staledRE = re.compile(staled)
isAIRE = re.compile(isAI)
gameNameRE = re.compile(gameName)

### main

## Setup Stuff
createTables()
turn = getTurn()
turn = turn + 1
name = getName()
turndb.execute(newTurnQuery,(turn,))
loadPlayers()

ffile = open("stats.txt","r+")

for line in ffile:
	# Skip Empty Lines
	if(line.strip() == ""):
		continue

	m = gameNameRE.match(line)
	if(m):
		if(name == ""):
			setGameName(m.group(1))
		continue


	## Match lpayed Line
	processTurnTrack(playedRE, line, turn, 1)
	processTurnTrack(staledRE, line, turn, 2)
	processTurnTrack(isAIRE, line, turn, 3)



ffile.close()


##printDebugInfo()

turndb.commit()
turndb.close()

