var request = require('request');

var HasPaidCommand = {
	Name: 'Paid',
	Command: {
		Type: 'command',
		Key: 'paid'
	},
	Run: {
		Channels: ['debug', 'minecrafthelp']
	},
	Help: {
		Text: 'Checks if a user has paid for Minecraft',
		Example: '.paid Syfaro'
	},
	RunFunction: function(trigger, helpers, irc, callback) {
		request('https://minecraft.net/haspaid.jsp?user=' + trigger.args[1], function(err, response, body) {
			if(err) {
				return callback('Error fetching status');
			}

			if(body == 'true') {
				callback(null, helpers.reply('The user "' + trigger.args[1] + '" is premium'));
			} else {
				callback(null, helpers.reply('The user "' + trigger.args[1] + '" is NOT premium'));
			}
		});
	}
};

RegisterCommand(HasPaidCommand);