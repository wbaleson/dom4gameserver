#!/usr/bin/python

import sqlite3

from ttdatabase import *

loadPlayers()
loadTurns()
name = getName()

ofilename = "TurnTrack - %s.html" % name

ofile = open(ofilename, "w+")

## Header

head = "<h2> Turn Tracking for %s </h2>" % name
ofile.write(head)

## Body

ofile.write("<p><table width=100%>")

colorDisposition = {
  1:'green',
  0:'gray',
  2:'red',
  3:'black'

}

for player in players.keys():
  ofile.write("<tr><td width = 7%%>%s</td>" % player)
  for turn in turns.keys():
    ttt = getTurnDisposition(players[player],turns[turn])
    ofile.write('<td style="background-color:')
    ofile.write(colorDisposition[ttt])
    ofile.write('"> </td>')
  ofile.write("</tr>")

ofile.write("</table>")
## Footer

ofile.write("""
  <p>
  <table width=40%>
  <tr><td width=25%>No Info:</td><td style="background-color:gray" width=25%> </td>
      <td width=25%>Played:</td><td style="background-color:green" width=25%> </td></tr>
  <tr><td>Stale:</td><td style="background-color:red"> </td><td>AI Controlled:</td><td style="background-color:black"> </td></tr>
  </table>

  """

  )


ofile.close()
