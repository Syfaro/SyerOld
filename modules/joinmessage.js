var JoinMessages = syer.ConfigHandler.GetConfig('joinmessage');

var JoinMessageNotify = {
	RunFunction: function(trigger, irc, callback) {
		if(JoinMessages[trigger.channel] !== undefined && JoinMessages[trigger.channel].enabled) {
			var output = [];
			for(var i = 0; i < JoinMessages[trigger.channel].message.length; i++) {
				output.push(JoinMessages[trigger.channel].message[i].replace('$nick', trigger.nick));
			}
			callback(null, output);
		}
	}
}

var SetJoinMessageNotifyCommand = {
	Name: 'Set Join Message',
	Command: {
		Type: 'command',
		Key: 'joinmessage'
	},
	Run: {
		RequiredPermission: 'admin'
	},
	Help: {
		Text: 'Sets a join message for a channel',
		Example: '.joinmessage #syer Welcome, $nick!'
	},
	RunFunction: function(trigger, helpers, irc, callback) {
		if(/^(#\w+) ?$/i.test(trigger.args[1])) {
			var args = /^(#\w+) ?$/i.exec(trigger.args[1]);

			if(JoinMessages[args[1]] === undefined) {
				return callback('There must be text defined to enable it on a channel');
			}

			JoinMessages[args[1]].enabled = true;
		} else if(/^(#\w+) (.+) ?$/i.test(trigger.args[1])) {
			var args = /^(#\w+) (.+) ?$/i.exec(trigger.args[1]);

			JoinMessages[args[1]] = {
				enabled: true,
				message: args[2].split(';;')
			};
		} else {
			return callback('Invalid usage');
		}

		callback(null, 'Set!');

		syer.ConfigHandler.SaveConfig('joinmessage', JoinMessages);
	}
};

var RemoveJoinMessageNotifiyCommand = {
	Name: 'Remove Join Message',
	Command: {
		Type: 'command',
		Key: 'nojoinmessage'
	},
	Run: {
		RequiredPermission: 'admin'
	},
	Help: {
		Text: 'Removes a channel join message',
		Example: '.nojoinmessage #syer'
	},
	RunFunction: function(trigger, helpers, irc, callback) {
		if(/^(#\w+) ?$/i.test(trigger.args[1])) {
			var channel = /^(#\w+) ?$/i.exec(trigger.args[1])[1];

			if(JoinMessages[channel] === undefined) {
				return callback('No join message set for this channel');
			}

			JoinMessages[channel].enabled = false;

			syer.ConfigHandler.SaveConfig('joinmessage', JoinMessages);

			callback(null, 'Set!');
		} else {
			return callback('Invalid usage');
		}
	}
};

RegisterJoin(JoinMessageNotify);
RegisterCommand(SetJoinMessageNotifyCommand);
RegisterCommand(RemoveJoinMessageNotifiyCommand);