source config.sh

cd $DIR
i=1
if [[ -e $GAME-1.tgz ]] ; then
  while [[ -e $GAME-$i.tgz ]] ; do
    let i++
  done
fi
tar cvf $GAME-$i.tgz  * --exclude='*.tgz'
mv $GAME-$i.tgz backups
