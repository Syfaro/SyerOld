var RegexBuilder = require('../regexBuilder')
  , fs = require('fs');

var commandPrefix = JSON.parse(fs.readFileSync('./config/commands.json')).regexPrefix;
var botName = JSON.parse(fs.readFileSync('./config/irc.json')).nick;

exports['command wrong nospace'] = function(test) {
	test.expect(3);
	var RegEx = RegexBuilder('command', 'test');
	test.strictEqual(RegEx.test('.text'), false);
	test.strictEqual(RegEx.test(botName + ': text'), false);
	test.strictEqual(RegEx.test(botName + ', text'), false);
	test.done();
};

exports['command wrong space'] = function(test) {
	test.expect(3);
	var RegEx = RegexBuilder('command', 'test');
	test.strictEqual(RegEx.test('.text '), false);
	test.strictEqual(RegEx.test(botName + ': text '), false);
	test.strictEqual(RegEx.test(botName + ', text '), false);
	test.done();
};

exports['command nospace'] = function(test) {
	test.expect(6);
	var RegEx = RegexBuilder('command', 'test');
	test.strictEqual(RegEx.test('.test'), true);
	test.strictEqual(RegEx.test(botName + ': test'), true);
	test.strictEqual(RegEx.test(botName + ', test'), true);
	test.equal(RegEx.exec('.test')[1], undefined);
	test.equal(RegEx.exec(botName + ': test')[1], undefined);
	test.equal(RegEx.exec(botName + ', test')[1], undefined);
	test.done();
};

exports['command space'] = function(test) {
	test.expect(6);
	var RegEx = RegexBuilder('command', 'test');
	test.strictEqual(RegEx.test('.test '), true);
	test.strictEqual(RegEx.test(botName + ': test '), true);
	test.strictEqual(RegEx.test(botName + ', test '), true);
	test.equal(RegEx.exec('.test ')[1], undefined);
	test.equal(RegEx.exec(botName + ': test ')[1], undefined);
	test.equal(RegEx.exec(botName + ', test ')[1], undefined);
	test.done();
};

exports['command args nospace'] = function(test) {
	test.expect(6);
	var RegEx = RegexBuilder('command', 'test');
	test.strictEqual(RegEx.test('.test arg1 arg2'), true);
	test.strictEqual(RegEx.test(botName + ': test arg1 arg2'), true);
	test.strictEqual(RegEx.test(botName + ', test arg1 arg2'), true);
	test.equal(RegEx.exec('.test arg1 arg2')[1], 'arg1 arg2');
	test.equal(RegEx.exec(botName + ', test arg1 arg2')[1], 'arg1 arg2');
	test.equal(RegEx.exec(botName + ': test arg1 arg2')[1], 'arg1 arg2');
	test.done();
};

exports['command args space'] = function(test) {
	test.expect(6);
	var RegEx = RegexBuilder('command', 'test');
	test.strictEqual(RegEx.test('.test arg1 arg2 '), true);
	test.strictEqual(RegEx.test(botName + ', test arg1 arg2 '), true);
	test.strictEqual(RegEx.test(botName + ': test arg1 arg2 '), true);
	test.equal(RegEx.exec('.test arg1 arg2 ')[1], 'arg1 arg2 ');
	test.equal(RegEx.exec(botName + ': test arg1 arg2 ')[1], 'arg1 arg2 ');
	test.equal(RegEx.exec(botName + ', test arg1 arg2 ')[1], 'arg1 arg2 ');
	test.done();
};