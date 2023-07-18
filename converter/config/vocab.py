# coding: utf-8

from enum import Enum


class ConverterUnits(Enum):
    CENTIMETERS = "Centimeters"
    INCHES = "Inches"
    FEET = "Feet"
    METERS = "Meter"
    POUNDS = "Pounds"
    KILOGRAMS = "Kilograms"
    FAHRENHEIT = "Fahrenheit"
    CELSIUS = "Celsius"


VOCAB = {
    "WELCOME_MSG": "Hello world!\n",
    "CONVERSION_PROMPT_MSG": "Please, choose a conversion option:",
    "INVALID_INPUT": "Invalid input!",
    "UNITS": ConverterUnits,
    "QUIT_MSG": "Goodbye!",
}
