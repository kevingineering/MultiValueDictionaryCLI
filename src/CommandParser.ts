import { CommandParserMessage } from './MessageTypes';
import MultiValueDictionary from './MultiValueDictionary';

export default class CommandParser {
	private methodNames: string[];
	dictionary: MultiValueDictionary;

	constructor() {
		this.methodNames = [];
		this.dictionary = new MultiValueDictionary();

		//get method names from dictionary
		for (let index in this.dictionary) {
			if (typeof this.dictionary[index] === 'function') {
				this.methodNames.push(index);
			}
		}
	}

	ParseCommand(input: string) {
		let args = input.split(/\s+/);

		if (args.length <= 0) {
			return CommandParserMessage.InvalidArgumentsError;
		}

		var command = args.shift()?.toLowerCase()!;

		if (!this.methodNames.includes(command)) {
			return CommandParserMessage.InvalidCommandError;
		}

		let requiredParams = this.dictionary[command].length;

		if (requiredParams !== args.length) {
			return CommandParserMessage.InvalidArgumentsError;
		}

		//call command with argument
		var response = this.dictionary[command](...args);
		return typeof response === 'boolean' ? response.toString() : response;
	}
}
