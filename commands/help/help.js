const Discord = require('discord.js-12');  

const { prefix } = require('../../config.json');

module.exports = {
	name: 'help',
    category: "help",
    description: "Gives command list",
    run: async (client, message, args) => {
		const data = [];
		const { commands } = message.client;

		if (!args.length) {

            const embed = new Discord.MessageEmbed()
               .setTitle('Here\'s a list of all my commands:')
               .addFields(
                  { name: '**Commands:**', value: commands.map(command => command.name).join(', ') },
                  { name: '\u200B', value: `For help on a specific command send: \`${prefix}help [command name]\``}
               )
   
            return message.channel.send({embed: embed})
               
         }

		const name = args[0].toLowerCase();
		const command = commands.get(name) || commands.find(c => c.aliases && c.aliases.includes(name));

		if (!command) {
			return message.reply('that\'s not a valid command!');
		}

		data.push(`**Name:** ${command.name}`);
      
      const anotherEmbed = new Discord.MessageEmbed()
               .addFields(
                  { name: '**Name:**', value: command.name },
                  { name: '**Description:**', value: `${command.description}`},
                  { name: '**Usage:**', value: `${prefix}${command.name} ${command.usage}`},
               )
		if (command.aliases) data.push(`**Aliases:** ${command.aliases.join(', ')}`);
		if (command.description) data.push(`**Description:** ${command.description}`);
		if (command.usage) data.push(`**Usage:** ${prefix}${command.name} ${command.usage}`);
		message.channel.send({embed: anotherEmbed});
	},
};