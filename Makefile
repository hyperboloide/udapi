DEST = bundle.js
DOC = doc
SRC = src

all: clean webpack doc

webpack:
	webpack

clean:
	rm -fr $(DEST) $(DOC)

doc:
	typedoc \
		--mode modules \
		--name "Usine Data API client" \
		--readme ./README.md \
		--module commonjs \
		--exclude "**/*_test.ts" \
		--excludePrivate \
		--hideGenerator \
		--out $(DOC) $(SRC)

patch:
	npm version patch

minor:
	npm version minor

major:
	npm version major

.PHONY: all webpack babel uglifyjs clean doc
