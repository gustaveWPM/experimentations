# coding: utf-8


def is_number(unknown_value) -> bool:
    try:
        float(unknown_value)
        return True
    except ValueError:
        return False
