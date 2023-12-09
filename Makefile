.PHONY: all

MAKEFLAGS += --silent

%:
	bun "$@"

all:
	bun make
