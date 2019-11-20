#!/bin/bash

time curl -v -XDELETE 'http://127.0.0.1:9200/vue-cli2?pretty'
echo
time curl -v -XPUT 'http://127.0.0.1:9200/vue-cli2?pretty' -H 'Content-Type: application/json; charset=UTF-8' -d '{
	"mappings": {
		"properties": {
			"id": {
				"type": "long"
			},
			"pid": {
				"type": "long"
			},
			"name": {
				"type": "text",
				"fielddata": true
			},
			"path": {
				"type": "text",
				"fielddata": true
			},
			"link": {
				"type": "text",
				"fielddata": true
			},
			"type": {
				"type": "text",
				"fielddata": true
			},
			"size": {
				"type": "long"
			},
			"mode": {
				"type": "long"
			},
			"nlink": {
				"type": "long"
			},
			"uid": {
				"type": "long"
			},
			"gid": {
				"type": "long"
			},
			"dev": {
				"type": "long"
			},
			"ino": {
				"type": "long"
			},
			"atime": {
				"type": "text",
				"fielddata": true
			},
			"mtime": {
				"type": "text",
				"fielddata": true
			},
			"ctime": {
				"type": "text",
				"fielddata": true
			},
			"birthtime": {
				"type": "text",
				"fielddata": true
			}
		}
	},
	"settings": {
		"number_of_shards": "3",
		"number_of_replicas": "0"
	}
}'
echo
time curl -v 'http://127.0.0.1:9200/_reindex' -H 'Content-Type: application/json; charset=UTF-8' -d '{
	"source": {
		"index": "vue-cli"
	},
	"dest": {
		"index": "vue-cli2"
	}
}'
