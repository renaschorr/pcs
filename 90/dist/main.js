

  import MyClass from './MyClass.js';
  import { random } from 'messagebox.js';
  
  const myObject = new MyClass('John');
  myObject.greet(); // Output: Hello, John!
  
  console.log(random());
  class MyClass {
    constructor(name) {
      this.name = name;
    }
  
    greet() {
      console.log(`Hello, ${this.name}!`);
    }
  }
  
  export default MyClass;
    