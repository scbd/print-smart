#!/bin/sh

if [ -z "$1" ]
then
 echo Missing tag number
 exit -1;
fi


docker build -t scbd/printsmart-distribution:$1 git@github.com:scbd/printsmart-distribution.git && \
docker push scbd/printsmart-distribution:$1
