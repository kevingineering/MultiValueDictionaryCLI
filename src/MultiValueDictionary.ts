import { DictionaryMessage } from './MessageTypes';

export default class MultiValueDictionary {
	private dictionary: Map<string, string[]>;

	constructor() {
		this.dictionary = new Map<string, string[]>();
	}

	keys(): string | string[] {
		if (this.dictionary.size === 0) {
			return DictionaryMessage.EmptySet;
		}

		let keysIterator = this.dictionary.keys();
		let keysArray = new Array<string>(this.dictionary.size);

		for (let i = 0; i < this.dictionary.size; i++) {
			keysArray[i] = keysIterator.next().value;
		}

		return keysArray;
	}

	members(key: string): string | string[] {
		if (!this.dictionary.has(key)) {
			return DictionaryMessage.KeyDoesNotExist;
		} else {
			return this.dictionary.get(key)!;
		}
	}

	add(key: string, value: string): string {
		let currentValues = this.dictionary.get(key);

		if (currentValues !== undefined && currentValues.includes(value)) {
			return DictionaryMessage.ValueAlreadyExists;
		}

		this.dictionary.set(
			key,
			currentValues === undefined ? [value] : [...currentValues, value]
		);

		return DictionaryMessage.Added;
	}

	remove(key: string, value: string): string {
		if (!this.dictionary.has(key)) {
			return DictionaryMessage.KeyDoesNotExist;
		}

		let currentValues = this.dictionary.get(key);

		if (currentValues !== undefined && currentValues.includes(value)) {
			let updatedValues = currentValues.filter(
				(currentValue) => value !== currentValue
			);

			if (updatedValues.length > 0) {
				this.dictionary.set(key, updatedValues);
			} else {
				this.dictionary.delete(key);
			}

			return DictionaryMessage.Removed;
		} else {
			return DictionaryMessage.ValueDoesNotExist;
		}
	}

	removeall(key: string): string {
		if (this.dictionary.has(key)) {
			this.dictionary.delete(key);
			return DictionaryMessage.Removed;
		} else {
			return DictionaryMessage.KeyDoesNotExist;
		}
	}

	clear(): string {
		this.dictionary.clear();
		return DictionaryMessage.Cleared;
	}

	keyexists(key: string): boolean {
		return this.dictionary.has(key) ? true : false;
	}

	valueexists(key: string, value: string): boolean {
		if (!this.dictionary.has(key)) {
			return false;
		}

		let currentValues = this.dictionary.get(key)!;

		return currentValues.includes(value) ? true : false;
	}

	allmembers(): string | string[] {
		var returnArray = new Array<string>();

		this.dictionary.forEach((values) => {
			values.forEach((value) => {
				returnArray.push(value);
			});
		});

		return returnArray.length <= 0 ? DictionaryMessage.EmptySet : returnArray;
	}

	items(): string | string[] {
		var returnArray = new Array<string>();

		this.dictionary.forEach((values, key) => {
			values.forEach((value) => {
				returnArray.push(key + ': ' + value);
			});
		});

		return returnArray.length === 0 ? DictionaryMessage.EmptySet : returnArray;
	}
}
