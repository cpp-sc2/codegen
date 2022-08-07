#!/usr/bin/env bash

set -euxo pipefail

rm -rf ./dist
mkdir dist

for version in 4.10.0 4.10.4 5.0.10 5.0.5; do
    npm run generate ./assets/${version}-stableid.json

    cp dist/sc2_typeenums.h ../cpp-sc2/include/sc2api/typeids/sc2_${version}_typeenums.h
    mv dist/sc2_typeenums.cpp ../cpp-sc2/src/sc2api/typeids/sc2_${version}_typeenums.cpp
done
