#!/bin/bash

# copy <subproject>/build/reports/tests/test directories to path specified by $1
for i in $( find . -type d -regex ".*/build/reports/tests/test" ); do
	mkdir -p $1/$i
	cp -r $i $1/$i/..
done
