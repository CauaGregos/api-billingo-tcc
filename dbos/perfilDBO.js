class Student {
    #nickName
    #name
    #email
    #password

    constructor(nickName,name, email, password) {
        this.#nickName = nickName;
        this.#name = name
        this.#email = email
        this.#password = password
    }

    get nickName() {
        return this.#nickName;
    }

    get name() {
        return this.#name;
    }

    get email() {
        return this.#email
    }

    get password() {
        return this.#password;
    }

    set nickName(nickName) {
        if (nickName === undefined || typeof nickName !== 'string' || nickName === "")
            throw ('Missing Name')

        this.#nickName = nickName;
    }

    set name(name) {
        if (name === undefined || typeof name !== 'string' || name === "")
            throw ('Missing Name')

        this.#name = name;
    }

    set email(email) {
        if (email === undefined || typeof email !== 'string' || email === "")
            throw ('email inválido')

        this.#email = email;
    }

    set password(password) {
        if (password === undefined || typeof password !== 'number' || password <= 0)
            throw ('Missing Password')

        this.#password = password;
    }

}

function newFunctionProfile(nickName,name, email, password) {
    return new Student(nickName,name, email, password)
}

module.exports = { newFunctionProfile }