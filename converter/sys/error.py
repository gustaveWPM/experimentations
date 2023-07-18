# coding: utf-8


from converter.metaprog.effects_classes import PrintEffects, SysEffects
from converter.metaprog.typing import Effects


def terminate(msg: str = "") -> Effects[PrintEffects, SysEffects]:
    if msg:
        print(msg)
    exit(0)
