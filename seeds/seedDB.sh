#!/usr/bin/env bash

mongoimport --db node_api --collection users --type json --file seed_users.json --jsonArray

mongoimport --db node_api --collection groups --type json --file seed_groups.json --jsonArray
