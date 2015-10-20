#!/usr/bin/python

import re
import os


location = "/home/steam/dom4gameserver/node/dom4gs/client/turntracker/"

indexfile = "/home/steam/dom4gameserver/node/dom4gs/client/turntracker/index.html"

ttpatern = r"TurnTrack - .*?.html"
ttm = re.compile(ttpatern)

ofile = open(indexfile, "w+")

ofile.write("<h2>Turn Track Games:</h2><p>")

for fi in os.listdir(location):
	if(ttm.match(fi)):
		ofile.write('<a href="%s">%s</a><br>' % (fi,fi[0:-5]))

ofile.close()
