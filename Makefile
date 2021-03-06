.PHONY: validate build invoke clean build-tests inspect-files test deploy-qa deploy-prod

install:
	npm install

run:
	npm start

move-to-dist:
	rm -f -r chrome-extension/*
	cp build/manifest.json chrome-extension
	cp build/icon32.* chrome-extension
	cp build/icon48.* chrome-extension
	cp build/icon128.* chrome-extension
	cp build/index.html chrome-extension
	cp -R build/static/ chrome-extension/static
	zip -r chrome-extension/kuhu.zip chrome-extension

build-npm: 
	npm run build

build: build-npm move-to-dist
	echo "\n Done! Files exported to /chrome-extension"
