var request = require('request');

var LastStatusData = {};

var GetStatus = function(ip, callback) {
	var parts = ip.split(':');
	if(parts.length == 1) {
		parts[1] = '25565';
	}

	request('http://json.mcs.syfaro.net/' + parts[0] + '/' + parts[1], function(err, response, body) {
		if(err) return;

		var info = JSON.parse(body);

		callback(info);
	});
};

var CheckLastServer = {
	Name: 'Check Last Server',
	Command: {
		Type: 'regex',
		regex: /^\.cs ?$/i
	},
	Run: {
		Channels: ['debug', 'minecrafthelp']
	},
	Help: {
		Text: 'Displays status information of the last Minecraft server posted',
		Example: '.cs'
	},
	RunFunction: function(trigger, helpers, irc, callback) {
		if(LastStatusData[trigger.to] !== undefined) {
			GetStatus(LastStatusData[trigger.to], function(Status) {
				if(Status.status == 'up') {
					callback(null, helpers.reply(LastStatusData[trigger.to] + ' is up! There are currently ' + Status.players_online + ' players online, has a total of ' + Status.players_max + ' slots, and is running server version ' + Status.server_version));
				} else {
					callback(null, helpers.reply(LastStatusData[trigger.to] + ' appears to be down! Are you sure the server is online?'));
				}
			});
		}
	}
};

var CheckServer = {
	Name: 'Check Server',
	Command: {
		Type: 'regex',
		regex: /^\.cs ((?:(?:(?:\d{1,3})\.(?:\d{1,3})\.(?:\d{1,3})\.(?:\d{1,3}))(?:(?::\d{1,5}))?)|(?:\S+\.\S{1,5}(?:\d{1,5})?)) ?$/i
	},
	Run: {
		Channels: ['debug', 'minecrafthelp']
	},
	Help: {
		Text: 'What does it do',
		Example: '.cs c.nerd.nu'
	},
	RunFunction: function(trigger, helpers, irc, callback) {
		GetStatus(trigger.args[1], function(Status) {
			if(Status.status == 'up') {
				callback(null, helpers.reply(LastStatusData[trigger.to] + ' is up! There are currently ' + Status.players_online + ' players online, has a total of ' + Status.players_max + ' slots, and is running server version ' + Status.server_version));
			} else {
				callback(null, helpers.reply(LastStatusData[trigger.to] + ' appears to be down! Are you sure the server is online?'));
			}
		});
	}
};

var SaidServer = {
	Name: 'Said Server',
	Command: {
		Type: 'regex',
		regex: /((?:(?:(?:\d{1,3})\.(?:\d{1,3})\.(?:\d{1,3})\.(?:\d{1,3}))(?:(?::\d{1,5}))?)|(?:\S+\.\S{1,5}(?:\d{1,5})?)) ?/i
	},
	Run: {
		Channels: ['debug', 'minecrafthelp']
	},
	Help: {
		Text: 'Stores servers in variable for .cs command',
		Example: 'any server IP'
	},
	RunFunction: function(trigger, helpers, irc, callback) {
		LastStatusData[trigger.to] = trigger.args[1];
	}
};

RegisterCommand(CheckLastServer);
RegisterCommand(SaidServer);
RegisterCommand(CheckServer);