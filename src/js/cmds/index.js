const cmds = [];
const keywords = {};
const helps = {};
const shorts = {};

function set(d) {
	cmds.push(d);
	keywords[d.key] = d;
	if (d.alias) {
		d.alias.forEach((a) => keywords[a] = d);
	}
	if (d.help) {
		const help = typeof d.help === 'function' ? d.help() : d.help;
		helps[d.key] = help;
	}
	if (d.shorts) {
		Object.assign(shorts, d.shorts());
	}
}

export default cmds;

export {
	helps,
	keywords,
	cmds,
	shorts
};


/***
IMPORT ALL COMMANDS
***/

import home from './home';
set(home);
import about from './about';
set(about);
import projects from './projects';
set(projects);
import project from './project';
set(project);
import contact from './contact';
set(contact);
import hello from './hello';
set(hello);
import help from './help';
set(help);
import go from './go';
set(go);
import menu from './menu';
set(menu);
import list from './list';
set(list);
import style from './style';
set(style);
