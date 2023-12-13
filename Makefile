.PHONY: all

MAKEFLAGS += --silent
PM = bun

%:
	$(PM) "$@"

all:
	$(PM) make
