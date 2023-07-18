# coding: utf-8


from converter.metaprog.choice_prompt_enum import ChoicePromptEnum


class ConverterChoices(ChoicePromptEnum):
    INCHES_TO_CM = ["'A' ->\tConvert inches to centimeters,", "a"]
    CM_TO_INCHES = ["'B' ->\tConvert centimeters to inches,", "b"]
    METERS_TO_FEET = ["'C' ->\tConvert meters to feet,", "c"]
    FEET_TO_METERS = ["'D' ->\tConvert feet to meters,", "d"]
    KILOGRAMS_TO_POUNDS = ["'E' ->\tConvert kilograms to pounds,", "e"]
    POUNDS_TO_KILOGRAMS = ["'F' ->\tConvert pounds to kilograms,", "f"]
    CELSIUS_TO_FAHRENHEIT = ["'G' ->\tConvert celsius to fahrenheit,", "g"]
    FAHRENHEIT_TO_CELSIUS = ["'H' ->\tConvert fahrenheit to celsius,", "h"]
    QUIT = ["'Q' ->\tQuit", "q"]
