import events from '../events';
import projects from '../projects';
import {keywords, helps, cmds} from '../cmds';

function run(key) {
	const keys = key.split(' ');
	key = keys[0];
	const params = keys.slice(1);
	let cmd = keywords[key];
	if (!cmd) {
		events.emit('log:404', key);
		return;
	}
	if (cmd.params && params.length < cmd.params.length) {
		events.emit('log:error', `
${key}: Missing argument.<br />
Use: ${key} ${cmd.params.map(a => `'${a.key}'`).join(' ')}
		`);
		return;
	}
	const data = {
		key,
		params
	};
	const out = cmd.out(data);
	return out;
}

function completion(key) {
	if (key === '') {
		return;
	}
	const keys = key.split(' ');
	if (keys.length <= 1) {
		return filterCompletion(Object.keys(keywords), key);
	}
	const cmd = keywords[keys[0]];
	if (!cmd || !cmd.args || cmd.args.length <= 0) {
		return;
	}
	const arg = cmd.args[keys.length - 2];
	const matches = filterCompletion(arg.values(), keys[keys.length - 1]);
	return matches.map(m => {
		return keys.slice(0, keys.length-1).concat(m).join(' ');
	});
}

function filterCompletion(arr, str) {
	return arr.filter(k => k.indexOf(str) === 0);
}

export default {
	run,
	completion
};
