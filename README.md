# dom4gameserver

Missing files:
Need to copy dom4key file to base dir
Need to edit config.sh with variables USERNAME and PASSWORD

docker container with dom4 setup and ready to go on it

node piece

docker run --name rethink -v "$PWD:/data" -d rethinkdb


-------

rethinkdb container - data volume on host
rethinkdb/rdb.sh to run container

explorer filter: {"where": {"_name": "test"}}