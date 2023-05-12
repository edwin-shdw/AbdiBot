# Setup Development Environment

1. **Get the git repository**

    ```shell
        git clone https://github.com/edwin-shdw/AbdiBot.git
    ```

2. **Install packages**

    ```shell
        npm install
    ```
    Also, make sure that [Node.js](https://nodejs.org/) 16.9.0 or newer is installed on your machine as `discord.js` requires this.

3. **Configure environment**
    
    Create a `config.js` file in the directory root and fill all needed values:
    ```json
    {
        "applicationID": "application-ID",
        "botToken": "token",
        "guildID": "ID-of-guild"
    }
    ```
    This file contains sensitive information and should not be tracked by git. Also don't share it with others as long as they don't contribute to this project.

4. **Run bot**

    Start the bot from the root of the directory via `Node.js`:
    ```shell
    node index.js
    ```
    To make development easier and less painfull it's encourage to use [nodemon](https://www.npmjs.com/package/nodemon) or [node-supervisor](https://www.npmjs.com/package/supervisor) which will restart the node application when file changes are detected.

5. **Developing**

    Make sure to set the bot's status to `idle` or `dnd` while testing or developing to clarify that the bot could be restricted in use.

6. **Usefull links**
    - [discord.js](https://discord.js.org/#/)
    - [discord.js Guide](https://discordjs.guide/#before-you-begin)
    - [Discord Developer Portal](https://discord.com/developers)
    - [BSZ III Server](https://discord.com/invite/Hp6v3ry7Us)
