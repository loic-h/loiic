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

export default cmds;

export {
	helps,
	keywords
};


/***
IMPORT ALL COMMANDS
***/

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
