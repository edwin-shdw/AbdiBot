# Setup Development Environment

1. **Get the git repository**

    ```shell
        git clone https://github.com/edwin-shdw/AbdiBot.git
    ```

2. **Install packages**

    ```shell
        npm install
    ```
    Also, make sure that [Node.js](https://nodejs.org/) 16.9.0 or newer is installed on your machine
    as `discord.js` requires this.

3. **Configure environment**
    
    Copy and rename the `config.public.json` file to `config.json` (`src/configs/*`) and fill all
    needed values. This file contains sensitive information and should not be tracked by git.

4. **Run bot**

    Start the bot with the start script:
    ```shell
    npm start
    ```

    To make development easier and less painfull you can start the bot in dev mode:
    ```shell
    npm run develop
    ```
    This will start the bot with [ts-node](https://www.npmjs.com/package/ts-node) and
    [nodemon](https://www.npmjs.com/package/nodemon) which will restart the node application
    whenever file changes are detected. Thanks to ts-node running a new build on each file change
    is no longer required.

5. **Deployment**

    Command registration to the Discord API can be done with the `deploy` script:
    ```shell
    npm run deploy
    ```
    Keep in mind that you will need to run a build before. (At least for the `deploy-commands`
    script)

6. **Usefull links**
    - [discord.js](https://discord.js.org/#/)
    - [discord.js Guide](https://discordjs.guide/#before-you-begin)
    - [Discord Developer Portal](https://discord.com/developers)
    - [BSZ III Server](https://discord.com/invite/Hp6v3ry7Us)
