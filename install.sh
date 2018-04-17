#!/bin/bash

targets=(/Applications/"Adobe Illustrator"*/Presets*/*/Scripts)

for file in *.js*
do
  destination=$targets/${file//_/ }
  >&2 printf 'Copying %s to %s\n' "$file" "$destination"
  cp -n "$file" "$destination"
done
