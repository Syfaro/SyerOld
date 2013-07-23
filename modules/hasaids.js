var HasAidsCommand = {
	Name: 'Has Aids',
	Command: {
		Type: 'command',
		Key: 'hasaids'
	},
	Run: {
		
	},
	Help: {
		Text: 'Tells if someone has aids :p',
		Example: '.hasaids Syfaro'
	},
	RunFunction: function(trigger, helpers, irc, callback) {
		if(trigger.args[1].length % 2 == 0) {
			if(trigger.args[1][0] == trigger.args[1][0].toUpperCase()) {
				callback(null, 'Sorry, but ' + message.parts[1] + ' has aids');
			} else {
				callback(null, trigger.args[1] + ' is clean!');
			}
		} else {
			if(trigger.args[1][0] == trigger.args[1][0].toUpperCase()) {
				callback(null, trigger.args[1] + ' is clean!');
			} else {
				callback(null, 'Sorry, but ' + message.parts[1] + ' has aids');
			}
		}
	}
};

RegisterCommand(HasAidsCommand);