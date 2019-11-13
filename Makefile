install: install-deps

run:
	npx babel-node 'src/bin/gendiff.js'

install-deps:
	npm install

publish: 
	npm publish --dry-run

test:
	npm test

test-coverage:
	npm test -- --coverage

lint:
	npx eslint .

