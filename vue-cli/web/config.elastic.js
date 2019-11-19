const path = require('path');

module.exports = {
	index: 'vue-cli',
	elastic: {
		node: 'http://127.0.0.1:9200',
		maxRetries: 5,
		requestTimeout: 60000,
		sniffOnStart: true
	},
	scanDirs: {
		//web: path.join(__dirname, '..'),
		//'vue-cli': path.join(__dirname, '../..'),
		//media: path.join('/media', process.env.USER),
		opt: '/opt',
		home: process.env.HOME
	},
	tasks: 200,
	timeFormat: 'YYYY-MM-DD HH:mm:ss',
	lines: 200,
	interval: 200,
	wsMode: true 
};
