import events from '../events';
import {allwords, shorts} from '../cmds';
import Input from './input';
import Log from './log';

events.on('complete', complete);

function complete(key) {
	const matches = getMatches(key);
	if (!matches || matches.length <= 0) {
		return;
	} else if (matches.length === 1) {
		Input.type(matches[0]);
	} else {
		Log.cmd(Input.getValue());
		Log.add(`
<ul class="cmd-list">
	${matches.map(m => `
		<li class="cmd-list__item"><a href="/${m}" class="cmd">${m}</a></li>
	`).join('')}
</ul>
		`);
	}
}

function getMatches(key) {
	if (key === '') {
		return;
	}
	const keys = key.split(' ');
	const words = Object.keys(allwords);
	if (keys.length <= 1) {
		return filter(words, key);
	}
	const cmd = allwords[keys[0]];
	if (!cmd || !cmd.params || cmd.params.length <= 0) {
		return;
	}
	const arg = cmd.params[keys.length - 2];
	if (arg.values) {
		const matches = filter(arg.values(), keys[keys.length - 1]);
		return matches.map(m => {
			return keys.slice(0, keys.length-1).concat(m).join(' ');
		});
	}
}

function filter(arr, str) {
	return arr.filter(k => k.indexOf(str) === 0).sort();
}

