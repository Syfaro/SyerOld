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
			callback('No command specified');
			return;
		}

		var Modules = syer.Global.GetAllModules();
		var found = false;
		for(var i = 0; i < Modules.length; i++) {
			var Module = Modules[i];
			if(Module.CommandKey.toLowerCase() == trigger.args[1].toLowerCase()) {
				callback(null, [helpers.reply(Module.Help), helpers.reply('Example - ' + Module.HelpExample)]);
				found = true;
			}
		}

		if(!found) {
			callback('No command found');
		}
	}
};

RegisterCommand(HelpCommand);