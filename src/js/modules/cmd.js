import events from '../events';
import projects from '../projects';
import {keywords, helps, cmds} from '../cmds';

events.on('cmd:run', run);

function run(key) {
	const keys = key.split(' ');
	key = keys[0];
	const params = keys.slice(1);
	let cmd = keywords[key];
	if (!cmd) {
		events.emit('log:404', key);
		return;
	}
	if (cmd.params) {
		let message = null;
		for (let i = 0; i < cmd.params.length; i++) {
			const v = params[i];
			const param = cmd.params[i];
			if (!v && param.mandatory) {
				message = 'Missing argument';
			} else if (v && param.values().indexOf(v) < 0) {
				message = 'Wrong argument';
			}
			if (message) {
				events.emit('log:error', `
${key}: ${message}.<br />
Use: ${key} ${cmd.params.map(a => `'${a.key}'`).join(' ')}
				`);
				return;
			}
		}
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
	if (!cmd || !cmd.params || cmd.params.length <= 0) {
		return;
	}
	const arg = cmd.params[keys.length - 2];
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
