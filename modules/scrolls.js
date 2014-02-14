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
				callback(null, helpers.reply('Statistics for ' + data.data.name + ': Rating: ' + data.data.rating + ', Rank: ' + data.data.rank + ', Played: ' + data.data.played + ', Won: ' + data.data.won + ' (' + Math.floor(data.data.won / data.data.played * 100) + '%), Judgement won: ' + data.data.judgementwon + ', Ranked won: ' + data.data.rankedwon + ', Last game played: ' + this.FormatTime(data.data.lastgame)));
			} else {
				return callback('Player not found');
			}
		});
	},
	FormatTime: function(diff){
		if (diff < 10){
			return "just now";
		}
		
		var strs = ['second', 'minute', 'hour', 'day', 'week', 'month'];

		var duration = [1, 60, 3600, 86400, 604800, 2630880];
		var no = 0;
		
		var i = duration.length;
		for (i -= 1; (i >= 0) && ((no = diff / duration[i]) < 1); i--){
			
		}
		
		no = Math.floor(no); 
		if (no > 1) {
			strs[i] += 's';
		}
		return no + " " + strs[i] + " ago";
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
		Text: 'Displays information about a scroll',
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
				var rarities = [ 'Common', 'Uncommon', 'Rare' ];
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
				lines.push('Kind: ' + data.data.kind + ', Rarity: ' + rarities[data.data.rarity]);
				if (data.data.kind == "CREATURE" || data.data.kind == "STRUCTURE"){
					lines[0] +=  + ', Types: ' + data.data.types + cost + ', AP/AC/HP: ' + data.data.ap + '/' + data.data.ac + '/' + data.data.hp;
				}
				lines.push('Description: \'' + data.data.description + '\', Flavor: \'' + data.data.flavor + '\'');
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