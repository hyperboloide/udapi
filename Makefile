DEST = bundle.js

all: clean webpack babel uglifyjs

webpack:
	webpack

babel:
	babel $(DEST) \
		--source-maps \
		--out-file $(DEST)

uglifyjs:
	uglifyjs \
		--compress \
		--mangle \
		--screw-ie8 \
		--in-source-map $(DEST).map \
		-o $(DEST) $(DEST)

clean:
	rm -fr $(DEST)
