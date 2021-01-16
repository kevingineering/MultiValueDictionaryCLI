import { expect } from 'chai';
import { DictionaryMessage } from '../src/MessageTypes';
import MultiValueDictionary from '../src/MultiValueDictionary';

it('KEYEXISTS - should return true', () => {
	let dictionary = new MultiValueDictionary();

	dictionary.add('A', 'B');
	let response = dictionary.keyexists('A');

	expect(response).to.be.true;
});

it('KEYEXISTS - should return false', () => {
	let dictionary = new MultiValueDictionary();

	let response = dictionary.keyexists('A');

	expect(response).to.be.false;
});

it('VALUEEXISTS - should return true', () => {
	let dictionary = new MultiValueDictionary();

	dictionary.add('A', 'B');
	let response = dictionary.valueexists('A', 'B');

	expect(response).to.be.true;
});

it('VALUEEXISTS - should return false (no value)', () => {
	let dictionary = new MultiValueDictionary();

	dictionary.add('A', 'B');
	let response = dictionary.valueexists('A', 'C');

	expect(response).to.be.false;
});

it('VALUEEXISTS - should return false (no key)', () => {
	let dictionary = new MultiValueDictionary();

	dictionary.add('A', 'B');
	let response = dictionary.valueexists('C', 'B');

	expect(response).to.be.false;
});

it('ADD - should add new item', () => {
	let dictionary = new MultiValueDictionary();

	let response = dictionary.add('A', 'B');

	expect(dictionary.keyexists('A')).to.be.true;
	expect(dictionary.valueexists('A', 'B')).to.be.true;
	expect(response).to.equal(DictionaryMessage.Added);
});

it('ADD - should return error value exists', () => {
	let dictionary = new MultiValueDictionary();

	dictionary.add('A', 'B');
	let response = dictionary.add('A', 'B');

	expect(response).to.equal(DictionaryMessage.ValueAlreadyExists);
});

it('KEYS - should return all keys', () => {
	let dictionary = new MultiValueDictionary();

	dictionary.add('A', 'B');
	dictionary.add('A', 'C');
	dictionary.add('D', 'E');
	let response = dictionary.keys();

	expect(response).to.contain('A');
	expect(response).to.contain('D');
	expect(response).to.not.contain('B');
});

it('KEYS - should return empty set', () => {
	let dictionary = new MultiValueDictionary();

	let response = dictionary.keys();

	expect(response).to.equal(DictionaryMessage.EmptySet);
});

it('MEMBERS - should return values from key', () => {
	let dictionary = new MultiValueDictionary();

	dictionary.add('A', 'B');
	dictionary.add('A', 'C');
	dictionary.add('D', 'E');
	let response = dictionary.members('A');

	expect(response).to.include('B');
	expect(response).to.include('C');
	expect(response).to.not.include('A');
	expect(response).to.not.include('E');
});

it('MEMBERS - should return key does not exist', () => {
	let dictionary = new MultiValueDictionary();

	dictionary.add('a', 'A');
	let response = dictionary.members('A');

	expect(response).to.equal(DictionaryMessage.KeyDoesNotExist);
});

it('REMOVE - should remove value from key', () => {
	let dictionary = new MultiValueDictionary();

	dictionary.add('A', 'B');
	dictionary.add('A', 'C');
	let response = dictionary.remove('A', 'B');

	expect(dictionary.keyexists('A')).to.be.true;
	expect(dictionary.valueexists('A', 'B')).to.be.false;
	expect(dictionary.valueexists('A', 'C')).to.be.true;
	expect(response).to.equal(DictionaryMessage.Removed);
});

it('REMOVE - should remove value and key', () => {
	let dictionary = new MultiValueDictionary();

	dictionary.add('A', 'B');
	let response = dictionary.remove('A', 'B');

	expect(dictionary.keyexists('A')).to.be.false;
	expect(dictionary.valueexists('A', 'B')).to.be.false;
	expect(response).to.equal(DictionaryMessage.Removed);
});

it('REMOVE - should return error key does not exist', () => {
	let dictionary = new MultiValueDictionary();

	let response = dictionary.remove('A', 'B');

	expect(response).to.equal(DictionaryMessage.KeyDoesNotExist);
});

it('REMOVE - should return error value does not exist', () => {
	let dictionary = new MultiValueDictionary();

	dictionary.add('A', 'B');
	let response = dictionary.remove('A', 'C');

	expect(response).to.equal(DictionaryMessage.ValueDoesNotExist);
});

it('REMOVEALL - should remove values and key', () => {
	let dictionary = new MultiValueDictionary();

	dictionary.add('A', 'B');
	dictionary.add('A', 'C');
	let response = dictionary.removeall('A');

	expect(dictionary.keyexists('A')).to.be.false;
	expect(response).to.equal(DictionaryMessage.Removed);
});

it('REMOVEALL - should return error key does not exist', () => {
	let dictionary = new MultiValueDictionary();
	let response = dictionary.removeall('A');

	expect(response).to.equal(DictionaryMessage.KeyDoesNotExist);
});

it('ALLMEMBERS - should return empty set', () => {
	let dictionary = new MultiValueDictionary();

	let response = dictionary.allmembers();

	expect(response).to.equal(DictionaryMessage.EmptySet);
});

it('ALLMEMBERS - should return all values', () => {
	let dictionary = new MultiValueDictionary();

	dictionary.add('A', 'B');
	dictionary.add('A', 'C');
	dictionary.add('D', 'E');
	let response = dictionary.allmembers();

	expect(response).to.contain('B');
	expect(response).to.contain('C');
	expect(response).to.contain('E');
	expect(response).to.not.contain('A');
});

it('ITEMS - should return empty set', () => {
	let dictionary = new MultiValueDictionary();

	let response = dictionary.items();

	expect(response).to.equal(DictionaryMessage.EmptySet);
});

it('ITEMS - should return all keys and values', () => {
	let dictionary = new MultiValueDictionary();

	dictionary.add('A', 'B');
	dictionary.add('A', 'C');
	dictionary.add('D', 'E');
	let response = dictionary.items();

	expect(response).to.contain('A: B');
	expect(response).to.contain('A: C');
	expect(response).to.contain('D: E');
});

it('CLEAR - should remove all keys and values', () => {
	let dictionary = new MultiValueDictionary();

	dictionary.add('A', 'B');
	dictionary.add('A', 'C');
	dictionary.add('D', 'E');
	dictionary.add('D', 'F');
	let response = dictionary.clear();
	let keysReponse = dictionary.items();

	expect(response).to.equal(DictionaryMessage.Cleared);
	expect(keysReponse).to.equal(DictionaryMessage.EmptySet);
});

it('CLEAR - should return cleared if empty', () => {
	let dictionary = new MultiValueDictionary();

	let response = dictionary.clear();

	expect(response).to.equal(DictionaryMessage.Cleared);
});
