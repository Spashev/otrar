# otrarvue

> Google extension for OtrarTravel company.

## Build Setup

``` bash
# install nodejs 12
curl -sL https://deb.nodesource.com/setup_12.x | sudo -E bash -
sudo apt-get install -y nodejs
suod apt update
node -v # version 12
npm -v # version 6.10

#install @vue-cli
npm install -g @vue-cli

#install watch
npm install watch

#install axios
npm install axios --save

#install vue-axios
npm install vue-axios --save

#create vue-cli project
vue init kocal/vue-web-extension app_name

# install dependencies
cd app_name
npm install

# build for production with minification
npm run build

# serve with hot reload at localhost:8080
npm run watch:dev

```

For detailed explanation on how things work, consult the [docs for vue-loader](http://vuejs.github.io/vue-loader).