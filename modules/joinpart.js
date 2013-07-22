var JoinCommand = {
	Name: 'Join',
	Command: {
		Type: 'command',
		Key: 'join'
	},
	Run: {
		Channels: ['debug'],
		Admin: true
	},
	Help: {
		Text: 'Joins a channel',
		Example: '.join #syer'
	},
	RunFunction: function(trigger, helpers, irc, callback) {
		irc.join(trigger.args[1]);
		callback(null, helpers.reply('joined!'));
	}
};

var PartCommand = {
	Name: 'part',
	Command: {
		Type: 'command',
		Key: 'part'
	},
	Run: {
		Channels: ['debug'],
		Admin: true
	},
	Help: {
		Text: 'Parts a channel',
		Example: '.part #syer'
	},
	RunFunction: function(trigger, helpers, irc, callback) {
		irc.part(trigger.args[1]);
		callback(null, helpers.reply('parted!'));
	}
}

RegisterCommand(JoinCommand);
RegisterCommand(PartCommand);