# coding: utf-8


import sys

from converter.config.vocab import VOCAB
from converter.metaprog.effects_classes import (
    KeyboardEffects,
    PrintEffects,
    SysEffects,
    TerminalEffects,
)
from converter.metaprog.typing import Effects
from converter.sys.error import terminate

QUIT_MSG = VOCAB["QUIT_MSG"]


def sanitize_user_input(user_input: str) -> str:
    return user_input.strip().lower()


def input_handling_keyboard_interrupt_wrapper(
    input_msg: str, quit_msg: str = QUIT_MSG
) -> str | Effects[PrintEffects, KeyboardEffects]:
    try:
        user_input = input(input_msg)
        return user_input
    except EOFError:
        terminate(quit_msg)
    except KeyboardInterrupt:
        terminate(f"\n{quit_msg}")
    return None


def pause(
    quit_msg: str = QUIT_MSG,
) -> Effects[PrintEffects, KeyboardEffects, TerminalEffects, SysEffects]:
    if sys.platform.startswith("win"):
        import msvcrt

        msvcrt.getch()
    else:
        import termios
        import tty

        old_settings = termios.tcgetattr(sys.stdin)
        try:
            sys.stdin.flush()
            tty.setcbreak(sys.stdin.fileno())
            new_settings = termios.tcgetattr(sys.stdin)
            new_settings[3] = new_settings[3] & ~termios.ICANON
            termios.tcsetattr(sys.stdin, termios.TCSANOW, new_settings)
            input()
        except:
            terminate(quit_msg)
        finally:
            if not sys.stdin.closed:
                termios.tcsetattr(sys.stdin, termios.TCSADRAIN, old_settings)
