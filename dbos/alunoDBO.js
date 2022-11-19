class Student {
    #name
  
    #email
    #age

    constructor(name, email, age) {
        this.#name = name
        this.#email = email 
        this.#age = age
    }

    get name() {
        return this.#name;
    }


    get email() {
        return this.#email
    }

    get age() {
        return this.#age;
    }

    set name(name) {
        if (name === undefined || typeof name !== 'string' || name ==="" )
        throw ('Missing Name')

        this.#name = name;
    }


    set email(email) {
        if (email === undefined || typeof email !== 'string' || email ==="" )
        throw ('email inválido')

        this.#email = email;
    }

    set age(age) {
        if (age === undefined || typeof age !== 'number' || age <= 0 )
        throw ('Missing Age')

        this.#age = age;
    }
   
}

function newFunctionStudent(name, email, age) {
    return new Student(name, email, age)
}

module.exports = {newFunctionStudent}