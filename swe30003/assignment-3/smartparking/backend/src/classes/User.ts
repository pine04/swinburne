export default abstract class User {
    private _id?: number
    private _name?: string
    private _email?: string
    private _password?: string

    constructor(params: {id?: number, name?: string, email?: string, password?: string}) {
        this._id = params.id;
        this._name = params.name;
        this._email = params.email;
        this._password = params.password;
    }

    abstract signup(): Promise<User | string>;

    abstract signin(): Promise<User | string>;

    get id() {
        return this._id;
    }

    get name() {
        return this._name;
    }

    get email() {
        return this._email;
    }

    get password() {
        return this._password;
    }
}