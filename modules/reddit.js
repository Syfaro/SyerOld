var request = require('request');

var RedditSubmissionInfo = {
	Name: 'Reddit Submission Auto',
	Command: {
		Type: 'regex',
		regex: /(https?:\/\/(?:www\.|np\.)?reddit\.com\/r\/(.+?)\/comments\/([\w-]+))/i
	},
	Run: {

	},
	Help: {
		Text: 'Displays information about a Reddit submission',
		Example: 'Just put in any reddit link'
	},
	RunFunction: function(trigger, helpers, irc, callback) {
		request(trigger.args[1] + '/.json', function(err, response, body) {
			try {
				var data = JSON.parse(body)[0].data.children[0].data;
			} catch (e) {
				callback('Reddit issue');
			}

			try {
				callback(null, ((data.over_18) ? '[NSFW] ' : '') + 'Subreddit: /r/' + trigger.args[2] + ' | ' + 'Title: ' + data.title + ' | ' + data.domain + ' | Score: ' + data.score + ' | Comments: ' + data.num_comments);
			} catch (e) {
				callback('Reddit issue: ' + e);
			}
		});
	}
};

var RedditUserInfo = {
	Name: 'Reddit User Info',
	Command: {
		Type: 'regex',
		regex: /https?:\/\/(www\.|np\.)?reddit\.com\/u(ser)?\/([\w-]+)/i
	},
	Run: {

	},
	Help: {
		Text: 'Displays information about a Reddit user',
		Example: 'Just put in any reddit user link'
	},
	RunFunction: function(trigger, helpers, irc, callback) {
		request('http://www.reddit.com/user/' + trigger.args[3] + '/about.json', function(err, response, body) {
			try {
				var data = JSON.parse(body).data;
				callback(null, 'Link Karma: ' + data.link_karma + ' | Comment Karma: ' + data.comment_karma + ' | ' + ((data.is_gold) ? 'Has Gold ' : ' Doesn\'t have gold ') + ' | ' + ((data.over_18) ? 'is 18+ ' : 'is less than 18 '));
			} catch (e) {
				callback('Reddit issue: ' + e);
			}
		});
	}
};

RegisterCommand(RedditSubmissionInfo);
RegisterCommand(RedditUserInfo);