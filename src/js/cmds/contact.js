export default {
	key: 'contact',
	alias: ['mail', 'email'],
	menu: true,
	help: 'Send a message to the author',
	out() {
		return `
<div class="contact">
	Send an email to the author:
	<a href="mailto:loic.hamet@gmail.com">loic.hamet@gmail.com</a>
</div>
		`;
	}
};
