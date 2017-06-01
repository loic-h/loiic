import request from 'superagent';
import events from '../events';

let DATA;

request
	.post('cmd.php')
	.end((err, res) => {
		if (err) {
			console.log(err);
		}
		DATA = res.text;
		events.emit('cmd:ready', JSON.parse(DATA));
	});

export default function cmd(req) {
	console.log(req);
}

export {DATA as cmdData};
