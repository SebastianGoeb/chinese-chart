#!/usr/bin/env bash

sqlite3 -readonly \
  "$HOME/Library/Application Support/Anki2/User 1/collection.anki2" \
  <./scripts/hsk_notes.sql \
  >./src/assets/new_hsk_anki_notes.tsv
