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
};

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
};

var ScrollsCardInfoCommand = {
	Name: 'Scrolls Card Info',
	Command: {
		Type: 'command',
		Key: 'scroll'
	},
	Run: {
		Channels: ['debug', 'scrolls', 'scrollshelp']
	},
	Help: {
		Text: 'Displays information about a Scroll',
		Example: '.scroll sister of the fox'
	},
	RunFunction: function(trigger, helpers, irc, callback) {
		request('http://a.scrollsguide.com/scrolls?name=' + trigger.args[1].replace(/ /g, '+') + '&norules', function(err, response, body) {
			try {
				var data = JSON.parse(body);
			} catch (e) {
				callback('API error');
			}

			if(data.msg == 'success') {
				var cost = '';
				data.data = data.data[0];
				if(data.data.costgrowth > 0) {
					cost = ', Cost: ' + data.data.costgrowth + ' growth';
				} else if(data.data.costorder > 0) {
					cost = ', Cost: ' + data.data.costorder + ' order';
				} else if(data.data.costenergy > 0) {
					cost = ', Cost: ' + data.data.costenergy + ' energy';
				}
				var lines = [];
				lines.push('Kind: ' + data.data.kind + ', Types: ' + data.data.types + cost + ', AP: ' + data.data.ap + ', AC: ' + data.data.ac + ', HP: ' + data.data.hp);
				lines.push('Description: ' + data.data.description);
				callback(null, helpers.reply(lines));
			} else {
				callback('Scroll not found');
			}
		});
	}
};

RegisterCommand(ScrollsOnlineCommand);
RegisterCommand(ScrollsStatsCommand);
RegisterCommand(ScrollsPlayerCommand);
RegisterCommand(ScrollsCardInfoCommand);