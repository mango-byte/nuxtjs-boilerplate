FROM mcr.microsoft.com/playwright:focal

LABEL maintainer="s.chantouch@mango-byte.com"

# Create the working folder
RUN mkdir -p /usr/src/nuxt-app
WORKDIR /usr/src/nuxt-app

# Install project dependencies from the package.json files
COPY package.json \
  yarn.lock \
  ./
RUN yarn --pure-lockfile --no-cache

# Get the DD Room Client code
COPY . .

# Run the application
ENV HOST 0.0.0.0
EXPOSE 8000
CMD [ "yarn", "dev" ]
