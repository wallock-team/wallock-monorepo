#!/bin/bash

# Install NVM
curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.2/install.sh | bash\

# Reset Bash profile to update NVM configuration
source ~/.bashrc

# Install Node 16 and set it as the default version
nvm install 16
nvm alias default 16

# Install PNPM
pnpm install --global pnpm
pnpm install --global pm2
