#!/bin/bash
# Remove `.expo` from git index and delete local folder if exists
set -e
if [ -d ".expo" ]; then
  echo "Removing .expo folder from git index (if tracked) and deleting local folder..."
  git rm -r --cached .expo || true
  rm -rf .expo || true
  echo ".expo removed locally. Don't forget to commit the change: git commit -m 'Remove local .expo from repository'"
else
  echo ".expo directory not found in project root"
fi

echo "Done. Make sure .expo/ is present in .gitignore before pushing changes."
