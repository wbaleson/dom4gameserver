source config.sh

TEMPDIR=$DIR/$timestamp

cd $DIR
/dom/scripts/TurnTracker/turntrack.py
/dom/scripts/TurnTracker/makettweb.py
cp TurnT*.html /www/artificers/turntracker
/dom/scripts/TurnTracker/ttindex.py

