import { expect } from 'chai';
import CommandParser from '../src/CommandParser';
import { CommandParserMessage, DictionaryMessage } from '../src/MessageTypes';

let commandParser = new CommandParser();

it('PARSECOMMAND - should return invalid arguments error - too few', () => {
	var response = commandParser.ParseCommand('add');
	expect(response).to.equal(CommandParserMessage.InvalidArgumentsError);
});

it('PARSECOMMAND - should return invalid arguments error - too many', () => {
	var response = commandParser.ParseCommand('add A B C');
	expect(response).to.equal(CommandParserMessage.InvalidArgumentsError);
});

it('PARSECOMMAND - should return invalid command error', () => {
	var response = commandParser.ParseCommand('adds A B');
	expect(response).to.equal(CommandParserMessage.InvalidCommandError);
});

it('PARSECOMMAND (via Dictionary.ADD) - should call method and return message', () => {
	var response = commandParser.ParseCommand('add A B');
	expect(response).to.equal(DictionaryMessage.Added);
});
