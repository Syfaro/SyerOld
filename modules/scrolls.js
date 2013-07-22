var request = require('request');

var ScrollsOnlineCommand = {
	Name: 'Scrolls Players Online',
	Command: {
		Type: 'command',
		Key: 'online'
	},
	Run: {
		Channels: ['debug', 'scrolls', 'scrollshelp']
	},
	Help: {
		Text: 'Displays scrolls players currently online',
		Example: '.online'
	},
	RunFunction: function(trigger, helpers, irc, callback) {
		request('http://a.scrollsguide.com/online', function(err, response, body) {
			try {
				var data = JSON.parse(body);
			} catch (e) {
				return callback(helpers.reply('Issue with API'));
			}

			if(data.msg == 'success') {
				callback(null, helpers.reply('Scrolls players currently online: ' + data.data.online));
			} else {
				callback(helpers.reply('Issue with API'));
			}
		});
	}
};

var ScrollsStatsCommand = {
	Name: 'Scrolls Stats',
	Command: {
		Type: 'command',
		Key: 'stats'
	},
	Run: {
		Channels: ['debug', 'scrolls', 'scrollshelp']
	},
	Help: {
		Text: 'Displays various scrolls stats',
		Example: '.stats'
	},
	RunFunction: function(trigger, helpers, irc, callback) {
		request('http://a.scrollsguide.com/statistics', function(err, response, body) {
			try {
				var data = JSON.parse(body);
			} catch (e) {
				return callback(helpers.reply('Issue with API'));
			}

			if(data.msg == 'success') {
				callback(null, helpers.reply('Online today: ' + data.data.onlinetoday + ', Gold Earned: ' + data.data.goldearned + ', Games played: ' + data.data.gamesplayed + ', Total users: ' + data.data.totalusers));
			} else {
				return callback(helpers.reply('Issue with API'));
			}
		});
	}
}

var ScrollsPlayerCommand = {
	Name: 'Scrolls Player Stats',
	Command: {
		Type: 'command',
		Key: 'player'
	},
	Run: {
		Channels: ['debug', 'scrolls', 'scrollshelp']
	},
	Help: {
		Text: 'Displays information about a Scrolls player',
		Example: '.player Syfaro'
	},
	RunFunction: function(trigger, helpers, irc, callback) {
		if(!/(\w+) ?/i.test(trigger.args[1])) {
			return callback('Invalid usage');
		}

		var name = /(\w+) ?/.exec(trigger.args[1])[1];
		request('http://a.scrollsguide.com/player?name=' + name + '&fields=all', function(err, response, body) {
			try {
				var data = JSON.parse(body);
			} catch (e) {
				return callback(helpers.reply('Issue with API'));
			}

			if(data.msg == 'success') {
				callback(null, helpers.reply('Rating: ' + data.data.rating + ', Rank: ' + data.data.rank + ', Played: ' + data.data.played + ', Won: ' + data.data.won + ' (' + Math.floor(data.data.won / data.data.played * 100) + '%)'));
			} else {
				return callback('Player not found');
			}
		});
	}
}

RegisterCommand(ScrollsOnlineCommand);
RegisterCommand(ScrollsStatsCommand);
RegisterCommand(ScrollsPlayerCommand);