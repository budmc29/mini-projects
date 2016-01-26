#!/bin/bash

# create github repositories from command line

curl -i -H 'Authorization: token 111' -d '{ \
  "name": "Hello-World","description": "This is your first repository","homepage": "https://github.com","has_issues": true,"has_wiki": true,"has_downloads": true \
}' \
https://api.github.com/repos/budmc29
