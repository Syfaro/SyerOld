var PingPongCommand = {
	Name: 'PingPong',
	Command: {
		Type: 'command',
		Key: 'ping'
	},
	Run: {
		Channels: ['debug']
	},
	Help: {
		Text: 'Has the bot send pong, useful for testing if it is still working.',
		Example: '.ping'
	},
	RunFunction: function(trigger, helpers, irc, callback) {
		callback(null, helpers.reply('pong'));
	}
};

RegisterCommand(PingPongCommand);