# coding: utf-8


from enum import Enum
from typing import List

from converter.internal_lib.list import flatten, strlist_to_str
from converter.metaprog.choice_prompt_enum import ChoicePromptEnum
from converter.metaprog.effects_types import KeyboardEffects, PrintEffects, SysEffects
from converter.metaprog.typing import Effects
from converter.sys.input_handling import (
    input_handling_keyboard_interrupt_wrapper,
    sanitize_user_input,
)


def _generate_choices_indicator(
    enum: Enum, defaut_enum_value=None, vertical_style=False
) -> str:
    choices = list(enum)
    choices_indicator: List[str] = []
    default_choice_indicator: str = ""

    if defaut_enum_value is None:
        default_choice_index = -1
    else:
        default_choice_index = choices.index(defaut_enum_value)

    for index, choice in enumerate(choices):
        if index == default_choice_index:
            default_choice_indicator = choice.value[0].upper()
        else:
            choices_indicator.append(choice.value[0])

    if default_choice_indicator:
        choices_indicator.insert(0, default_choice_indicator)
    if vertical_style:
        choices_indicator_str = strlist_to_str(choices_indicator, "\n")
    else:
        choices_indicator_str = strlist_to_str(choices_indicator, "/")
    return choices_indicator_str


def choice_prompt(
    msg: str, enum: ChoicePromptEnum, default_confirm=None, vertical_style=False
) -> ChoicePromptEnum | Effects[PrintEffects, KeyboardEffects, SysEffects]:
    choices: list = flatten(enum.values())
    choices_indicator: str = _generate_choices_indicator(
        enum, default_confirm, vertical_style
    )
    confirm_choices = list(enum)
    user_input: str = ""

    while True:
        print(msg)
        if vertical_style:
            user_input = input_handling_keyboard_interrupt_wrapper(
                f"{choices_indicator}\n> "
            )
        else:
            user_input = input_handling_keyboard_interrupt_wrapper(
                f"[{choices_indicator}] "
            )
        user_input = sanitize_user_input(user_input)
        if user_input in choices:
            break
        elif default_confirm is not None and user_input == "":
            break

    if user_input == "":
        return default_confirm

    for _, choice in enumerate(confirm_choices):
        if user_input in choice.value:
            return choice

    return None
