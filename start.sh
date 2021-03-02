#!/usr/bin/env sh
echo "DEBUG_MODE is ${DEBUG_MODE}"
echo -n "Starting the process "

if [ "$DEBUG_MODE" == "1" ]; then
    echo "in live mode"
    npm run build:live
else
    echo "in plain node"
    node build/index.js
fi
