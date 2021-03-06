/* eslint-disable max-len */

export default {
	key: 'about',
	alias: [],
	help: 'Learn more about the author.',
	menu: true,
	out() {
		return `
<div class="about">
	<p>
		Loïc is a web developer based in Berlin.
	</p>
	<p>
		He is specialized in frontend development and javascript, using tools like ReactJs, VueJs, ES6, and more.<br />
		He knows the ways of the backend, mainly in PHP with the help of CMS like KIrby or Processwire, but also has an interest in other technologies like NodeJS and express, or Python and Flask.
	</p>
	<p>
		You can see a bit of his code on <a href="/github" class="cmd">github</a>, or know more on his career on <a href="/linkedin" class="cmd">linkedin</a>.
	</p>
</div>
`;
	}
};
