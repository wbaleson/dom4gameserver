#$1=game directory
#$2=game name
cd $1
i=1
if [[ -e $2-1.tgz ]] ; then
  while [[ -e $2-$i.tgz ]] ; do
    let i++
  done
fi
tar cvf $2-$i.tgz  * --exclude='*.tgz'
mv $2-$i.tgz backups
