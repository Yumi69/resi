const { MessageEmbed } = require('discord.js');
const { Command } = require('discord.js-commando');

module.exports = class ServerInfoCommand extends Command {
    constructor(client) {
        super(client, {
            name: 'serverinfo',
            aliases: ['server-info', 'serverinfo'],
            group: 'util',
            memberName: 'serverinfo',
            description: 'Get server info.',
            details: 'Get server info.',
            guildOnly: true,
            throttling: {
                usages: 2,
                duration: 3
            }
        });
    }
    async run(msg) {
        const embed = new MessageEmbed({
            color: 0x00FF00,
            description: `**Server Info:**\n${msg.guild.name} (${msg.guild.id})`
        });
        embed.setFooter(`Server ID: ${msg.guild.id}`);
        embed.setThumbnail(msg.guild.iconURL);
        embed.addField('Owner', `${msg.guild.owner?`${msg.guild.owner?.user.tag} (${msg.guild.owner?.id})`:"The owner seems to not exist (is falsey), luckily we caught this error!"}`, true);
        embed.addField('Members', `${msg.guild.memberCount}`, true);
        embed.addField('Region', msg.guild.region, true);
        embed.addField('Created At', `${msg.guild.createdAt}`, true);
        embed.addField('Cached Channels', `${msg.guild.channels.cache.size}`, true);
        embed.addField('Cached Roles', `${msg.guild.roles.cache.size}`, true);
        embed.addField('Cached Emojis', `${msg.guild.emojis.cache.size}`, true);
        msg.say({embed});
    }
};