import sassToJs from 'sass-to-js/js/src/sass-to-js';

export default function pseudo(selector = 'body', pseudo = ':before') {
	return sassToJs(
		document.querySelector(selector),
		{
			pseudoEl: ':before',
			cssProperty: 'content'
		}
	);
}
