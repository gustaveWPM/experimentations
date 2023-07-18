# coding: utf-8


from typing import List


def flatten(l: list) -> list:
    return [item for sublist in l for item in sublist]

    # * ... see: https://stackoverflow.com/questions/952914/how-do-i-make-a-flat-list-out-of-a-list-of-lists


def strlist_to_str(l: List[str], separator: str = "") -> str:
    l_to_str: str = separator.join(l)
    return l_to_str
