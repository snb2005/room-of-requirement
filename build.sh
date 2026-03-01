#!/bin/bash

# Build script for Technical Notebook
# Builds the Hugo site and prepares for deployment

echo "Building Technical Notebook..."

# Clean previous build
rm -rf public

# Build the site
hugo --minify

# Check if build was successful
if [ $? -eq 0 ]; then
    echo "Build successful! Files are in ./public/"
    echo "To deploy, push the contents of ./public/ to GitHub Pages"
else
    echo "Build failed!"
    exit 1
fi
