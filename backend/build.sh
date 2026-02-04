#!/bin/sh

cd $(dirname "$0") || exit 0
pwd

mvn -e package -DskipTests

if [ "$?" -ne 0 ]; then
    echo "Failed, exiting build script"
    exit 0;
fi

if [ "$1" == "run" ]; then
    docker build -t helpdeskapi .
    docker run -p 8080:8080 helpdeskapi
fi


if [ ! -f ".helpdesk_db_created" ]; then
    echo "helpdesk_db is not created"
fi
