const path = require('path');

module.exports = {
	index: 'vue-cli',
	elastic: {
		node: 'http://localhost:9200'
	},
	scanDirs: {
//		media: path.join('/media', process.env.USER),
		opt: '/opt',
		home: process.env.HOME
	},
	tasks: 100,
	timeFormat: 'YYYY-MM-DD HH:mm:ss',
	lines: 100
};