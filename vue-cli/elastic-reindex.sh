#!/bin/bash

time curl -v -XDELETE http://127.0.0.1:9200/vue-cli2
echo
time curl -v -XPUT http://127.0.0.1:9200/vue-cli2 -H 'Content-Type: application/json; charset=UTF-8' -d '{
	"mappings": {
		"properties": {
			"atime": {
				"type": "text",
				"fielddata": true
			},
			"birthtime": {
				"type": "text",
				"fielddata": true
			},
			"ctime": {
				"type": "text",
				"fielddata": true
			},
			"dev": {
				"type": "long"
			},
			"gid": {
				"type": "long"
			},
			"ino": {
				"type": "long"
			},
			"link": {
				"type": "text",
				"fielddata": true
			},
			"mode": {
				"type": "long"
			},
			"mtime": {
				"type": "text",
				"fielddata": true
			},
			"name": {
				"type": "text",
				"fielddata": true
			},
			"nlink": {
				"type": "long"
			},
			"path": {
				"type": "text",
				"fielddata": true
			},
			"pid": {
				"type": "long"
			},
			"size": {
				"type": "long"
			},
			"type": {
				"type": "text",
				"fielddata": true
			},
			"uid": {
				"type": "long"
			}
		}
	},
	"settings": {
		"number_of_shards": "3",
		"number_of_replicas": "1"
	}
}'
echo
time curl -v http://127.0.0.1:9200/_reindex -H 'Content-Type: application/json; charset=UTF-8' -d '{
	"source": {
		"index": "vue-cli"
	},
	"dest": {
		"index": "vue-cli2"
	}
}'
