# coding: utf-8


from dataclasses import dataclass
from typing import Dict

from converter.config.factors import (
    CENTIMETERS_TO_INCHES_FACTOR,
    FEET_TO_METERS_FACTOR,
    INCHES_TO_CENTIMETERS_FACTOR,
    KILOGRAMS_TO_POUNDS_FACTOR,
    METERS_TO_FEET_FACTOR,
    POUNDS_TO_KILOGRAMS_FACTOR,
)
from converter.config.vocab import ConverterUnits
from converter.enums.converter_choices import ConverterChoices


@dataclass
class ConversionsDataClass:
    base: ConverterUnits
    target: ConverterUnits
    factor: float


_USE_DELEGATE_FUNCTION = 0

inches_to_cm = ConversionsDataClass(
    base=ConverterUnits.INCHES,
    target=ConverterUnits.CENTIMETERS,
    factor=INCHES_TO_CENTIMETERS_FACTOR,
)

cm_to_inches = ConversionsDataClass(
    base=ConverterUnits.CENTIMETERS,
    target=ConverterUnits.INCHES,
    factor=CENTIMETERS_TO_INCHES_FACTOR,
)

meters_to_feet = ConversionsDataClass(
    base=ConverterUnits.METERS,
    target=ConverterUnits.FEET,
    factor=METERS_TO_FEET_FACTOR,
)

feet_to_meters = ConversionsDataClass(
    base=ConverterUnits.FEET,
    target=ConverterUnits.METERS,
    factor=FEET_TO_METERS_FACTOR,
)

pounds_to_kilograms = ConversionsDataClass(
    base=ConverterUnits.POUNDS,
    target=ConverterUnits.KILOGRAMS,
    factor=POUNDS_TO_KILOGRAMS_FACTOR,
)

kilograms_to_pounds = ConversionsDataClass(
    base=ConverterUnits.KILOGRAMS,
    target=ConverterUnits.POUNDS,
    factor=KILOGRAMS_TO_POUNDS_FACTOR,
)

fahrenheit_to_celsius = ConversionsDataClass(
    base=ConverterUnits.FAHRENHEIT,
    target=ConverterUnits.CELSIUS,
    factor=_USE_DELEGATE_FUNCTION,
)

celsius_to_fahrenheit = ConversionsDataClass(
    base=ConverterUnits.CELSIUS,
    target=ConverterUnits.FAHRENHEIT,
    factor=_USE_DELEGATE_FUNCTION,
)

CONVERSIONS_DICTIONNARY: Dict[ConverterChoices, ConversionsDataClass] = {
    ConverterChoices.INCHES_TO_CM: inches_to_cm,
    ConverterChoices.CM_TO_INCHES: cm_to_inches,
    ConverterChoices.METERS_TO_FEET: meters_to_feet,
    ConverterChoices.FEET_TO_METERS: feet_to_meters,
    ConverterChoices.POUNDS_TO_KILOGRAMS: pounds_to_kilograms,
    ConverterChoices.KILOGRAMS_TO_POUNDS: kilograms_to_pounds,
    ConverterChoices.CELSIUS_TO_FAHRENHEIT: celsius_to_fahrenheit,
    ConverterChoices.FAHRENHEIT_TO_CELSIUS: fahrenheit_to_celsius,
}
