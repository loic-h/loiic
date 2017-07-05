const cmds = [];
const mainwords = {};
const allwords = {};
const helps = {};
const shorts = {};

function set(d) {
	cmds.push(d);
	mainwords[d.key] = d;
	allwords[d.key] = d;
	if (d.alias) {
		d.alias.forEach((a) => allwords[a] = d);
	}
	if (d.help) {
		const help = typeof d.help === 'function' ? d.help() : d.help;
		helps[d.key] = help;
		d.alias.forEach(a => helps[a] = help);
	}
	if (d.shorts) {
		const setShorts = d.shorts();
		Object.keys(setShorts).forEach(s => {
			shorts[s] = setShorts[s];
			allwords[s] = d;
		});
	}
}

export default cmds;

export {
	helps,
	mainwords,
	allwords,
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
