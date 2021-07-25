const { Command } = require("discord.js-commando");
const { MessageEmbed } = require("discord.js");
const sf = require('snekfetch')

module.exports = class HugCommand extends Command {
    constructor(client) {
        super(client, {
          name: "hug",
          memberName: "hug",
          group: "actions",
          description: "Hugs a user!",
          guildOnly: true,
          args: [
            {
              key: "to",
              prompt:
                "Who do you want to hug?",
              type: "user",
            },
          ],
        });
    }
    async run(message, { to }){
        var img = (await this.client.services.nekoslife.sfw.hug()).url;
        var emb = new MessageEmbed()
            .setImage(img)
            
        message.say(`<@!${message.member.id}> hugs <@!${to.id}>`, {embed: emb})
    }
    
}
