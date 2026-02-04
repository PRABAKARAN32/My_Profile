#!/bin/bash
set -e

TARGET_DIR="$DEPLOY_WORK"

echo "Starting deployment..."

cd React_folder

npm install
npm run build

mv dist myprofile

mv myprofile "$TARGET_DIR/"

# rm -rf /home/$USER/htdocs/Myprofile
# mv Myprofile /home/$USER/htdocs/Myprofile


echo "Deployment completed"
