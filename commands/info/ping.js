const { DiscordAPIError, MessageEmbed } = require("discord.js-12");

module.exports = {
    name: "ping",
    usage: "",
    category: "info",
    description: "Returns latency",
    run: async (client, message, args) => {
       //make a discord emebed
       const embed = new MessageEmbed()
            .setColor("#9900ff")
            .setTitle("your ping:")
            .setDescription(`${client.ws.ping}ms`)
            message.channel.send({embed});
            
    }
}