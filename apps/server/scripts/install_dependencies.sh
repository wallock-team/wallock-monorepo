#!/bin/bash

echo "Entered BeforeInstall"

# Install NVM
curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.2/install.sh | bash\
export NVM_DIR="$([ -z "${XDG_CONFIG_HOME-}" ] && printf %s "${HOME}/.nvm" || printf %s "${XDG_CONFIG_HOME}/nvm")"
[ -s "$NVM_DIR/nvm.sh" ] && \. "$NVM_DIR/nvm.sh" # This loads nvm

# Install Node 16 and set it as the default version
nvm install 16
nvm alias default 16

# Install PNPM
npm install --global pnpm

echo "Exiting BeforeInstall..."
