var CrashReportMessage = {
	Name: 'Crash Report Message',
	Command: {
		Type: 'regex',
		regex: /Minecraft Crash Report/
	},
	Run: {
		Channels: ['minecrafthelp']
	},
	Help: {
		Text: 'n/a',
		Example: 'n/a'
	},
	RunFunction: function(trigger, helpers, irc, callback) {
		callback(null, [helpers.reply('Do not post crash reports in this channel, instead use pastebin'), '??> ' + trigger.from + ' pastebin']);
	}
};

RegisterCommand(CrashReportMessage);