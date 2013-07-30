var LogLine = {
	Name: 'Line logger',
	Command: {
		Type: 'regex',
		regex: /.+/
	},
	Run: {
		
	},
	Help: {
		Text: 'n/a',
		Example: 'n/a'
	},
	RunFunction: function(trigger, helpers, irc, callback) {
		syer.SQL('chanlogs')
			.insert({
				channel: trigger.to,
				nick: trigger.from,
				host: trigger.rawInfo.host,
				message: trigger.message
			})
			.exec();
	}
};

RegisterCommand(LogLine);