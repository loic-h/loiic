export default {
	key: 'reset',
	help: 'Reset the applied custom styles',
	out() {
		const applied = JSON.parse(localStorage.getItem('css'));
		for (let k in applied) {
			if (applied.hasOwnProperty(k)) {
				const item = applied[k];
				const els = document.querySelectorAll(item.selector);
				els.forEach(el => el.setAttribute('style', ''));
			}
		}
		return `
<div class="reset">
	Reseting the styles
</div>
		`;
	}
};
