var AddToGroupCommand = {
	Name: 'Add To Group',
	Command: {
		Type: 'command',
		Key: 'groupadd'
	},
	Run: {
		Admin: true
	},
	Help: {
		Text: 'Adds a channel to a group',
		Example: '.groupadd minecrafthelp #minecrafthelp'
	},
	RunFunction: function(trigger, helpers, irc, callback) {
		var args = trigger.args[1].split(' ');
		syer.Groups.AddChannel(args[0], args[1]);
		syer.Groups.SaveChannels();
		callback(null, helpers.reply('added!'));
	}
};

var RemoveFromGroupCommand = {
	Name: 'Remove From To Group',
	Command: {
		Type: 'command',
		Key: 'grouprem'
	},
	Run: {
		Admin: true
	},
	Help: {
		Text: 'Removes a channel from a group',
		Example: '.grouprem minecrafthelp #minecrafthelp'
	},
	RunFunction: function(trigger, helpers, irc, callback) {
		var args = trigger.args[1].split(' ');
		syer.Groups.RemoveChannel(args[0], args[1]);
		syer.Groups.SaveChannels();
		callback(null, helpers.reply('removed!'));
	}
};

var AddGroupCommand = {
	Name: 'Create New Group',
	Command: {
		Type: 'command',
		Key: 'addgroup'
	},
	Run: {
		Admin: true
	},
	Help: {
		Text: 'Adds a new group',
		Example: '.addgroup minecrafthelp'
	},
	RunFunction: function(trigger, helpers, irc, callback) {
		syer.Groups.AddGroup(trigger.args[1]);
		syer.Groups.SaveChannels();
		callback(null, helpers.reply('added!'));
	}
};

var RemoveGroupCommand = {
	Name: 'Remove Group',
	Command: {
		Type: 'command',
		Key: 'remgroup'
	},
	Run: {
		Admin: true
	},
	Help: {
		Text: 'Deletes a group',
		Example: '.delgroup minecrafthelp'
	},
	RunFunction: function(trigger, helpers, irc, callback) {
		syer.Groups.RemoveGroup(trigger.args[1]);
		syer.Groups.SaveChannels();
		callback(null, helpers.reply('removed!'));
	}
};

RegisterCommand(AddToGroupCommand);
RegisterCommand(RemoveFromGroupCommand);
RegisterCommand(AddGroupCommand);
RegisterCommand(RemoveGroupCommand);