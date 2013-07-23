var twitter = require('ntwitter');

var TwitterConfig = syer.ConfigHandler.GetConfig('twitter');

var twit = new twitter({
	consumer_key: TwitterConfig.consumer_key,
	consumer_secret: TwitterConfig.consumer_secret,
	access_token_key: TwitterConfig.access_token_key,
	access_token_secret: TwitterConfig.access_token_secret
});

var TwitterAuto = {
	Name: 'Displays a tweet',
	Command: {
		Type: 'regex',
		regex: /:\/\/twitter.com\/\S+\/status\/(\d+)/i
	},
	Run: {
		
	},
	Help: {
		Text: 'Displays a tweet when you post the link for it',
		Example: 'Any Twitter status link'
	},
	RunFunction: function(trigger, helpers, irc, callback) {
		twit.showStatus(trigger.args[1], function(err, data) {
			if(err) {
				callback(err);
			} else {
				callback(null, '@' + data.user.screen_name + ': ' + data.text);
			}
		});
	}
};

RegisterCommand(TwitterAuto);