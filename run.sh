#!/bin/bash
docker rm dom4gameserver
docker run --name dom4gameserver \
	-p 192.168.99.100:7900-8000:7900-8000 \
	-t -i \
	murtidash/dom4gameserver