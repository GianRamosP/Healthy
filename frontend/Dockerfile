FROM node:lts-alpine as builder

RUN mkdir /app
WORKDIR /app

RUN npm install -g create-react-app

COPY package*.json ./

RUN npm ci

COPY . .

CMD ["npm", "start"]

FROM builder as dev-envs

RUN <<EOF
apk update
apk add --no-cache git
EOF

RUN <<EOF
adduser -D -s /bin/sh vscode
EOF

# install Docker tools (cli, buildx, compose)
COPY --from=gloursdocker/docker / /

CMD ["npm", "start"]
