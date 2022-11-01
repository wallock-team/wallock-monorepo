#!/bin/bash

# Install NVM
curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.34.0/install.sh | bash
. ~/.nvm/nvm.sh

# Install Node and NPM through NVM
nvm install 16
nvm alias default 16

# Node version and NPM version
node --version
npm --version

# Install PNPM
npm install --global pnpm
npm install --global pm2
