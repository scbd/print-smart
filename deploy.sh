#!/bin/sh

docker build -t scbd/printsmart-distribution git@github.com:scbd/printsmart-distribution.git

docker push scbd/printsmart-distribution
