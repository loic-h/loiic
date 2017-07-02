import events from '../events';
import {keywords, shorts} from '../cmds';

events.on('cmd:run', run);

function run(key) {
	const keys = key.split(' ');
	key = keys[0];
	const params = keys.slice(1);
	if (shorts[key]) {
		return run(shorts[key]);
	}
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
			} else if (v && param.values && param.values().indexOf(v) < 0) {
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

export default {
	run
};
