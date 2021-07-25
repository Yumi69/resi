const { Command } = require('discord.js-commando');
const { MessageEmbed } = require('discord.js');
const sf = require('snekfetch')

module.exports = class KissCommand extends Command {
    constructor(client) {
        super(client, {
          name: 'kiss',
          memberName: 'kiss',
          group: 'actions',
          description: 'Kisses a user!',
          guildOnly: true,
          args: [
            {
              key: 'to',
              prompt:
                'Who do you want to kiss?',
              type: 'user',
            },
          ],
        });
    }
    async run(message, { to }){
        var img = (await this.client.services.nekoslife.sfw.hug()).url;
        var emb = new MessageEmbed()
            .setImage(img)
            
        message.say(`<@!${message.member.id}> kisses <@!${to.id}>`, {embed: emb})
    }
    
}
