var ScrollsFansUsers = {
	Name: 'Scrolls Fans Users',
	Command: {
		Type: 'command',
		Key: 'u'
	},
	Run: {
		Channels: ['debug', 'scrollsfans']
	},
	Help: {
		Text: 'Gets a link to u.scrolls.pw which redirects to scrollsfans.com',
		Example: '.u Syfaro profile'
	},
	RunFunction: function(trigger, helpers, irc, callback) {
		var parts = trigger.args[1].split(' ');
		callback(null, helpers.reply('http://u.scrolls.pw/' + parts[0] + '/' + parts[1]));
	}
};

RegisterCommand(ScrollsFansUsers);