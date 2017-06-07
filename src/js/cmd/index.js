import events from '../events';
import projects from '../projects';

const cmds = [];
const keywords = {};
const helps = {};


function set(d) {
	cmds.push(d);
	keywords[d.key] = d;
	d.alias.forEach((a) => keywords[a] = d);
	if (d.help) {
		helps[d.key] = d.help;
	}
}

function run(key) {
	const keys = key.split(' ');
	key = keys[0];
	const args = keys.slice(1);
	let cmd = keywords[key] || keywords['404'];
	if (!cmd) {
		return;
	}
	const data = {
		key,
		projects,
		helps,
		events,
		args
	};
	const out = cmd.out(data);
	return out;
}

export default {
	set,
	run
};


/***
IMPORT ALL COMMANDS
***/

import _404 from './404';
set(_404);
import home from './home';
set(home);
import hello from './hello';
set(hello);
import help from './help';
set(help);
import clear from './clear';
set(clear);
import list from './projects';
set(list);
import go from './go';
set(go);

