#!/bin/bash
set -e

# check npm is install or not, if not installed, then try to install it.
if ! command -v npm &> /dev/null
then
    echo "npm could not be found, trying to install it..."
    if command -v apt-get &> /dev/null; then
        sudo apt-get update
        sudo apt-get install -y npm
    elif command -v yum &> /dev/null; then
        sudo yum install -y npm
    else
        echo "Unsupported package manager. Please install npm manually."
        exit 1
    fi
fi

TARGET_DIR="$DEPLOY_WORK"

echo "Starting deployment..."

cd React_folder

npm install
npm run build

mv dist myprofile

rm -rf "$TARGET_DIR/myprofile"

mv myprofile "$TARGET_DIR/"

echo "Deployment completed"