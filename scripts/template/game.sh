#!/bin/bash
source config.sh

if [ ! -d $DIR ];
then
mkdir $DIR
mkdir $DIR/backups
fi
cd $GAMEDIR

if [ $# -eq 0 ]
then
../../dom4.sh -T --tcpserver --port $PORT --era $ERA --mapfile $GAME.map --renaming --askifplayed --masterpass $MASTERPASS --hofsize 15 --eventrarity $EVENTRARITY --magicsites $MAGICSITES --preexec $GAMEDIR/preexec.sh --postexec $GAMEDIR/postexec.sh --hours $HOURS --statfile --scoredump \
$THRONES \
--noclientstart
else
../../dom4.sh -T --tcpserver --port $PORT --era $ERA --mapfile $GAME.map --renaming --askifplayed --masterpass $MASTERPASS --hofsize 15 --eventrarity $EVENTRARITY --magicsites $MAGICSITES --preexec $GAMEDIR/preexec.sh --postexec $GAMEDIR/postexec.sh --hours $HOURS --statfile --scoredump \
$Thrones
fi
