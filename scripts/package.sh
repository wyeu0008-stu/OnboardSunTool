#!/usr/bin/env bash
set -euo pipefail

ROOT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
DIST_DIR="$ROOT_DIR/dist"
STAGE_DIR="$DIST_DIR/page1-framework"
ZIP_FILE="$DIST_DIR/page1-framework-ver1.zip"

rm -rf "$STAGE_DIR" "$ZIP_FILE"
mkdir -p "$STAGE_DIR/src/components"

cp "$ROOT_DIR/index.html" "$STAGE_DIR/"
cp "$ROOT_DIR/README.md" "$STAGE_DIR/"
cp "$ROOT_DIR/src/app.js" "$STAGE_DIR/src/"
cp "$ROOT_DIR/src/style.css" "$STAGE_DIR/src/"
cp "$ROOT_DIR/src/components/"*.js "$STAGE_DIR/src/components/"

(
  cd "$DIST_DIR"
  zip -rq "$(basename "$ZIP_FILE")" "$(basename "$STAGE_DIR")"
)

echo "Package created: $ZIP_FILE"
