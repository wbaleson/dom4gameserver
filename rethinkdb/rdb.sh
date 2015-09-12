docker run --name rethink -p 8080:8080 -p 29015:29015 -p 28015:28015 -v "$PWD:/data" -d rethinkdb
