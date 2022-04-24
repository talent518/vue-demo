const mysql = require('mysql');
const config = require('../config');
const pool = mysql.createPool(config);

/**
 * 封装query之sql带不占位符func
 */
function query(sql, callback) {
	pool.getConnection(function(err, connection) {
		if (err) {
			callback(err);
		} else {
			connection.query(sql, function(err, results, fields) {
				connection.release();
				callback(err, results, fields); // 释放链接
			});
		}
	});
}

/**
 * 封装query之sql带占位符func
 */
function queryArgs(sql, args, callback) {
	pool.getConnection(function(err, connection) {
		if (err) {
			callback(err);
		} else {
			connection.query(sql, args, function(err, results, fields) {
				connection.release();
				callback(err, results, fields);
			});
		}
	});
}

function queryColumn(i, req, res, next) {
	return function(err, results, fields) {
		if(err)
			next(err, req, res, next);
		else {
			var ret = [];
			results.forEach(function(v){
				ret.push(v[fields[i].name]);
			});
			res.json(ret);
		}
	};
}

function queryResult(req, res, next) {
	return function(err, results, fields) {
		if(err)
			next(err, req, res, next);
		else {
			res.json(results);
		}
	};
}

module.exports = {
	query : query,
	queryArgs : queryArgs,
	column : queryColumn,
	result : queryResult
};