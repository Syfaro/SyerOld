var ReloadCommand = {
	Name: 'Reload Modules',
	Command: {
		Type: 'command',
		Key: 'reload'
	},
	Run: {
		Admin: true
	},
	Help: {
		Text: 'Reloads modules',
		Example: '.reload'
	},
	RunFunction: function(trigger, helpers, irc, callback) {
		syer.Global.ReloadModules();
		callback(null, helpers.reply('Reloaded'));
	}
}

var BanFromBotCommand = {
	Name: 'Ban From Bot',
	Command: {
		Type: 'command',
		Key: 'botban'
	},
	Run: {
		Admin: true
	},
	Help: {
		Text: 'Bans user from ALL functions of the bot',
		Example: '.botban SomeBadPerson'
	},
	RunFunction: function(trigger, helpers, irc, callback) {
		syer.Banned.Add(trigger.args[1]);
		syer.Banned.Save();
		callback(null, helpers.reply('Banned!'));
	}
};

var UnbanFromBot = {
	Name: 'Unban From Bot',
	Command: {
		Type: 'command',
		Key: 'botunban'
	},
	Run: {
		Admin: true
	},
	Help: {
		Text: 'Unbans user from bot',
		Example: '.botunban SomeNotReallyBadPerson'
	},
	RunFunction: function(trigger, helpers, irc, callback) {
		syer.Banned.Remove(trigger.args[1]);
		syer.Banned.Save();
		callback(null, helpers.reply('Unbanned!'));
	}
};

var MakeBotAdmin = {
	Name: 'Make Bot Admin',
	Command: {
		Type: 'command',
		Key: 'setbotadmin'
	},
	Run: {
		Admin: true
	},
	Help: {
		Text: 'Sets a user as a bot admin',
		Example: '.setbotadmin SomeAmazingPerson'
	},
	RunFunction: function(trigger, helpers, irc, callback) {
		syer.Admins.Add(trigger.args[1]);
		syer.Admins.Save();
		callback(null, helpers.reply('Set as admin!'));
	}
};

var RemoveBotAdmin = {
	Name: 'Remove Bot Admin',
	Command: {
		Type: 'command',
		Key: 'rembotadmin'
	},
	Run: {
		Admin: true
	},
	Help: {
		Text: 'Removes a bot admin',
		Example: '.rembotadmin'
	},
	RunFunction: function(trigger, helpers, irc, callback) {
		syer.Admins.Remove(trigger.args[1]);
		syer.Admins.Save();
		callback(null, helpers.reply('Removed!'));
	}
};

RegisterCommand(ReloadCommand);
RegisterCommand(BanFromBotCommand);
RegisterCommand(UnbanFromBot);
RegisterCommand(MakeBotAdmin);
RegisterCommand(RemoveBotAdmin);