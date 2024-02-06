interface Person {
  name: string;
  age: number;
}

function greet(person: Person) {
  console.log(`Hello, ${person.name}! You are ${person.age} years old.`);
}

function doubleAge(person: Person): number {
  return person.age * 2;
}

const john: Person = { name: 'John', age: 30 };
greet(john);

const doubledAge = doubleAge(john);
console.log(`Double of ${john.name}'s age is ${doubledAge}.`);