class Person {
  firstName = 'John';
  lastName = 'Doe';
}

class Factory {
  create<T>(type: (new () => T)): T {
    return new type();
  }
}

let factory = new Factory();
let person = factory.create(Person);
console.log(person);
