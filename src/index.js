const fs = require("fs");
const config = require("../config.json");
const { token } = require("../auth.json");
const {Client} = require("./util/client.js");
const { oneLine, stripIndents } = require("common-tags");
const { version } = require("../package.json");
const sqlite = require("sqlite");
const path = require("path");
const commando = require("discord.js-commando");
const client = new Client({
  owner: config.owner,
  commandPrefix: config.prefix,
  unknownCommandResponse: false,
  messageCacheMaxSize: 100,
  messageCacheLifetime: 1000 * 60 * 60 * 24 * 7,
  messageSweepInterval: 1000 * 60 * 60 * 24 * 7,
  defaultCommandOptions: {
    hidden: true,
  },
  services: {
    nekoslife: new (require("nekos.life"))()
}
})
  .on("disconnect", () => {
    console.warn("Disconnected!");
  })
  .on("reconnecting", () => {
    console.warn("Reconnecting...");
  })
  .on("commandError", (cmd, err) => {
    if (err instanceof commando.FriendlyError) return;
    console.error(`Error in command ${cmd.groupID}:${cmd.memberName}`, err);
  })
  .on("commandBlocked", (msg, reason) => {
    console.log(oneLine`
        Command ${
          msg.command ? `${msg.command.groupID}:${msg.command.memberName}` : ""
        }
        blocked; ${reason}
    `);
  })
  .on("commandPrefixChange", (guild, prefix) => {
    console.log(oneLine`
        Prefix ${
          prefix === "" ? "removed" : `changed to ${prefix || "the default"}`
        }
        ${guild ? `in guild ${guild.name} (${guild.id})` : "globally"}.
    `);
  })
  .on("commandStatusChange", (guild, command, enabled) => {
    console.log(oneLine`
        Command ${command.groupID}:${command.memberName}
        ${enabled ? "enabled" : "disabled"}
        ${guild ? `in guild ${guild.name} (${guild.id})` : "globally"}.
    `);
  })
  .on("groupStatusChange", (guild, group, enabled) => {
    console.log(oneLine`
        Group ${group.id}
        ${enabled ? "enabled" : "disabled"}
        ${guild ? `in guild ${guild.name} (${guild.id})` : "globally"}.
    `);
  });

client
  .setProvider(
    sqlite
      .open(path.join(__dirname, "settings.sqlite3"))
      .then((db) => new commando.SQLiteProvider(db))
  )
  .catch(console.error);

client.registry
  .registerDefaults()
  .registerGroups([
    ["music", "Music related commands"],
    ["actions", "Actions"],
    ["mod", "Moderation commands"],
    ["fun", "Fun commands"],
    ["bl", "Global Blacklist Commands"],
  ])
  //.registerTypesIn(path.join(__dirname, 'types'))
  .registerCommandsIn(path.join(__dirname, "commands"));
function getEnviron() {
    var { existsSync } = require('fs');
    var { join } = require('path')
    if (existsSync(join(__dirname, 'auth.json'))){
      var cfg = require(join(__dirname, 'auth.json'));
      if (cfg.hasOwnProperty('token')){
        return {
          token: cfg.token,
        };
      };
    };
    var cfg = process.env;
    if (cfg.hasOwnProperty('token')){
      return {
        token: cfg.token,
      };
    };
    return {
      token: null,
    };
  }
  
  client.login(token)