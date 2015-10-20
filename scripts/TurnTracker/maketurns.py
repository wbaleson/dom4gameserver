#!/usr/bin/python

from ttdatabase import *
import sys

if len(sys.argv) != 2:
	print "Usage: %s <number of fake turns to make>" % sys.argv[0]
	sys.exit(0)

createTables()

for x in range(0,int(sys.argv[1])):
	turndb.execute(newTurnQuery,(x+1,))

turndb.commit()
turndb.close()
