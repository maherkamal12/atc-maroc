#!/usr/bin/env bash
#
# One-shot preview launcher.
#
# `node_modules/` and `.next/` are not preserved between sessions, so this
# script reinstalls and rebuilds only when something is actually missing, then
# starts the production server bound to 0.0.0.0 so the preview proxy can reach it.
#
#   bash scripts/preview.sh
#
set -euo pipefail

cd "$(dirname "$0")/.."
PORT="${PORT:-3000}"

if [ ! -d node_modules ]; then
  echo "→ dependencies missing — running npm ci"
  npm ci
else
  echo "→ dependencies present"
fi

if [ ! -f .next/BUILD_ID ]; then
  echo "→ production build missing — running npm run build"
  npm run build
else
  echo "→ production build present"
fi

echo "→ starting server on 0.0.0.0:${PORT}"
exec npx next start -H 0.0.0.0 -p "$PORT"
