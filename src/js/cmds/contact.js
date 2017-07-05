import contacts from '../data/contacts';
import events from '../events';
import Log from '../modules/log';

export default {
	key: 'contact',
	alias: [],
	menu: true,
	help: 'Ways of contact',
	params: [
		{
			key: 'link',
			values() {
				return Object.keys(contacts);
			}
		}
	],
	shorts() {
		const s = [];
		Object.keys(contacts).forEach(k => s[k] = `contact ${k}`);
		return s;
	},
	out(ctx) {
		const key = ctx.params[0];
		if (key) {
			const url = contacts[key];
			if (!url) {
				return Log.error(`${key}: Contact not found`);
			}
			events.emit('open', url, key === 'email');
			return `Opening ${key}...`;
		}
		return `
<div class="contact">
	<ul class="contact-list">
		${Object.keys(contacts).map(k => `
			<li class="contact-list__item">
				<a href="${k}">${k}</a>
			</li>
		`).join('')}
	</ul>
</div>
		`;
	}
};
