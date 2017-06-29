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
		helps[d.key] = d.help;
	}
	if (d.shorts) {
		Object.assign(shorts, d.shorts());
		console.log(shorts);
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
import custom from './custom';
set(custom);
import reset from './reset';
set(reset);

// console.log(keywords);
