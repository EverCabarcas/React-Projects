let person: Person;

person = {
  name: "John",
  age: 30,
};

let arrayPerson: {
  name: string;
  age: number;
}[];

arrayPerson = [
  {
    name: "John",
    age: 30,
  },
  {
    name: "Jane",
    age: 25,
  },
];

let course: string | number | null;

course = "React";
course = 10;

type Person = {
  name: string;
  age: number;
};

function add(a: number, b: number): number | null | void {
  return a + b;
}

//Generics

function inserAtBeginning<T>(array: T[], value: T): Array<T> {
  const newArray = [value, ...array];

  return newArray;
}

function merge<T extends object, U extends object>(objA: T, objB: U) {
  return { ...objA, ...objB };
}

const mergedObj = merge([{ name: "John" }], { age: 30 });
console.log(mergedObj);


let object: Record<string, { name: string, age: number}>

object = {
  hola: {
    name: '',
    age: 20
  }
}
