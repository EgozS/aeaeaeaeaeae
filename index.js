const { Client, Collection } = require("discord.js-12");
const config = require('./config.json');
token = process.env.TOKEN;

const client = new Client({
    disableEveryone: true
})

client.commands = new Collection();
client.aliases = new Collection();

["command"].forEach(handler => {
    require(`./handlers/${handler}`)(client);
});

client.on("ready", () => {
    console.log(`Logged in as ${client.user.tag}!, And the bot is in ${client.guilds.cache.size} servers`);
    client.user.setActivity(`ææææææææææææææææææææææææææææææææ`, { type: "WATCHING" })
})

client.on("message", async message => {
    //if (message.author.bot) return;
    if (!message.guild) return;
    if (!message.content.startsWith(config.prefix)) return;

    // If message.member is uncached, cache it.
    if (!message.author) message.author = await message.guild.members.fetch(message);

    const args = message.content.slice(config.prefix.length).trim().split(/ +/g);
    const cmd = args.shift().toLowerCase();
    
    if (cmd.length === 0) return;
    
    // Get the command
    let command = client.commands.get(cmd);
    // If none is found, try to find it by alias
    if (!command) command = client.commands.get(client.aliases.get(cmd));

    // If a command is finally found, run the command
    if (command) 
        command.run(client, message, args);
});

client.login(token);
