var ReloadCommand = {
	Name: 'Reload Modules',
	Command: {
		Type: 'command',
		Key: 'reload'
	},
	Run: {
		RequiredPermission: 'admin'
	},
	Help: {
		Text: 'Reloads modules',
		Example: '.reload'
	},
	RunFunction: function(trigger, helpers, irc, callback) {
		syer.Global.ReloadModules();
		callback(null, helpers.reply('Reloaded'));
	}
};

var BanFromBotCommand = {
	Name: 'Ban From Bot',
	Command: {
		Type: 'command',
		Key: 'botban'
	},
	Run: {
		RequiredPermission: 'admin'
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
		RequiredPermission: 'admin'
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

var SetUserPermission = {
	Name: 'Set User Permission',
	Command: {
		Type: 'command',
		Key: 'permaddgroup'
	},
	Run: {
		RequiredPermission: 'admin'
	},
	Help: {
		Text: 'Adds a user to a group',
		Example: '.permaddgroup admin SomeAmazingPerson'
	},
	RunFunction: function(trigger, helpers, irc, callback) {
		var parts = trigger.args[1].split(' ');
		syer.Permissions.AddToGroup(parts[0], parts[1]);
		syer.Permissions.Save();
		callback(null, helpers.reply('Updated permissions!'));
	}
};

var RemoveUserPermission = {
	Name: 'Remove User Permission',
	Command: {
		Type: 'command',
		Key: 'permremgroup'
	},
	Run: {
		RequiredPermission: 'admin'
	},
	Help: {
		Text: 'Removes a user from a group',
		Example: '.permremgroup admin SomeBadPerson'
	},
	RunFunction: function(trigger, helpers, irc, callback) {
		var parts = trigger.args[1].split(' ');
		syer.Admins.Remove(trigger.args[1]);
		syer.Admins.Save();
		callback(null, helpers.reply('Removed!'));
	}
};

var AddPermissionGroup = {
	Name: 'Add Permission Group',
	Command: {
		Type: 'command',
		Key: 'permgroupadd'
	},
	Run: {
		RemoveUserPermission: 'admin'
	},
	Help: {
		Text: 'Adds a new permissions group',
		Example: '.permgroupadd mch'
	},
	RunFunction: function(trigger, helpers, irc, callback) {
		syer.Permissions.AddGroup(trigger.args[1]);
		syer.Permissions.Save();
		callback(null, helpers.reply('Added!'));
	}
};

RegisterCommand(ReloadCommand);
RegisterCommand(BanFromBotCommand);
RegisterCommand(UnbanFromBot);
RegisterCommand(SetUserPermission);
RegisterCommand(RemoveUserPermission);
RegisterCommand(AddPermissionGroup);