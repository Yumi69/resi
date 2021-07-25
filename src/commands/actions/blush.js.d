const { Command } = require('discord.js-commando');
const { MessageEmbed } = require('discord.js');
const sf = require('snekfetch')

module.exports = class BlushCommand extends Command {
    constructor(client) {
        super(client, {
          name: 'blush',
          memberName: 'blush',
          group: 'actions',
          description: 'Blush with an anime gif!',
          guildOnly: true,
        });

    }
    async run(message,){
        var img = (await this.client.services.nekoslife.sfw.blush()).url
        var emb = new MessageEmbed()
            .setImage(img)
            .setTitle(`<@!${message.member.id}> blushes`)
        message.say({embed: emb})
    }
    
}
async function getImg(){
  var resp = await sf.get('https://tnai.ml/sfw/blush')
  return resp.body.url;
}