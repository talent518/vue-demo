#!/bin/bash

time curl -v -XDELETE 'http://127.0.0.1:9200/vue-cli2?pretty'
echo
time curl -v -XPUT 'http://127.0.0.1:9200/vue-cli2?pretty' -H 'Content-Type: application/json; charset=UTF-8' -d '{
    "mappings": {
        "properties": {
            "atime": {
                "type": "text",
                "fields": {
                    "raw": {
                        "type": "keyword"
                    }
                },
                "fielddata": true
            },
            "birthtime": {
                "type": "text",
                "fields": {
                    "raw": {
                        "type": "keyword"
                    }
                },
                "fielddata": true
            },
            "ctime": {
                "type": "text",
                "fields": {
                    "raw": {
                        "type": "keyword"
                    }
                },
                "fielddata": true
            },
            "dev": {
                "type": "long"
            },
            "gid": {
                "type": "long"
            },
            "id": {
                "type": "long"
            },
            "ino": {
                "type": "long"
            },
            "link": {
                "type": "text",
                "fields": {
                    "raw": {
                        "type": "keyword"
                    }
                },
                "fielddata": true
            },
            "mode": {
                "type": "long"
            },
            "mtime": {
                "type": "text",
                "fields": {
                    "raw": {
                        "type": "keyword"
                    }
                },
                "fielddata": true
            },
            "name": {
                "type": "text",
                "fields": {
                    "raw": {
                        "type": "keyword"
                    }
                },
                "fielddata": true
            },
            "nlink": {
                "type": "long"
            },
            "path": {
                "type": "text",
                "fields": {
                    "raw": {
                        "type": "keyword"
                    }
                },
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
                "fields": {
                    "raw": {
                        "type": "keyword"
                    }
                },
                "fielddata": true
            },
            "uid": {
                "type": "long"
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
