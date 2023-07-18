# coding: utf-8


from converter.config.factors import MAX_MANTISSA_LENGTH


def celsius_to_fahrenheit(celsius: str | float) -> float:
    c = float(celsius)
    fahrenheit: float = (c * 9 / 5) + 32
    fahrenheit = round(fahrenheit, MAX_MANTISSA_LENGTH)
    return fahrenheit


def fahrenheit_to_celsius(fahrenheit: str | float) -> float:
    f = float(fahrenheit)
    celsius = (f - 32) * 5 / 9
    celsius = round(celsius, MAX_MANTISSA_LENGTH)
    return celsius
