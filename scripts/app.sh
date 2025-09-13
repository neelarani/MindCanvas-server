#! /bin/bash

CONDITION=$1

case $CONDITION in
"build")
  tsc --build
  tsc-alias
  echo "application has been builded"
  ;;
"dev")
  NODE_ENV=development bun --watch --require tsconfig-paths/register ./src/index.ts
  ;;
"start")
  NODE_ENV=production bun ./dist/index.js
  ;;
*)
  echo "The $CONDITION is unknown"
  ;;
esac
