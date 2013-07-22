var fs = require('fs');

var commandConfig = JSON.parse(fs.readFileSync('config/commands.json'));
var botNick = JSON.parse(fs.readFileSync('config/irc.json')).nick;

var BuildRegex = function(start) {
	return new RegExp('^' + start + '(?: (.*))? ?$', 'i');
};

var RegexBuilder = function(commandType, command) {
	switch(commandType) {
	case 'command':
		return BuildRegex('(?:' + botNick + '(?::|,) ' + command + '|' + commandConfig.regexPrefix + command + ')');
		break;
	case 'startsWith':
		return BuildRegex(command);
		break;
	}
};

module.exports = RegexBuilder;