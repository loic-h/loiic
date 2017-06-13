export default {
	key: 'about',
	alias: [],
	help: 'Learn more about the author',
	menu: true,
	out() {
		return `
<div class="about">
	<p>
		Loïc is a web developer based in Berlin.<br />
		He is specialized in frontend development and javascript, using tools like ReactJs, VueJs, ES6, and many more.<br />
		He also knows the ways of the backend, mainly in PHP with the help of CMS like KIrby or Processwire, but have also an interest in other technologies like NodeJS and express, or Python and Flask.
		You can see a bit of his code on <a href="https://github.com/loic-h" target="_blank">github</a>, or know more on his career on <a href="https://www.linkedin.com/in/loiic/" target="_blank">Linkedin</a>.

<div>
`;
	}
}