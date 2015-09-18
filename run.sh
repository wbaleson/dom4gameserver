#!/bin/bash
docker rm dom4gameserver
docker run --name dom4gameserver \
	-p 8500-8600:8500-8600 \
	-p 3000:3000 \
	-t -i \
	-v /home/will/dominions4:/home/steam/dominions4 \
	murtidash/dom4gameserver