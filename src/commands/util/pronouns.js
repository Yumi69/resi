const { Command } = require("discord.js-commando");
const { MessageEmbed } = require("discord.js");
const { get } = require("../../util/get.js")
const oneLine = require("common-tags").oneLine;
const Unregistered =
  " has not set up %s's pronoundb account yet! %s can do that here: https://pronoundb.org";
const Pronouns = Object.freeze({
  unspecified:
    " has not set up %s's pronouns on pronoundb yet! %s can do that here: https://pronoundb.org",
  avoid: " is not ok with any pronouns! use %s's name!",
  any: " is ok with any pronouns!",
  hh: "'s pronouns are he/him",
  hs: "'s pronouns are he/she",
  ht: "'s pronouns are he/they",
  shh: "'s pronouns are she/he",
  sh: "'s pronouns are she/her",
  st: "'s pronouns are she/they",
  th: "'s pronouns are they/he",
  ts: "'s pronouns are they/she",
  tt: "'s pronouns are they/them",
  "": Unregistered,
  "undefined" : Unregistered
});

module.exports = class PronounsCommand extends Command {
  constructor(client) {
    super(client, {
      name: "pronouns",
      aliases: ["pr", "pronoun", "pronoundb"],
      memberName: "pronouns",
      group: "util",
      description: "Gets the pronouns of a user!",
      guildOnly: true,
      args: [
        {
          key: "user",
          prompt: "Who do you want to find the pronouns of?",
          type: "user",
        },
      ],
    });
  }
  async run(message, { user }) {
    let res = await get(
      `https://pronoundb.org/api/v1/lookup?platform=discord&id=${user.id}`
    );
    res = JSON.parse(res.toString())
      message.say(
        `${user.username}${Pronouns[String(res.pronouns)].replace(
          /\%s/gm,
          user.username
        )}`
      );
  }
};
