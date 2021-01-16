import CLILogger from './CLILogger';
import CommandParser from './CommandParser';

var input = process.stdin.setDefaultEncoding('utf-8');
let logger = new CLILogger();
let commandParser = new CommandParser();

logger.WriteWelcome();

input.on('data', (data) => {
	let input = data.toString().trim();

	if (input.toLowerCase() === 'exit') {
		logger.WriteGoodbye();
		process.exit();
	} else if (input.toLowerCase() === 'help') {
		logger.WriteHelp();
	} else {
		let result = commandParser.ParseCommand(input);

		typeof result === 'string'
			? logger.WriteString(result)
			: logger.WriteArray(result);
	}
});
