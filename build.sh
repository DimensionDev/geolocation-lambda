#!/bin/bash
set -x
ncc build -m lambda.ts
cp *.mmdb dist
zip -j dist.zip dist/*
