#!/bin/bash

# Inputs
DEPLOY_IMAGE="$1"

# Extract the image name without the tag (before the colon)
IMAGE_NAME=$(echo "$DEPLOY_IMAGE" | sed 's/:.*//')

# Extract the tag (after the colon) for pulling the image
IMAGE_TAG=$(echo "$DEPLOY_IMAGE" | sed 's/.*://')

# Step 1: Find and stop old containers
old_containers=$(docker ps --format "{{.ID}} {{.Image}}" | awk -F '[: ]' '$2=="prabakaran32/portfolio" {print $1}')

if [ ! -z "$old_containers" ]; then
  echo "Stopping and removing old containers..."
  docker stop $old_containers
  docker rm -f $old_containers
else
  echo "No old containers found. Continuing deployment..."
fi

# Step 2: Pull the new image with the tag
echo "Pulling new image: $DEPLOY_IMAGE"
docker pull "$DEPLOY_IMAGE"

# Step 3: Run the new container
echo "Running new container from: $DEPLOY_IMAGE"
docker run -d -p 80:80 "$DEPLOY_IMAGE"