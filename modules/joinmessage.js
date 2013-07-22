var SyerTestJoinMessage = {
	RunFunction: function(trigger, irc, callback) {
		callback(null, 'Hai');
	}
}

RegisterJoin(SyerTestJoinMessage);