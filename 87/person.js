class Person {
    #age;

    constructor(firstName, lastName, age) {
        this.firstName = firstName;
        this.lastName = lastName;
        this.age = age;
    }

    get age() {
        return this.#age;
    }

    set age(value) {
        const parsedAge = parseInt(value, 10);
        if (isNaN(parsedAge) || parsedAge < 0 || parsedAge > 120) {
            throw new Error('Invalid age. Age must be a number between 0 and 120.');
        }
        this.#age = parsedAge;
    }

    toString() {
        const properties = Object.entries(this);
        const formattedProperties = properties.map(([key, value]) => `${key}: ${value}`).join(', ');
        return `Person { ${formattedProperties} }`;
    }
}

class Student extends Person {
    constructor(firstName, lastName, age, grade) {
        super(firstName, lastName, age);
        this.grade = grade;
    }
}
