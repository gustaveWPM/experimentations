# coding: utf-8


from typing import Callable, Optional

from converter.config.conversions_dictionnary import CONVERSIONS_DICTIONNARY
from converter.config.factors import MAX_MANTISSA_LENGTH
from converter.config.vocab import VOCAB
from converter.enums.converter_choices import ConverterChoices
from converter.internal_lib.special_conversions import (
    celsius_to_fahrenheit,
    fahrenheit_to_celsius,
)
from converter.internal_lib.validation import is_number
from converter.metaprog.choice_prompt_enum import ChoicePromptEnum
from converter.metaprog.effects_classes import (
    KeyboardEffects,
    PrintEffects,
    SysEffects,
    TerminalEffects,
)
from converter.metaprog.typing import Effects
from converter.sys.choice_prompt import choice_prompt
from converter.sys.input_handling import (
    input_handling_keyboard_interrupt_wrapper,
    pause,
    sanitize_user_input,
)


def _print_result(unit: str, res: float) -> PrintEffects:
    print(f"Converted to {unit.lower()}:\n> {res}")


def _print_invalid_input_error() -> PrintEffects:
    print(f"\n{VOCAB['INVALID_INPUT']}\n")


def _value_prompt_str(unit: str) -> str:
    return f"{unit}:\n> "


def _conversion_prompt(
    conversion_choice: ChoicePromptEnum,
    convert_fn: Optional[Callable[[float], float]] = None,
) -> float | Effects[PrintEffects, KeyboardEffects]:
    base = CONVERSIONS_DICTIONNARY[conversion_choice].base.value
    user_input = input_handling_keyboard_interrupt_wrapper(_value_prompt_str(base))
    user_input = sanitize_user_input(user_input)
    if is_number(user_input):
        if convert_fn:
            res = convert_fn(user_input)
            return res
        else:
            factor = CONVERSIONS_DICTIONNARY[conversion_choice].factor
            res = round(float(user_input) * factor, MAX_MANTISSA_LENGTH)
            return res
    else:
        _print_invalid_input_error()
        return _conversion_prompt(conversion_choice)


def _prompt_loop() -> (
    Effects[PrintEffects, KeyboardEffects, TerminalEffects, SysEffects]
):
    while True:
        user_input = choice_prompt(
            VOCAB["CONVERSION_PROMPT_MSG"], ConverterChoices, None, True
        )
        res: float = 0
        target: str = ""

        match user_input:
            case ConverterChoices.QUIT:
                print(VOCAB["QUIT_MSG"])
                break
            case ConverterChoices.FAHRENHEIT_TO_CELSIUS:
                res = _conversion_prompt(user_input, fahrenheit_to_celsius)
            case ConverterChoices.CELSIUS_TO_FAHRENHEIT:
                res = _conversion_prompt(user_input, celsius_to_fahrenheit)
            case _ as otherwise:
                res = _conversion_prompt(otherwise)

        if user_input != ConverterChoices.QUIT:
            target = CONVERSIONS_DICTIONNARY[user_input].target.value
            _print_result(target, res)
            pause()
            print()


def run() -> Effects[PrintEffects, KeyboardEffects, TerminalEffects, SysEffects]:
    print(VOCAB["WELCOME_MSG"])
    _prompt_loop()


if __name__ == "__main__":
    run()
