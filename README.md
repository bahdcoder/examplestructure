### Install NodeJS and NPM Packages
    sudo apt-get -y remove nodejs
    curl -sL https://deb.nodesource.com/setup_8.x -o nodesource_setup.sh
    sudo bash nodesource_setup.sh
    sudo apt-get -y install nodejs
    npm install npm@latest -g
    apt install -y node-gyp


### Install Adonis CLI
    npm i -g @adonisjs/cli

### Open Port 3333
    sudo ufw allow 3333
    sudo ufw reload
    
## Modify .env file for database details
    DB_CONNECTION=mysql
    DB_HOST=127.0.0.1
    DB_PORT=3306
    DB_USER=root
    DB_PASSWORD=
    DB_DATABASE=adonis

### Adonis Migrations Create Tables in Database
    adonis migration:run

### Run Server
    adonis serve --dev

### Put all publically available resources in public directory
    For example Images you need to create images folder in public and can access any file by simply using /images

### all template files are under resources folder 
    https://edge.adonisjs.com/
    https://edge.adonisjs.com/docs/getting-started
    