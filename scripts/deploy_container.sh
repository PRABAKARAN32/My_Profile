#!/bin/bash
set -e

echo "Starting deployment..."

cd React_folder

npm install
npm run build

cd ..

rm -rf ~/htdocs/Myprofile
mkdir -p ~/htdocs/Myprofile

mv React_folder/dist ~/htdocs/Myprofile/files

echo "Deployment completed"
