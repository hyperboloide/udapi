BUILD = ./build
DEST = udapi
DOC = doc
SRC = src

all: clean es5

es5:
	webpack

clean:
	rm -fr $(BUILD) $(DOC)

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

.PHONY: all webpack clean doc patch minor major
