export default {
	background: {
		sets: {
			'.layout': 'background'
		},
		desc: 'set the main bakground color'
	},
	font: {
		sets: {
			'.layout': 'color',
			'.cursor': 'border-bottom-color',
			'.cmder__button--menu span, .cmder__button--menu:before, .cmder__button--menu:after': 'background',
			'.cmd:hover': 'border-color'
		},
		desc: 'set the main font color'
	},
	block: {
		sets: {
			'.log-entry': 'background',
			'.cmder': 'background'
		},
		desc: 'set the blocks\' background color'
	},
	command: {
		sets: {
			'.cmd': ['background', 'border-color'],
			'.cursor': 'background'
		},
		desc: 'set the commands\' background color'
	},
	reset: {
		sets: null,
		desc: 'reset all the styles to the default values'
	}
};
