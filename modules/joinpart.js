var JoinCommand = {
	Name: 'Join',
	Command: {
		Type: 'command',
		Key: 'join'
	},
	Run: {
		Admin: true
	},
	Help: {
		Text: 'Joins a channel',
		Example: '.join #syer'
	},
	RunFunction: function(trigger, helpers, irc, callback) {
		syer.Channels.Add(trigger.args[1]);
		syer.Channels.Save();
	}
};

var PartCommand = {
	Name: 'part',
	Command: {
		Type: 'command',
		Key: 'part'
	},
	Run: {
		Admin: true
	},
	Help: {
		Text: 'Parts a channel',
		Example: '.part #syer'
	},
	RunFunction: function(trigger, helpers, irc, callback) {
		syer.Channels.Remove(trigger.args[1]);
		syer.Channels.Save();
	}
}

var JoinSavedCommand = {
	Name: 'JoinSaved',
	Command: {
		Type: 'command',
		Key: 'joinsaved'
	},
	Run: {
		Admin: true
	},
	Help: {
		Text: 'Joins saved commands',
		Example: '.joinsaved'
	},
	RunFunction: function(trigger, helpers, irc, callback) {
		syer.Channels.JoinLoaded();
	}
}

RegisterCommand(JoinCommand);
RegisterCommand(PartCommand);
RegisterCommand(JoinSavedCommand);