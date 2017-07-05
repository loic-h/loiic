import events from '../events';
import {allwords, shorts} from '../cmds';

events.on('cmd:run', run);

function run(key) {
	const keys = key.split(' ');
	key = keys[0];
	const params = keys.slice(1);
	if (shorts[key]) {
		const c = shorts[key];
		return run(typeof c === 'function' ? c(params) : c);
	}
	let cmd = allwords[key];
	if (!cmd) {
		events.emit('log:404', key);
		return;
	}
	if (cmd.params) {
		let typeError;
		for (let i = 0; i < cmd.params.length; i++) {
			const v = params[i];
			const param = cmd.params[i];
			const mandatory = typeof param.mandatory === 'function'
				? param.mandatory(params)
				: param.mandatory;
			if (!v && mandatory) {
				typeError = 'missing';
			} else if (v && param.values && param.values().indexOf(v) < 0) {
				typeError = 'wrong';
			}
			if (typeError) {
				events.emit('log:error:argument', key, typeError);
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
