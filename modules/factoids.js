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
		if(factoids.length >= 5) {
			return callback('Too many factoids to send at once');
		}

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
		if(factoids.length >= 5) {
			return callback('Too many factoids to send at once');
		}

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
		if(factoids.length >= 5) {
			return callback('Too many factoids to send at once');
		}

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
		if(factoids.length >= 5) {
			return callback('Too many factoids to send at once');
		}

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

// Commands for sending factoids
RegisterCommand(SendFactoid);
RegisterCommand(SendFactoidUserPublic);
RegisterCommand(SendFactoidUserPrivate);
RegisterCommand(SendFactoidSelf);

var SendFactoidArgs = {
	Name: 'Send Factoid',
	Command: {
		Type: 'regex',
		regex: /^(\?\?|--) (\S+) (.+) ?$/i
	},
	Run: {
		Channels: ['debug', 'scrollshelp']
	},
	Help: {
		Text: 'Sends a factoid into a channel with args',
		Example: '-- factoid arg1;arg2'
	},
	RunFunction: function(trigger, helpers, irc, callback) {
		var factoids = trigger.args[2].split(';');
		var allargs = trigger.args[3].split(';');
		if(factoids.length >= 5) {
			return callback('Too many factoids to send at once');
		}

		var args = 0;
		for(var i = 0; i < factoids.length; i++) {
			syer.SQL('shfact')
				.select()
				.where('name', factoids[i])
				.exec(function(err, rows) {
					var arg = allargs[args].split(' ');
					args++;

					if(err) {
						irc.say(trigger.to, err);
					}

					if(rows[0] === undefined) {
						return irc.say(trigger.to, 'Unknown factoid');
					}

					for(var j = 1; j <= arg.length; j++) {
						rows[0].content = rows[0].content.replace('$' + j, arg[j-1]);
					}

					var lines = rows[0].content.split(';;');
					for(var k = 0; k < lines.length; k++) {
						irc.say(trigger.to, lines[k]);
					}
				});
		}

		callback(null, null);
	}
};

var SendFactoidUserPublicArgs = {
	Name: 'Send Factoid User Public',
	Command: {
		Type: 'regex',
		regex: /^(\?\?>|->) (\S+) (\S+) (.+) ?$/i
	},
	Run: {
		Channels: ['debug', 'scrollshelp']
	},
	Help: {
		Text: 'Sends a factoid into a user in channel with args',
		Example: '-> user factoid arg1;arg2'
	},
	RunFunction: function(trigger, helpers, irc, callback) {
		var factoids = trigger.args[3].split(';');
		var allargs = trigger.args[4].split(';');
		if(factoids.length >= 5) {
			return callback('Too many factoids to send at once');
		}

		var args = 0;
		for(var i = 0; i < factoids.length; i++) {
			syer.SQL('shfact')
				.select()
				.where('name', factoids[i])
				.exec(function(err, rows) {
					var arg = allargs[args].split(' ');
					args++;

					if(err) {
						irc.say(trigger.to, err);
					}

					if(rows[0] === undefined) {
						return irc.say(trigger.to, 'Unknown factoid');
					}

					for(var j = 1; j <= arg.length; j++) {
						rows[0].content = rows[0].content.replace('$' + j, arg[j-1]);
					}

					var lines = rows[0].content.split(';;');
					for(var i = 0; i < lines.length; i++) {
						irc.say(trigger.to, c.bold(trigger.args[2]) + ': ' + lines[i]);
					}
				});
		}

		callback(null, null);
	}
};

var SendFactoidUserPrivateArgs = {
	Name: 'Send Factoid User Private',
	Command: {
		Type: 'regex',
		regex: /^(\?\?>>|>>) (\S+) (\S+) (.+) ?$/i
	},
	Run: {
		Channels: ['debug', 'scrollshelp']
	},
	Help: {
		Text: 'Sends a factoid into a user in private with args',
		Example: '-> user factoid arg1;arg2'
	},
	RunFunction: function(trigger, helpers, irc, callback) {
		var factoids = trigger.args[3].split(';');
		var allargs = trigger.args[4].split(';');
		if(factoids.length >= 5) {
			return callback('Too many factoids to send at once');
		}

		var args = 0;
		for(var i = 0; i < factoids.length; i++) {
			syer.SQL('shfact')
				.select()
				.where('name', factoids[i])
				.exec(function(err, rows) {
					var arg = allargs[args].split(' ');
					args++;

					if(err) {
						irc.say(trigger.to, err);
					}

					if(rows[0] === undefined) {
						return irc.say(trigger.to, 'Unknown factoid');
					}

					for(var j = 1; j <= arg.length; j++) {
						rows[0].content = rows[0].content.replace('$' + j, arg[j-1]);
					}

					var lines = rows[0].content.split(';;');
					for(var i = 0; i < lines.length; i++) {
						irc.notice(trigger.args[2], lines[i]);
					}
				});
		}

		callback(null, null);
	}
};

var SendFactoidSelfArgs = {
	Name: 'Send Factoid Self',
	Command: {
		Type: 'regex',
		regex: /^(\?\?\<|<<) (\S+) (.+) ?$/i
	},
	Run: {
		Channels: ['debug', 'scrollshelp']
	},
	Help: {
		Text: 'Sends a factoid into a user in private with args',
		Example: '-> user factoid arg1;arg2'
	},
	RunFunction: function(trigger, helpers, irc, callback) {
		var factoids = trigger.args[2].split(';');
		var allargs = trigger.args[3].split(';');
		if(factoids.length >= 5) {
			return callback('Too many factoids to send at once');
		}

		var args = 0;
		for(var i = 0; i < factoids.length; i++) {
			syer.SQL('shfact')
				.select()
				.where('name', factoids[i])
				.exec(function(err, rows) {
					var arg = allargs[args].split(' ');
					args++;

					if(err) {
						irc.say(trigger.to, err);
					}

					if(rows[0] === undefined) {
						return irc.say(trigger.to, 'Unknown factoid');
					}

					for(var j = 1; j <= arg.length; j++) {
						rows[0].content = rows[0].content.replace('$' + j, arg[j-1]);
					}

					var lines = rows[0].content.split(';;');
					for(var i = 0; i < lines.length; i++) {
						irc.notice(trigger.from, lines[i]);
					}
				});
		}

		callback(null, null);
	}
};

// Commands for sending factoids with arguments
RegisterCommand(SendFactoidArgs);
RegisterCommand(SendFactoidUserPublicArgs);
RegisterCommand(SendFactoidUserPrivateArgs);
RegisterCommand(SendFactoidSelfArgs);

var AddFactoidCommand = {
	Name: 'Add Factoid',
	Command: {
		Type: 'regex',
		regex: /^(\?\?\+|-\+) (\S+) (.+) ?$/i
	},
	Run: {
		Channels: ['debug', 'scrollshelp'],
		RequiredPermission: 'scrollshelp'
	},
	Help: {
		Text: 'What does it do',
		Example: '-+ name content'
	},
	RunFunction: function(trigger, helpers, irc, callback) {
		syer.SQL('shfact')
			.insert({
				name: trigger.args[2],
				content: trigger.args[3],
				uses: 0,
				setby: trigger.from
			})
			.exec(function(err) {
				callback(err, 'Added!');
			});
	}
};

var EditFactoidCommand = {
	Name: 'Edit Factoid',
	Command: {
		Type: 'regex',
		regex: /^(\?\?~|-~) (\S+) (.+) ?$/i
	},
	Run: {
		Channels: ['debug', 'scrollshelp'],
		RequiredPermission: 'scrollshelp'
	},
	Help: {
		Text: 'What does it do',
		Example: '-~ name new content'
	},
	RunFunction: function(trigger, helpers, irc, callback) {
		syer.SQL('shfact')
			.update({
				content: trigger.args[3],
				setby: trigger.from
			})
			.where('name', trigger.args[2])
			.exec(function(err) {
				callback(err, 'Updated!');
			});
	}
};

var DeleteFactoid = {
	Name: 'Delete Factoid',
	Command: {
		Type: 'regex',
		regex: /^(\?\?-|-\|) (\S+) ?$/i
	},
	Run: {
		Channels: ['debug', 'scrollshelp'],
		RequiredPermission: 'scrollshelp'
	},
	Help: {
		Text: 'What does it do',
		Example: '-| test'
	},
	RunFunction: function(trigger, helpers, irc, callback) {
		syer.SQL('shfact')
			.del()
			.where('name', trigger.args[2])
			.exec(function(err) {
				callback(err, 'Removed!');
			});
	}
};

var AppendFactoidCommand = {
	Name: 'Append Factoid',
	Command: {
		Type: 'regex',
		regex: /^-~a (\S+) (.+) ?$/i
	},
	Run: {
		Channels: ['debug', 'scrollshelp'],
		RequiredPermission: 'scrollshelp'
	},
	Help: {
		Text: 'Appends text to a factoid',
		Example: '-~a name more content'
	},
	RunFunction: function(trigger, helpers, irc, callback) {
		syer.SQL('shfact')
			.select()
			.where('name', trigger.args[1])
			.exec(function(err, rows) {
				if(err || rows[0] === undefined) {
					return callback(err);
				}

				syer.SQL('shfact')
					.update({
						content: rows[0].content + trigger.args[2],
						setby: trigger.from
					})
					.where('name', trigger.args[1])
					.exec(function(err) {
						callback(err, 'Appended!');
					});
			});
	}
};

var PrependFactoidCommand = {
	Name: 'Prepend Factoid',
	Command: {
		Type: 'regex',
		regex: /^-~p (\S+) (.+) ?$/i
	},
	Run: {
		Channels: ['debug', 'scrollshelp'],
		RequiredPermission: 'scrollshelp'
	},
	Help: {
		Text: 'Prepends to a factoid',
		Example: '-~a name more content'
	},
	RunFunction: function(trigger, helpers, irc, callback) {
		syer.SQL('shfact')
			.select()
			.where('name', trigger.args[1])
			.exec(function(err, rows) {
				if(err || rows[0] === undefined) {
					return callback(err);
				}

				syer.SQL('shfact')
					.update({
						content: trigger.args[2] + rows[0].content,
						setby: trigger.from
					})
					.where('name', trigger.args[1])
					.exec(function(err) {
						callback(err, 'Prepended!');
					});
			});
	}
};

// Editing commands
RegisterCommand(AddFactoidCommand);
RegisterCommand(EditFactoidCommand);
RegisterCommand(DeleteFactoid);
RegisterCommand(AppendFactoidCommand);
RegisterCommand(PrependFactoidCommand);