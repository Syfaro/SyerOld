var c = require('irc-colors');

var SendFactoid = {
	Name: 'Send Factoid',
	Command: {
		Type: 'regex',
		regex: /^(\?\?|--) (\S+) ?$/i
	},
	Run: {
		Channels: ['debug', 'scrollshelp']
	},
	Help: {
		Text: 'Sends a factoid into a channel',
		Example: '-- bot'
	},
	RunFunction: function(trigger, helpers, irc, callback) {
		var factoids = trigger.args[2].split(';');
		for(var i = 0; i < factoids.length; i++) {
			syer.SQL('shfact')
				.select()
				.where('name', factoids[i])
				.exec(function(err, rows) {
					if(err) {
						irc.say(trigger.to, err);
					}

					if(rows[0] === undefined) {
						irc.say(trigger.to, 'Unknown factoid');
					}

					var lines = rows[0].content.split(';;');
					for(var i = 0; i < lines.length; i++) {
						irc.say(trigger.to, lines[i]);
					}
				});
		}
	}
};

var SendFactoidUserPublic = {
	Name: 'Send Factoid User Public',
	Command: {
		Type: 'regex',
		regex: /^(\?\?>|->) (\S+) (\S+) ?$/i
	},
	Run: {
		Channels: ['debug', 'scrollshelp']
	},
	Help: {
		Text: 'Sends a factoid into a channel directed towards a user',
		Example: '-> Syfaro bot'
	},
	RunFunction: function(trigger, helpers, irc, callback) {
		var factoids = trigger.args[3].split(';');
		for(var i = 0; i < factoids.length; i++) {
			syer.SQL('shfact')
				.select()
				.where('name', factoids[i])
				.exec(function(err, rows) {
					if(err) {
						return irc.say(trigger.to, err);
					}

					if(rows[0] === undefined) {
						return irc.say(trigger.to, 'Unknown factoid');
					}

					var lines = rows[0].content.split(';;');
					for(var i = 0; i < lines.length; i++) {
						irc.say(trigger.to, c.bold(trigger.args[2]) + ': ' + lines[i]);
					}
				});
		}
	}
}

var SendFactoidUserPrivate = {
	Name: 'Send Factoid User Private',
	Command: {
		Type: 'regex',
		regex: /^(\?\?>>|>>) (\S+) (\S+) ?$/i
	},
	Run: {
		Channels: ['debug', 'scrollshelp']
	},
	Help: {
		Text: 'Sends a factoid to a user privately',
		Example: '>> Syfaro bot'
	},
	RunFunction: function(trigger, helpers, irc, callback) {
		var factoids = trigger.args[3].split(';');
		for(var i = 0; i < factoids.length; i++) {
			syer.SQL('shfact')
				.select()
				.where('name', factoids[i])
				.exec(function(err, rows) {
					if(err) {
						return irc.say(trigger.to, err);
					}

					if(rows[0] === undefined) {
						return irc.say(trigger.to, 'Unknown factoid');
					}

					var lines = rows[0].content.split(';;');
					for(var i = 0; i < lines.length; i++) {
						irc.notice(trigger.args[2], lines[i]);
					}
				});
		}
	}
}

var SendFactoidSelf = {
	Name: 'Send Factoid User Private',
	Command: {
		Type: 'regex',
		regex: /^(\?\?\<|<<) (\S+) ?$/i
	},
	Run: {
		Channels: ['debug', 'scrollshelp']
	},
	Help: {
		Text: 'Sends a factoid to yourself',
		Example: '<< bot'
	},
	RunFunction: function(trigger, helpers, irc, callback) {
		var factoids = trigger.args[2].split(';');
		for(var i = 0; i < factoids.length; i++) {
			syer.SQL('shfact')
				.select()
				.where('name', factoids[i])
				.exec(function(err, rows) {
					if(err) {
						return irc.notice(trigger.from, err);
					}

					if(rows[0] === undefined) {
						return irc.notice(trigger.from, 'Unknown factoid');
					}

					var lines = rows[0].content.split(';;');
					for(var i = 0; i < lines.length; i++) {
						irc.notice(trigger.from, lines[i]);
					}
				});
		}
	}
}

RegisterCommand(SendFactoid);
RegisterCommand(SendFactoidUserPublic);
RegisterCommand(SendFactoidUserPrivate);
RegisterCommand(SendFactoidSelf);