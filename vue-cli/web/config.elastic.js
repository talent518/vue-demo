const path = require('path');

module.exports = {
	elastic: {
		node: 'http://localhost:9200'
	},
	scanDirs: {
		media: path.join('/media', process.env.USER),
		home: process.env.HOME
	},
	tasks: 200,
	timeFormat: 'YYYY-MM-DD HH:mm:ss'
};