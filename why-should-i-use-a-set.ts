// * ... Inspired from https://ja.nsommer.dk/articles/type-checked-unique-arrays.html

type InArray<
  Array extends readonly unknown[],
  Element extends unknown
> = Array extends []
  ? false
  : Array extends readonly [Element]
  ? true
  : Array extends readonly [Element, ...infer _]
  ? true
  : Array extends readonly [infer _, ...infer Tail]
  ? InArray<Tail, Element>
  : false;

type UniqueArray<T extends readonly unknown[]> = T extends readonly [
  infer Head,
  ...infer Tail
]
  ? InArray<Tail, Head> extends true
    ? never
    : readonly [Head, ...UniqueArray<Tail>]
  : T;

const inArrayData = ["some", "values", "for", "testing"] as const;
type TRUE_TestingIsInArray = InArray<typeof inArrayData, "testing">;
type FALSE_ChocolateIsInArray = InArray<typeof inArrayData, "chocolate">;
type TRUE_TypeOnly = InArray<["banana", "apple"], "banana">;
type TRUE_TypeOnly2 = InArray<["banana", "apple"], "apple">;
type FALSE_Lol = InArray<[], "lol">;

const animals = ["horse", "monkey", "dog"] as const;
const uniqueAnimals: UniqueArray<typeof animals> = animals;
const numbers = [1, 2, 3, 4, 5, 6, 7] as const;
const uniqueNumbers: UniqueArray<typeof numbers> = numbers;
const objects = [{ a: 1 }, { a: 2 }, { a: 3 }] as const;
const uniqueObjects: UniqueArray<typeof objects> = objects;

// const FAIL_animals = ["horse", "monkey", "monkey", "dog"] as const;
// const FAIL_uniqueAnimals: UniqueArray<typeof animals> = FAIL_animals;
// const FAIL_numbers = [1, 2, 3, 3, 4, 5, 6, 6, 7] as const;
// const FAIL_uniqueNumbers: UniqueArray<typeof numbers> = FAIL_numbers;
// const FAIL_objects = [{ a: 1 }, { a: 2 }, { a: 3 }, { a: 3 }] as const;
// const FAIL_uniqueObjects: UniqueArray<typeof objects> = FAIL_objects;
