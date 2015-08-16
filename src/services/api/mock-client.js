import {inject} from 'aurelia-framework';

export class Client {
    authenticated = false;
    session = {};

    // mock db
    _db = { users: [] };

    constructor(http) {
        this.http = http; // isnt used, but for api compliance
        createMockData(this);
    }

    // isnt used, but for api compliance
    fetch(endpoint) {
        throw new Error("not implemented in mock client!");
    }

    _lag(delay = 2000) {
        let lag = 500 + Math.random()*delay;

        return new Promise( (resolve,reject)=> {
            setTimeout(()=>{
                resolve(true)
            }, lag);
        });
    }

    login(email,password) { return this._lag().then( ()=> {
        let found = false;
        this._db.users.forEach((u)=>{
            if(u.email === email && u.password == password) {
                found = u;
                return false;
            }
        });

        if(found) {
            this.authenticated = true;
            this.session = this.session || {};
            this.session.email = found.email;
            return true;
        } else {
            this.authenticated = false;
            this.session = {};
            return false;
        }
    });}

    logout() { return this._lag(500).then( ()=> {
        this.authenticated = false;
        this.session = {};
        return true;
    });}

    signup(email,password) { return this._lag().then( ()=> {
        this._db.users.push({
            username: `-${email}-`,
            email: email,
            password: password
        });
    });}
}

function createMockData(c) {
    c._db.users.push({
        username: `-test@testified.email-`,
        email: "test@testified.email",
        password: "test"
    });
}
