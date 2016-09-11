#!/usr/bin/env bash
curl "http://api.randomuser.me/?results=1000&format=pretty&noinfo" | mongoimport --db test --collection users --drop
