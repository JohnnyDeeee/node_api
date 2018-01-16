#!/usr/bin/env bash

mongoimport --db node_api --collection users --type json --file seed_users.json --jsonArray

mongoimport --db node_api --collection actors --type json --file seed_actors.json --jsonArray

mongoimport --db node_api --collection movies --type json --file seed_movies.json --jsonArray
