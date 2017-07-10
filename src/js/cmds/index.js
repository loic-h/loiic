const cmds = [];
const mainwords = {};
const allwords = {};
const helps = {};
const allhelps = {};
const shorts = {};
const inits = [];

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
		allhelps[d.key] = help;
		d.alias.forEach(a => allhelps[a] = help);
	}
	if (d.shorts) {
		const setShorts = d.shorts();
		Object.keys(setShorts).forEach(s => {
			shorts[s] = setShorts[s];
			allwords[s] = d;
		});
	}
	if (d.init) {
		inits.push(d.init);
	}
}

function init() {
	inits.forEach(foo => foo());
}

export default cmds;

export {
	helps,
	allhelps,
	mainwords,
	allwords,
	cmds,
	shorts,
	init
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
import visit from './visit';
set(visit);
import menu from './menu';
set(menu);
import list from './list';
set(list);
import style from './style';
set(style);

import neo from './neo';
set(neo);
