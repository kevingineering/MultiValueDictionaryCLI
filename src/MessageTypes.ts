export enum CommandParserMessage {
	InvalidCommandError = 'Command not recognized. Enter "HELP" for more info.',
	InvalidArgumentsError = 'Incorrect number of arguments. Enter "HELP" for more info.',
}

export enum DictionaryMessage {
	KeyDoesNotExist = 'ERROR, key does not exist',
	ValueDoesNotExist = 'ERROR, value does not exist',
	ValueAlreadyExists = 'ERROR, value already exists',
	Added = 'Added',
	Removed = 'Removed',
	EmptySet = '(empty set)',
	Cleared = 'Cleared',
}
