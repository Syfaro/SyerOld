AddRoute('post', '/git', function(req, res) {
	var git = {};
	try {
		git.name = req.body.user_name,
		git.message = req.body.commits[last].message,
		git.hash = req.body.after.substring(0, 7);
		git.time = req.body.commits[last].timestamp
	} catch (e) {
		console.log(e);
		return;
	}

	syer.Git.Set(git);
	syer.Git.Save();

	syer.Global.exec('git pull origin master', function() {
		syer.Global.ReloadModules();
	});
});

var GitCommand = {
	Name: 'Git Info',
	Command: {
		Type: 'command',
		Key: 'git'
	},
	Run: {
		
	},
	Help: {
		Text: 'Displays information about the lastest Git commit',
		Example: '.git'
	},
	RunFunction: function(trigger, helpers, irc, callback) {
		var Git = syer.Git.Get();
		callback(null, helpers.reply('Git Message: ' + Git.message + ', Hash: ' + Git.hash + ', Time: ' + Git.time));
	}
};

RegisterCommand(GitCommand);