export default function(position) {
	if (position === 'end') {
		position = document.body.scrollHeight;
	} else if(position === 'top') {
		position = 0;
	}
	window.scrollTo(0,document.body.scrollHeight);
}
