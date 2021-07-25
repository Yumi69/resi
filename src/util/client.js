const { Client: CommandoClient } = require('discord.js-commando');

module.exports.Client = class Client extends CommandoClient {
    get services() {
        return this._services;
    }

    constructor(...args) {
        super(...args);
        this._services = args[0].services || {};
    }
    getService(name) {
        return this._services[name] || null;
    }
}