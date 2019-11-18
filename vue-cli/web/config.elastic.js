const path = require('path');

module.exports = {
	index: 'vue-cli',
	elastic: {
		node: 'http://localhost:9200'
	},
	scanDirs: {
		//web: path.join(__dirname, '..'),
		//'vue-cli': path.join(__dirname, '../..'),
		//media: path.join('/media', process.env.USER),
		opt: '/opt',
		home: process.env.HOME
	},
	tasks: 500,
	timeFormat: 'YYYY-MM-DD HH:mm:ss',
	lines: 200
};
