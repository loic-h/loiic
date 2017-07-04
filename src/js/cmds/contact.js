import contacts from '../data/contacts';

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
				events.emit('log:error', `${key}: Contact not found`);
				return '';
			}
			if(key === 'email') {
				window.location = url;
			} else {
				window.open(url);
			}
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
