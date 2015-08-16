import {HttpClient} from 'aurelia-fetch-client';
import {inject} from 'aurelia-framework';
import 'fetch';

@inject(HttpClient)
export class Client {
    authenticated = false;
    session = {};

    constructor(http) {
        http.configure(config => {
          config
            .useStandardConfiguration()
            .withBaseUrl('http://localhost:3000/v1/');
        });

        this.http = http;
    }

    fetch(endpoint) {
        return this.http.fetch(endpoint)
            .then(response => response.json());
    }

    // TODO
    login(email,password) { return Promise.resolve().then( ()=> {
        this.authenticated = false;
        this.session = {};
        return false;
    });}

    // TODO
    logout() { return Promise.resolve().then( ()=> {
        this.authenticated = false;
        this.session = {};
        return true;
    });}

    // TODO
    signup(email,password) { return Promise.resolve().then( ()=> {
        return true
    });}

}
