#!/bin/bash

# Preview script - starts local Hugo server
# Usage: ./preview.sh

echo "Starting Hugo development server..."
echo "Site will be available at http://localhost:1313"
echo "Press Ctrl+C to stop"

hugo server --buildDrafts --bind 0.0.0.0
