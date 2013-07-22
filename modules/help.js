var HelpCommand = {
	Name: 'Help',
	Command: {
		Type: 'command',
		Key: 'help'
	},
	Run: {

	},
	Help: {
		Text: 'Displays help information about a command',
		Example: '.help <command>'
	},
	RunFunction: function(trigger, helpers, irc, callback) {
		if(trigger.args[1] === undefined) {
			var Modules = syer.Global.GetAllModules();
			var names = [];
			for(var i = 0; i < Modules.length; i++) {
				if(Modules[i].CommandKey !== undefined) {
					names.push(Modules[i].CommandKey + ((Modules[i].AdminOnly) ? '*' : ''));
				}
			}
			return callback(null, 'Commands: ' + names.sort().join(', '));
		}

		var Modules = syer.Global.GetAllModules();
		var found = false;
		for(var i = 0; i < Modules.length; i++) {
			var Module = Modules[i];
			if(Module.CommandKey !== undefined && Module.CommandKey.toLowerCase() == trigger.args[1].toLowerCase()) {
				callback(null, [helpers.reply(Module.Help + ', Example: '), helpers.reply(Module.HelpExample)]);
				found = true;
			}
		}

		if(!found) {
			var really = false;
			for(var i = 0; i < Modules.length; i++) {
				var Module = Modules[i];
				if(Module.Command.test(trigger.args[1])) {
					callback(null, [helpers.reply(Module.Help + ', Example: '), helpers.reply(Module.HelpExample)]);
					really = true;
				}
			}

			if(!really) {
				callback('No command found');
			}
		}
	}
};

RegisterCommand(HelpCommand);