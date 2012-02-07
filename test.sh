#!/bin/sh

curl -X POST -H "Content-Type: application/json" -d '{"name": "nyan.cat", "data": "13.37.13.37", "ttl": 600}' http://127.0.0.1:3002/
dig @127.0.0.1 -p 15353 nyan.cat
