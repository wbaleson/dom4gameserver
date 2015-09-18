# steamcmd run as user daemon
# https://developer.valvesoftware.com/wiki/SteamCMD#Linux 

FROM ubuntu:15.04

RUN apt-get update && apt-get install --no-install-recommends -y \
    ca-certificates \
    lib32gcc1 \
    net-tools \
    lib32stdc++6 \
    lib32z1 \
    lib32z1-dev \
    curl \
    libglu1 \
    git \
    vim \
    libsdl1.2debian \
    nodejs \
    npm

RUN useradd -m steam
RUN mkdir -p /home/steam/steamcmd  && \
    curl -s http://media.steampowered.com/installer/steamcmd_linux.tar.gz | tar -v -C /home/steam/steamcmd -zx && \
    chown -R steam:steam /home/steam

WORKDIR /home/steam/steamcmd
USER steam
RUN git clone https://github.com/murtidash/dom4gameserver.git /home/steam/dom4gameserver


ADD config.sh /home/steam/steamcmd/
ADD install_dominions.sh /home/steam/steamcmd/install_dominions.sh
USER root
RUN chown steam:steam install_dominions.sh config.sh
RUN chmod 777 /home/steam/steamcmd/install_dominions.sh

USER steam
RUN /home/steam/steamcmd/install_dominions.sh
ADD dom4key /home/steam/dom/
ADD scripts /home/steam/dom/scripts/
USER root
#need to chown the added files
RUN apt-get install --no-install-recommends -y --reinstall 
RUN npm -g install bower
USER steam
RUN mkdir -p /home/steam/dom4gameserver/node/dom4gs/client/vendor
RUN mkdir -p /home/steam/dom4gameserver/node/dom4gs/storage/mods
RUN mkdir -p /home/steam/dom4gameserver/node/dom4gs/storage/maps
WORKDIR /home/steam/dom4gameserver/node/dom4gs/
USER root
RUN ln -s /usr/bin/nodejs /usr/bin/node
USER steam
RUN bower install --config.interactive=false
RUN npm install
USER root