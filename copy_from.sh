#!/bin/bash

# source folder
TARGET_DIR="../xxq-tap4.ai-webui"
# current folder file to keep
KEEP_FILE="copy_from.sh"

# Clear the current directory (except the .git directory and the file to keep)
find . -not -name .git -not -path './.git/*' -not -name "$KEEP_FILE" -delete

# Sync files from the target directory to the current directory, excluding the node_modules directory
rsync -av --exclude='node_modules' --exclude='.next' --exclude='.vscode' --exclude='.git' "$TARGET_DIR/" ./

echo "Complete to copy code to current directory."