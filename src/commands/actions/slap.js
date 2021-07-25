const { Command } = require('discord.js-commando');
const { MessageEmbed } = require('discord.js');
const sf = require('snekfetch')

module.exports = class SlapCommand extends Command {
    constructor(client) {
        super(client, {
          name: 'slap',
          memberName: 'slap',
          group: 'actions',
          description: 'Slaps a user!',
          guildOnly: true,
          args: [
            {
              key: 'to',
              prompt:
                'Who do you want to slap?',
              type: 'user',
            },
          ],
        });
    }
    async run(message, { to }){
      var img = (await this.client.services.nekoslife.sfw.slap()).url;
      var emb = new MessageEmbed()
            .setImage(img)
        message.say(`<@!${message.member.id}> slaps <@!${to.id}>`, {embed: emb})
    }
    
}
async function getImg(){
  var resp = await sf.get('https://tnai.ml/sfw/slap')
  return resp.body.url;
}