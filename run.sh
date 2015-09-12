#!/bin/bash
docker rm dom4gameserver
docker run --name dom4gameserver \
	-p 7900-8000:8500-8600 \
	-t -i \
	-v /home/will/dominions4:/home/steam/dominions4 \
	murtidash/dom4gameserver