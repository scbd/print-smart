#!/bin/sh

docker build -t localhost:5000/printsmart-distribution git@github.com:scbd/printsmart-distribution.git

docker push localhost:5000/printsmart-distribution
