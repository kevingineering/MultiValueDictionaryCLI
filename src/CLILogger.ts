import fs from 'fs';
import path from 'path';

export default class CLILogger {
	private Prompt() {
		process.stdout.write('> ');
	}

	private Write(message: string) {
		process.stdout.write(`) ${message}\n`);
	}

	WriteWelcome() {
		this.Write('Welcome! Enter a command or "HELP" for more info.');
		this.Prompt();
	}

	WriteGoodbye() {
		this.Write('GOODBYE');
	}

	WriteHelp() {
		try {
			let srcPath = __dirname.split('src')[0];
			const data = fs.readFileSync(
				path.join(srcPath, 'src', 'helpMessage.txt'),
				'utf-8'
			);
			const lines = data.split(/\r?\n/);
			lines.forEach((value) => this.Write(value));
		} catch {
			this.Write('Error reading help menu.');
		}
		this.Prompt();
	}

	WriteString(result: string) {
		this.Write(result);
		this.Prompt();
	}

	WriteArray(result: string[]) {
		result.forEach((value, index) => {
			this.Write(`${index + 1}) ${value}`);
		});
		this.Prompt();
	}
}
