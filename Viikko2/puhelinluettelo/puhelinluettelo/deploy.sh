#!/bin/sh
npm run build
rm -rf ../../../../FullStack2019-part2/viikko3/personbackend/build
cp -r build ../../../../FullStack2019-part2/viikko3/personbackend