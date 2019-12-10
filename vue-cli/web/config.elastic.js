const path = require('path');

module.exports = {
	index: 'vue-cli',
	elastic: {
		node: 'http://127.0.0.1:9200',
		// node: 'http://192.168.1.17:9200',
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
	tasks: 500,
	timeFormat: 'YYYY-MM-DD HH:mm:ss',
	lines: 500,
	interval: 200,
	wsMode: true,
	logFile: path.join(__dirname, 'elastic.log'),
	errFile: path.join(__dirname, 'elastic.err'),
	searchCount: true,
	saveFile: path.join(__dirname, 'elastic.json'),
	bulks: 100,
	bulkTasks: 200
};
