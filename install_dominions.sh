#!/bin/bash
source ./config.sh
./steamcmd.sh +login $USERNAME $PASSWORD +force_install_dir ../dom +app_update 259060 validate +quit