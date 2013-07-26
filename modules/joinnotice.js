var JoinNotices = syer.ConfigHandler.GetConfig('joinnotice');

var JoinNoticeNotify = {
	RunFunction: function(trigger, irc, callback) {
		if(JoinNotices[trigger.channel] !== undefined && JoinNotices[trigger.channel].enabled) {
			for(var i = 0; i < JoinNotices[trigger.channel].message.length; i++) {
				irc.notice(trigger.nick, JoinNotices[trigger.channel].message[i].replace('$nick', trigger.nick));
			}
		}
	}
}

var SetJoinNoticeNotifyCommand = {
	Name: 'Set Join Notice',
	Command: {
		Type: 'command',
		Key: 'joinnotice'
	},
	Run: {
		RequiredPermission: 'admin'
	},
	Help: {
		Text: 'Sets a join notice for a channel',
		Example: '.joinnotice #syer Welcome, $nick!'
	},
	RunFunction: function(trigger, helpers, irc, callback) {
		if(/^(#\w+) ?$/i.test(trigger.args[1])) {
			var args = /^(#\w+) ?$/i.exec(trigger.args[1]);

			if(JoinNotices[args[1]] === undefined) {
				return callback('There must be text defined to enable it on a channel');
			}

			JoinNotices[args[1]].enabled = true;
		} else if(/^(#\w+) (.+) ?$/i.test(trigger.args[1])) {
			var args = /^(#\w+) (.+) ?$/i.exec(trigger.args[1]);

			JoinNotices[args[1]] = {
				enabled: true,
				message: args[2].split(';;')
			};
		} else {
			return callback('Invalid usage');
		}

		callback(null, 'Set!');

		syer.ConfigHandler.SaveConfig('joinnotice', JoinNotices);
	}
};

var RemoveJoinNoticeNotifiyCommand = {
	Name: 'Remove Join Notice',
	Command: {
		Type: 'command',
		Key: 'nojoinnotice'
	},
	Run: {
		RequiredPermission: 'admin'
	},
	Help: {
		Text: 'Removes a channel notice',
		Example: '.nojoinnotice #syer'
	},
	RunFunction: function(trigger, helpers, irc, callback) {
		if(/^(#\w+) ?$/i.test(trigger.args[1])) {
			var channel = /^(#\w+) ?$/i.exec(trigger.args[1])[1];

			if(JoinNotices[channel] === undefined) {
				return callback('No notice set for this channel');
			}

			JoinNotices[channel].enabled = false;

			syer.ConfigHandler.SaveConfig('joinnotice', JoinNotices);

			callback(null, 'Set!');
		} else {
			return callback('Invalid usage');
		}
	}
};

RegisterJoin(JoinNoticeNotify);
RegisterCommand(SetJoinNoticeNotifyCommand);
RegisterCommand(RemoveJoinNoticeNotifiyCommand);