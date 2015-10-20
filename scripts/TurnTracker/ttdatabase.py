import sqlite3
import re

### Queries

createGameTable = """
  CREATE TABLE IF NOT EXISTS gameName
  ( gname varchar(50)
  	);

"""

createTurnTrackTable = """

  CREATE TABLE IF NOT EXISTS turnTrack
    (
    	id INTEGER PRIMARY KEY AUTOINCREMENT,
    	turn INTEGER REFERENCES turns (id),
    	player INTEGER REFERENCES players (id),
    	disposition INTEGER
    );

"""

createTurnTable = """

  CREATE TABLE IF NOT EXISTS turns
    (
    	id INTEGER PRIMARY KEY AUTOINCREMENT,
        turn INTEGER,
        turntime CURRENT_TIMESTAMP
    );

"""

createPlayerTable = """

  CREATE TABLE IF NOT EXISTS players 
   (id INTEGER PRIMARY KEY AUTOINCREMENT,
    name VARCHAR(50));

"""

getLatestTurnQuery = """
   select MAX(turn) from turns;
"""

getPlayersQuery = """
   select id, name from players order by id ASC;

"""

newPlayerQuery = """
    insert into players (name) values (?);
"""

trackTurnQuery = """
    insert into turnTrack (turn, player, disposition) VALUES (?,?,?);

"""

newTurnQuery = """
    insert into turns (turn) VALUES (?);
"""

getGameNameQuery = """
    select gname from gameName LIMIT 1;
"""

setGameNameQuery = """
    insert into gameName (gname) VALUES (?);
"""

getTurnsQuery = """
    select id, turn, turntime FROM turns order by turn ASC;
"""

getTurnDispositionQuery = """
    select disposition FROM turnTrack WHERE player = ? and turn = ?;
"""

### globals
turndb = sqlite3.connect('turn.db')

players = {}
turns = {}

statuses = ['UNKNOWN','PLAYED','STALED','AI','DEAD THIS TURN']


### functions

def createTables():
  turndb.execute(createPlayerTable)
  turndb.execute(createTurnTable)
  turndb.execute(createTurnTrackTable)
  turndb.execute(createGameTable)

def getTurn():
  turnRow = turndb.execute(getLatestTurnQuery)
  res = turnRow.fetchone()[0]
  if res == None:
    return 0
  return res

def getName():
  nameRow = turndb.execute(getGameNameQuery)
  res = nameRow.fetchone()
  if res == None:
    return ""
  return res[0]

def getTurnDisposition(p, t):
  res = turndb.execute(getTurnDispositionQuery,(p,t)).fetchone()
  if res == None:
    return 0
  return res[0]

def loadPlayers():
  global players
  for row in turndb.execute(getPlayersQuery):
    players[row[1]] = row[0]

def findPlayer(pl):
  global players
  pl = unicode(pl, errors='ignore')
  if(pl not in players):
    turndb.execute(newPlayerQuery,(pl,))
    loadPlayers()
  return players[pl]


def printDebugInfo():
  for row in turndb.execute("SELECT * FROM gameName"):
    print row

  for row in turndb.execute("SELECT * FROM players"):
    print row

  for row in turndb.execute("SELECT * FROM turns"):
    print row

  for row in turndb.execute("SELECT * FROM turnTrack"):
    print row


def processTurnTrack(rere, line, turn, disp):
  m = rere.match(line)
  if(m):
    playnum = findPlayer(m.group(1))
    turndb.execute(trackTurnQuery,(turn, playnum, disp))    

def setGameName(name):
  turndb.execute(setGameNameQuery,(name,))

def loadTurns():
  global turns
  for row in turndb.execute(getTurnsQuery):
    turns[row[1]] = row[0]
