# coding: utf-8


from typing import Generic, TypeVar

T = TypeVar("T")


class Effects(Generic[T]):
    def __init__(self) -> None:
        pass

    def __class_getitem__(cls, item: T) -> None:
        pass
